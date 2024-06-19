import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-related-record-card',
  templateUrl: './related-record-card.component.html',
  styleUrls: ['./related-record-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedRecordCardComponent {
  private readonly baseClasses: string

  @Input() record: CatalogRecord
  @Input() extraClass = ''

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
