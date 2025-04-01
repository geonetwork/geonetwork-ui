import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { iconoirExpand, iconoirReduce } from '@ng-icons/iconoir'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIconComponent, provideIcons } from '@ng-icons/core'

@Component({
  selector: 'gn-ui-overlay',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    OverlayModule,
    CommonModule,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [provideIcons({ iconoirExpand, iconoirReduce })],
  templateUrl: './overlay.component.html',
})
export class OverlayComponent {
  isOpen = false
  toggleOverlay() {
    this.isOpen = !this.isOpen
  }

  close() {
    this.isOpen = false
  }
}
