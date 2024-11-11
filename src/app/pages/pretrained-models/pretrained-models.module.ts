import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PretrainedModelsRoutingModule } from './pretrained-models-routing.module'
import { PretrainedModelsComponent } from './pretrained-models.component'
import { TableModule } from 'primeng/table'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { PretrainedModelFormComponent } from './pretrained-model-form/pretrained-model-form.component'
import { DialogService } from 'primeng/dynamicdialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { FileUploadModule } from 'primeng/fileupload'
import { InputGroupModule } from 'primeng/inputgroup'
import { LoadingOverlayComponent } from '../shared/loading-overlay/loading-overlay.component'

@NgModule({
  declarations: [
    PretrainedModelsComponent,
    PretrainedModelFormComponent
  ],
  imports: [
    CommonModule,
    PretrainedModelsRoutingModule,
    ButtonModule,
    FileUploadModule,
    FormsModule,
    InputGroupModule,
    InputTextModule,
    LoadingOverlayComponent,
    ReactiveFormsModule,
    TableModule,
    ToolbarModule
  ],
  providers: [DialogService]
})
export class PretrainedModelsModule { }
