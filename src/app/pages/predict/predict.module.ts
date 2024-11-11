import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PredictRoutingModule } from './predict-routing.module'
import { PredictComponent } from './predict.component'
import { ButtonModule } from 'primeng/button'
import { FileUploadModule } from 'primeng/fileupload'
import { DialogModule } from 'primeng/dialog'
import { CardModule } from 'primeng/card'
import { LoadingOverlayComponent } from '../shared/loading-overlay/loading-overlay.component'
import { PredictionHModule } from '../prediction-h/prediction-h.module'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [PredictComponent],
  imports: [
    CommonModule,
    PredictRoutingModule,
    ButtonModule,
    CardModule,
    FileUploadModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    LoadingOverlayComponent,
    PredictionHModule
  ]
})
export class PredictModule { }
