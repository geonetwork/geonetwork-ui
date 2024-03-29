import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PublishButtonComponent } from '../publish-button/publish-button.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'md-editor-top-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    PublishButtonComponent,
    ButtonComponent,
    MatIconModule,
  ],
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopToolbarComponent {}
