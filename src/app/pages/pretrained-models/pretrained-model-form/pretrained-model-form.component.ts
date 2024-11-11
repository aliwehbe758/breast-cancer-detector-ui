import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { Subscription } from 'rxjs'
import { PretrainedModel } from 'src/app/models/pretrained-model.model'
import { UtilitiesService } from 'src/app/services/utilities.service'

@Component({
  selector: 'app-model-form',
  templateUrl: './pretrained-model-form.component.html',
  styleUrl: './pretrained-model-form.component.scss'
})
export class PretrainedModelFormComponent implements OnInit, OnDestroy {

  pretrainedModel: PretrainedModel
  modelForm: FormGroup
  pthFile: File
  modelPyFile: File
  paramsPyFile: File
  subscriptions: Subscription = new Subscription()

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dynamicDialogRef: DynamicDialogRef,
    private utilities: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.modelForm = this.fb.group({
      id: [this.pretrainedModel ? this.pretrainedModel.id : null],
      name: [this.pretrainedModel ? this.pretrainedModel.name : null, Validators.required],
      description: [this.pretrainedModel ? this.pretrainedModel.description : null],
      pth_file_name: [this.pretrainedModel ? this.pretrainedModel.pth_file_name : null, Validators.required],
      model_py_file_name: [this.pretrainedModel ? this.pretrainedModel.model_py_file_name : null, Validators.required],
      params_py_file_name: [this.pretrainedModel ? this.pretrainedModel.params_py_file_name : null, Validators.required],
      folder_name: [this.pretrainedModel ? this.pretrainedModel.folder_name : null ,Validators.required],
      uploadDate: [this.pretrainedModel ? this.pretrainedModel.upload_date : null]
    })
  }

  onPthFileSelected(event: any) {
    this.pthFile = event.files[0]
    this.modelForm.get('pth_file_name').setValue(this.pthFile.name)
  }

  clearPthFile() {
    this.pthFile = null
    this.modelForm.get('pth_file_name').setValue(null)
  }

  onModelPyFileSelected(event: any) {
    this.modelPyFile = event.files[0]
    this.modelForm.get('model_py_file_name').setValue(this.modelPyFile.name)
  }

  clearModelPyFile() {
    this.modelPyFile = null
    this.modelForm.get('model_py_file_name').setValue(null)
  }

  onParamsPyFileSelected(event: any) {
    this.paramsPyFile = event.files[0]
    this.modelForm.get('params_py_file_name').setValue(this.paramsPyFile.name)
  }

  clearParamsPyFile() {
    this.paramsPyFile = null
    this.modelForm.get('params_py_file_name').setValue(null)
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const resultStr = reader.result as string
        const base64Data = resultStr.substring(resultStr.indexOf('base64,') + 'base64,'.length)
        resolve(base64Data)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  onSubmit() {
    this.utilities.confirmDialog("Are you sure you want to save your changes?").then(async (confirm) => {
      if(confirm) {
        const formData = new FormData();
        formData.append('pth_file', this.pthFile)
        formData.append('model_py_file', this.modelPyFile)
        formData.append('params_py_file', this.paramsPyFile)
        this.modelForm.value.uploadDate = new Date().toISOString()
        formData.append('json_data', JSON.stringify(this.modelForm.value))
        this.subscriptions.add(
          this.http.post('http://localhost:5001/pretrained-models', formData).subscribe({
            next: (response) => {
              this.utilities.notifySuccess('Model saved successfully')
              this.dynamicDialogRef.close(response)
            },
            error: (err: any) => {
              let errMsg: string = err?.message ? err.message : 'Internal Server Error'
              this.utilities.notifyError(errMsg)
            }
          })
        )
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
