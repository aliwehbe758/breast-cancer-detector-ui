import { Component, OnDestroy, OnInit } from '@angular/core'
import { PretrainedModel } from 'src/app/models/pretrained-model.model'
import { DialogService } from 'primeng/dynamicdialog'
import { PretrainedModelFormComponent } from './pretrained-model-form/pretrained-model-form.component'
import { Subscription } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { UtilitiesService } from 'src/app/services/utilities.service'

@Component({
  selector: 'app-models',
  templateUrl: './pretrained-models.component.html',
  styleUrl: './pretrained-models.component.scss'
})
export class PretrainedModelsComponent implements OnInit, OnDestroy {

  pretrainedModels: PretrainedModel[] = []
  selectedModels: PretrainedModel[] = []
  loading: boolean
  loadingMessage: string = ''
  subscriptions: Subscription = new Subscription()

  constructor(
    private dialogService: DialogService,
    private http: HttpClient,
    private utilities: UtilitiesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true
    await this.getPretrainedModels()
  }

  getPretrainedModels(): Promise<void> {
    return new Promise((resolve, reject) => 
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
            reject()
          }
        })
      )
    )
  }

  openNew() {
    const ref = this.dialogService.open(PretrainedModelFormComponent, {
      header: 'New Model',
      styleClass: 'responsive-dialog'
    })
    this.subscriptions.add(
      ref.onClose.subscribe(model => {
        if(model) {
          this.getPretrainedModels()
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
