import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PretrainedModelsComponent } from './pretrained-models.component'

const routes: Routes = [
  { path: '', component: PretrainedModelsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PretrainedModelsRoutingModule { }
