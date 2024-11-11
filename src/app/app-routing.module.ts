import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'predict', loadChildren: () => import('./pages/predict/predict.module').then(m => m.PredictModule) },
                    { path: 'prediction-h', loadChildren: () => import('./pages/prediction-h/prediction-h.module').then(m => m.PredictionHModule) },
                    { path: 'pretrained-models', loadChildren: () => import('./pages/pretrained-models/pretrained-models.module').then(m => m.PretrainedModelsModule) }
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
