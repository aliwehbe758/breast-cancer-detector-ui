import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { PreidictionH } from 'src/app/models/prediction-h.model'
import { UtilitiesService } from 'src/app/services/utilities.service'

@Component({
  selector: 'app-prediction-h',
  templateUrl: './prediction-h.component.html',
  styleUrl: './prediction-h.component.scss'
})
export class PredictionHComponent implements OnInit {
  
  history: PreidictionH[] = []
  loading: boolean
  loadingMessage: string = ''
  subscriptions: Subscription = new Subscription()

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilities: UtilitiesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true
    await this.getHistory()
  }

  getHistory(): Promise<void> {
    return new Promise((resolve, reject) => 
      this.subscriptions.add(
        this.http.get<PreidictionH[]>('http://localhost:5001/history').subscribe({
          next: (data: PreidictionH[]) => {
            this.history = data
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

  openHistoryDetail(rowData: PreidictionH) {
    this.router.navigate(['prediction-h', rowData.id])
  }

  exportData(e) {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
