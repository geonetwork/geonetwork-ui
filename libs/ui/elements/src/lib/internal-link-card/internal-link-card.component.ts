import {
  Component,
  Input,
  TemplateRef,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common'
import { KindBadgeComponent } from '../kind-badge/kind-badge.component'
import { MarkdownParserComponent } from '../markdown-parser/markdown-parser.component'
import { MetadataQualityComponent } from '../metadata-quality/metadata-quality.component'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component'
import {
  propagateToDocumentOnly,
  removeWhitespace,
  stripHtml,
} from '@geonetwork-ui/util/shared'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  matLocationSearchingOutline,
  matEmailOutline,
  matPhoneOutline,
  matLocationOnOutline,
} from '@ng-icons/material-icons/outline'
import { TranslateModule } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { fromEvent, Subscription } from 'rxjs'

marker('record.kind.data')
marker('record.kind.reuse')
marker('record.kind.service')

type CardSize = 'L' | 'M' | 'S' | 'XS'

@Component({
  selector: 'gn-ui-internal-link-card',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    ThumbnailComponent,
    MetadataQualityComponent,
    NgTemplateOutlet,
    NgIconComponent,
    TranslateModule,
    KindBadgeComponent,
    MarkdownParserComponent,
  ],
  providers: [
    provideIcons({
      matLocationSearchingOutline,
      matEmailOutline,
      matPhoneOutline,
      matLocationOnOutline,
    }),
    provideNgIconsConfig({
      size: '1.2em',
    }),
  ],
  templateUrl: './internal-link-card.component.html',
  styleUrls: ['./internal-link-card.component.css'],
})
export class InternalLinkCardComponent implements OnInit {
  @Input() record: CatalogRecord
  @Input() metadataQualityDisplay: boolean
  @Input() favoriteTemplate: TemplateRef<{ $implicit: CatalogRecord }>
  @Input() linkHref: string = null
  @Input() isGeodata: boolean
  @Input() set size(value: CardSize) {
    this._size = value
    this.cardClass = this.sizeClassMap[value] || ''
    this.thumbnailContainerClass = this.thumbnailSizeClassMap[value] || 'hidden'
  }
  get size(): CardSize {
    return this._size
  }
  @Output() mdSelect = new EventEmitter<CatalogRecord>()
  subscription = new Subscription()

  abstract: string

  cardClass = ''
  thumbnailContainerClass = ''

  private _size: CardSize = 'M'

  private readonly sizeClassMap: Record<CardSize, string> = {
    L: 'min-h-[190px] w-full py-3 px-3 flex items-start gap-5',
    M: 'min-h-[140px] py-3 px-3 flex items-start gap-4',
    S: 'min-h-[220px] py-3 px-3 flex gap-4',
    XS: 'min-h-[108px] py-3 px-3 flex gap-4',
  }

  private readonly thumbnailSizeClassMap: Record<CardSize, string> = {
    L: 'w-[190px] h-[180px] rounded-lg overflow-hidden shrink-0',
    M: 'w-[110px] h-[140px] rounded-lg overflow-hidden shrink-0',
    S: 'hidden',
    XS: 'hidden',
  }

  private readonly titleClassMap: Record<CardSize, string> = {
    L: 'text-xl line-clamp-1',
    M: 'text-base line-clamp-1',
    S: 'text-base line-clamp-3 ml-2',
    XS: 'text-base line-clamp-1 ml-2',
  }

  constructor(protected elementRef: ElementRef) {}

  ngOnInit(): void {
    this.abstract = removeWhitespace(stripHtml(this.record?.abstract))
    this.subscription.add(
      fromEvent(this.elementRef.nativeElement, 'click').subscribe(
        (event: Event) => {
          event.preventDefault()
          propagateToDocumentOnly(event)
          this.mdSelect.emit(this.record)
        }
      )
    )
  }

  get organization(): Organization {
    return this.record.ownerOrganization
  }

  get contacts() {
    return (
      (this.record.kind === 'dataset'
        ? this.record.contactsForResource
        : this.record.contacts) || []
    )
  }

  getTitleClass() {
    return this.titleClassMap[this._size]
  }

  openExternalUrl(event: Event, url: URL): void {
    event.stopPropagation()
    window.open(url, '_blank')
  }

  openMailto(event: Event, email: string): void {
    event.stopPropagation()
    window.open(`mailto:${email}`, '_blank')
  }

  copyToClipboard(event: Event, text: string): void {
    event.stopPropagation()
    navigator.clipboard.writeText(text)
  }

  get shouldShowThumbnail(): boolean {
    return this.size === 'L' || this.size === 'M'
  }
}
