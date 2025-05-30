import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { InternalLinkCardComponent } from '../internal-link-card/internal-link-card.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { provideIcons } from '@ng-icons/core'
import { matOpenInNew } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-related-record-card',
  templateUrl: './related-record-card.component.html',
  styleUrls: ['./related-record-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InternalLinkCardComponent, MatTooltipModule],
  standalone: true,
  viewProviders: [provideIcons({ matOpenInNew })],
})
export class RelatedRecordCardComponent {
  private readonly baseClasses: string

  @Input() linkHref: string = null
  @Input() record: CatalogRecord
  @Input() extraClass = ''
  @Input() favoriteTemplate: TemplateRef<{ $implicit: CatalogRecord }>
  @Input() metadataQualityDisplay: boolean
  @Input() size: string

  constructor() {
    this.baseClasses = [
      'w-72',
      'h-96',
      'overflow-hidden',
      'rounded-lg',
      'bg-white',
      'cursor-pointer',
      'block',
      'hover:-translate-y-2 ',
      'duration-[180ms]',
    ].join(' ')
  }

  get classList() {
    return `${this.baseClasses} ${this.extraClass}`
  }
}
