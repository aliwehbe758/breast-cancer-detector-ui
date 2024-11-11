import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { PredictionD } from 'src/app/models/prediction-d.model'
import { PreidictionH } from 'src/app/models/prediction-h.model'
import { Prediction } from 'src/app/models/prediction.model'
import { UtilitiesService } from 'src/app/services/utilities.service'

@Component({
  selector: 'app-prediction-d',
  templateUrl: './prediction-d.component.html',
  styleUrl: './prediction-d.component.scss'
})
export class PredictionDComponent implements OnInit {

  @Input() predictionH: PreidictionH
  predictionHId: number
  openDialog: boolean
  clickedImage: PredictionD
  clickedImageIndex: number
  prediction = Prediction
  isMaximized: boolean
  loading: boolean
  loadingMessage: string = ''
  subscriptions: Subscription = new Subscription()

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private utilities: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.predictionHId = Number(this.route.snapshot.paramMap.get('id'))
    if(this.predictionHId) {
      this.loading = true
      this.getPredictionHDetails()
    }
  }

  getPredictionHDetails(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.http.get<PreidictionH>(`http://localhost:5001/history/${this.predictionHId}`).subscribe({
          next: (data: PreidictionH) => {
            this.predictionH = data
            this.loading = false
            resolve()
          },
          error: (err: any) => {
            let errMsg: string = err?.message ? err.message : 'Internal Server Error'
            this.utilities.notifyError(errMsg)
            this.loading = false
            reject()
          }
        })
      )
    })
  }

  zoomImage(index: number) {
    this.clickedImageIndex = index
    this.clickedImage = this.predictionH.details[index]
    this.openDialog = true
  }

  previousImage() {
    this.clickedImageIndex = (this.clickedImageIndex - 1 + this.predictionH.details.length) % this.predictionH.details.length
    this.clickedImage = this.predictionH.details[this.clickedImageIndex]
  }

  nextImage() {
    this.clickedImageIndex = (this.clickedImageIndex + 1) % this.predictionH.details.length
    this.clickedImage = this.predictionH.details[this.clickedImageIndex]
  }
}
