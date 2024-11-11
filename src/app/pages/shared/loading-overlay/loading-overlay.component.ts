import { Component, Input } from '@angular/core'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  standalone: true,
  imports: [ProgressSpinnerModule]
})
export class LoadingOverlayComponent {
  @Input() loadingMessage: string
  showOverlay: boolean
}
