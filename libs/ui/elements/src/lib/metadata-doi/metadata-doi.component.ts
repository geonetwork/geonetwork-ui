import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { MatTooltipModule } from '@angular/material/tooltip'
import { matContentCopy, matOpenInNew } from '@ng-icons/material-icons/baseline'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-metadata-doi',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, NgIcon, TranslatePipe],
  templateUrl: './metadata-doi.component.html',
  styleUrl: './metadata-doi.component.css',
  viewProviders: [
    provideIcons({
      matContentCopy,
      matOpenInNew,
    }),
  ],
})
export class MetadataDoiComponent {
  @Input() code!: string
  @Input() link?: string

  copyToClipboard(event: MouseEvent) {
    event.preventDefault()
    if (this.code) {
      navigator.clipboard.writeText(this.code)
    }
  }
}
