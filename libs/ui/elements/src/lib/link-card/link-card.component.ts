import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matOpenInNew } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      matOpenInNew,
    }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class LinkCardComponent {
  @Input() link: DatasetOnlineResource
  @Input() compact = false

  get title() {
    if (this.link.name && this.link.description) {
      return `${this.link.name} | ${this.link.description}`
    }
    return this.link.name || this.link.description || ''
  }
}
