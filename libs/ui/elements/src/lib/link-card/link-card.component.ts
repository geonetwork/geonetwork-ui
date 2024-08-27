import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIconModule],
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
