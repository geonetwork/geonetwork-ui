import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { MatTooltipModule } from '@angular/material/tooltip'
import { matOpenInNew } from '@ng-icons/material-icons/baseline'
import { TranslatePipe } from '@ngx-translate/core'
import { CopyTextButtonComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-metadata-doi',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    NgIcon,
    TranslatePipe,
    CopyTextButtonComponent,
  ],
  templateUrl: './metadata-doi.component.html',
  styleUrl: './metadata-doi.component.css',
  viewProviders: [
    provideIcons({
      matOpenInNew,
    }),
  ],
})
export class MetadataDoiComponent {
  @Input() code!: string
  @Input() link?: string
}
