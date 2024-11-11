import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import * as dicomParser from 'dicom-parser'
import * as cornerstone from 'cornerstone-core'
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import { Prediction } from 'src/app/models/prediction.model'
import { PreidictionH } from 'src/app/models/prediction-h.model'
import { PredictionD } from 'src/app/models/prediction-d.model'
import { PretrainedModel } from 'src/app/models/pretrained-model.model'
import { Subscription } from 'rxjs'
import { UtilitiesService } from 'src/app/services/utilities.service'

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.scss'
})
export class PredictComponent implements OnInit, OnDestroy {

  images: PredictionD[] = []
  predictionCompleted: boolean
  clickedImage: any
  clickedImageIndex: number
  openDialog: boolean
  isMaximized: boolean
  prediction = Prediction
  uploadedFolderName: string
  predictionH: PreidictionH
  pretrainedModels: PretrainedModel[] = []
  selectedModelId: number = null
  loading: boolean
  loadingMessage: string = ''
  subscriptions: Subscription = new Subscription()

  constructor(
    private http: HttpClient,
    private utilities: UtilitiesService
  ) {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser
  }

  async ngOnInit(): Promise<void> {
    this.loading = true
    await this.getPretrainedModels()
  }

  onFolderSelected(event: any) {
    this.loading = true
    this.loadingMessage = 'Uploading your images. Please wait.'
    this.predictionCompleted = false
    const files: any[] = Array.from(event.target.files)
    this.images = []
    let imagesLoaded = 0
    if (files.length > 0) {
      const firstFilePath = files[0].webkitRelativePath || files[0].name
      this.uploadedFolderName = firstFilePath.substring(0, firstFilePath.lastIndexOf('/')) + '/' || 'Root'
    }

    files.forEach(async (file: File) => {
      const fileType = file.type

      let isDicomFile = this.isDicomFile(file)

      if (fileType.startsWith('image/')) {
        const fileReader = new FileReader()
        fileReader.onload = (e: any) => {
          let content = e.target.result.split('base64,')[1]
          this.images.push({ file_name: file.name, image: content })
          imagesLoaded++
          if (imagesLoaded === files.length) {
            this.images = [...this.images] // Trigger change detection
            this.loading = false
          }
        }
        fileReader.readAsDataURL(file) // Read the file as a Data URL9
      }
      else if (isDicomFile) {
        const fileReader = new FileReader()
        fileReader.onload = async (e: any) => {
          try {
            const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file)
            const image = await cornerstone.loadAndCacheImage(imageId)

            // Create a canvas with the same dimensions as the DICOM image
            const canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height

            const context = canvas.getContext('2d')
            context.imageSmoothingEnabled = true
            context.imageSmoothingQuality = 'high'

            // Render the DICOM image onto the canvas
            cornerstone.renderToCanvas(canvas, image)

            // Convert the canvas to a PNG Data URL with maximum quality
            const content = canvas.toDataURL('image/png', 1.0)

            this.images.push({ file_name: file.name, image: content.split('base64,')[1] })
          } catch (error) {
            console.error('Error loading DICOM image:', error)
          }

          imagesLoaded++
          if (imagesLoaded === files.length) {
            this.images = [...this.images] // Trigger change detection
            this.loading = false
          }
        }
        fileReader.readAsArrayBuffer(file) // Read the file as an ArrayBuffer
      } 
      else {
        console.warn(`Unsupported file type: ${file.name}`)
        imagesLoaded++
      }
    })
  }

  isDicomFile(file: File): boolean {
    const dicomExtensions = ['.dcm', '.dicom', '.img', '.dc3', '.dic', '.v2']
    const fileName = file.name.toLowerCase()
    return dicomExtensions.some(ext => fileName.endsWith(ext))
  }

  clearSelectedFolder(inputElement: HTMLInputElement) {
    inputElement.value = ''
    this.images = []
    this.predictionCompleted = false
  }

  predict() {
    let body = {
      uploaded_folder_name: this.uploadedFolderName,
      pretrained_model_id: this.selectedModelId,
      images: this.images
    }
    this.loading = true
    this.loadingMessage = 'Analyzing your ultrasound images for breast cancer detection. <br>Please wait a moment as we process and predict the results.'

    this.subscriptions.add(
      this.http.post<any>(`http://localhost:5001/predict`, body).subscribe({
        next: (data: PreidictionH) => {
          this.images = []
          this.predictionH = data
          this.selectedModelId = null
          this.predictionCompleted = true
          this.loading = false
        },
        error: (err: any) => {
          console.error(err)
          let errMsg: string = err?.message ? err.message : 'Internal Server Error'
          this.utilities.notifyError(errMsg)
          this.loading = false
        }
      })
    )
  }

  zoomImage(index: number) {
    this.clickedImageIndex = index
    this.clickedImage = this.images[index]
    this.openDialog = true
  }

  previousImage() {
    this.clickedImageIndex = (this.clickedImageIndex - 1 + this.images.length) % this.images.length
    this.clickedImage = this.images[this.clickedImageIndex]
  }

  nextImage() {
    this.clickedImageIndex = (this.clickedImageIndex + 1) % this.images.length
    this.clickedImage = this.images[this.clickedImageIndex]
  }

  getPretrainedModels(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.http.get<PretrainedModel[]>('http://localhost:5001/pretrained-models').subscribe({
          next: (data: PretrainedModel[]) => {
            this.pretrainedModels = data
            this.loading = false
            resolve()
          },
          error: (err: any) => {
            let errMsg: string = err?.message ? err.message : 'Internal Server Error'
            this.utilities.notifyError(errMsg)
            this.loading = false
          }
        })
      )
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
