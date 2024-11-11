import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PredictionHComponent } from './prediction-h.component'
import { PredictionDComponent } from './prediction-d/prediction-d.component'

const routes: Routes = [
  { path: '', component: PredictionHComponent },
  { path: ':id', component: PredictionDComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictionHRoutingModule { }
