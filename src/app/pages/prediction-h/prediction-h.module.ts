import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PredictionHRoutingModule } from './prediction-h-routing.module'
import { PredictionHComponent } from './prediction-h.component'
import { TableModule } from 'primeng/table'
import { PredictionDComponent } from './prediction-d/prediction-d.component'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { LoadingOverlayComponent } from '../shared/loading-overlay/loading-overlay.component'


@NgModule({
  declarations: [
    PredictionHComponent,
    PredictionDComponent
  ],
  imports: [
    CommonModule,
    PredictionHRoutingModule,
    ButtonModule,
    DialogModule,
    CardModule,
    LoadingOverlayComponent,
    TableModule
  ],
  exports: [PredictionDComponent]
})
export class PredictionHModule { }
