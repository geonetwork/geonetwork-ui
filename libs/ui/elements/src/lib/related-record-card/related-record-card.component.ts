import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component'
import { InternalLinkCardComponent } from '../internal-link-card/internal-link-card.component'
import { RouterLink } from '@angular/router'
import { MatTooltipModule } from '@angular/material/tooltip'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { TranslateModule } from '@ngx-translate/core'
import { matOpenInNew } from '@ng-icons/material-icons/baseline'
import { TemplateRef } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'gn-ui-related-record-card',
  templateUrl: './related-record-card.component.html',
  styleUrls: ['./related-record-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InternalLinkCardComponent,
    ThumbnailComponent,
    RouterLink,
    MatTooltipModule,
    NgIcon,
    TranslateModule,
  ],
  standalone: true,
  viewProviders: [provideIcons({ matOpenInNew })],
})
export class RelatedRecordCardComponent {
  private readonly baseClasses: string

  @Input() record: CatalogRecord
  @Input() extraClass = ''
  @Input() favoriteTemplate: TemplateRef<{ $implicit: CatalogRecord }>
  @Input() metadataQualityDisplay: boolean
  @Output() mdSelect = new EventEmitter<CatalogRecord>()

  constructor(private router: Router) {
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
