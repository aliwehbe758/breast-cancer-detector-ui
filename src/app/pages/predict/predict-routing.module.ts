import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PredictComponent } from './predict.component'

const routes: Routes = [
  { path: '', component: PredictComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictRoutingModule { }
