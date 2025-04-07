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
import {
  MarkdownParserComponent,
  MetadataQualityComponent,
  ThumbnailComponent,
} from '@geonetwork-ui/ui/elements'
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
import { matCode } from '@ng-icons/material-icons/baseline'
import { iconoirDatabase, iconoirMap, iconoirInternet } from '@ng-icons/iconoir'
import { TranslateModule } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { fromEvent, Subscription } from 'rxjs'

marker('record.kind.dataset')
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
    MarkdownParserComponent,
  ],
  providers: [
    provideIcons({
      matLocationSearchingOutline,
      matCode,
      iconoirDatabase,
      iconoirMap,
      iconoirInternet,
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
    L: 'min-h-[190px] md:w-[992px] py-3 px-3 flex items-start gap-5',
    M: 'min-h-[140px] md:w-[570px] py-3 px-3 flex items-start gap-4',
    S: 'min-h-[220px] md:w-[370px] py-3 px-3 flex gap-4',
    XS: 'min-h-[108px] md:w-[570px] py-3 px-3 flex gap-4',
  }

  private readonly thumbnailSizeClassMap: Record<CardSize, string> = {
    L: 'w-[190px] h-[180px] rounded-lg overflow-hidden shrink-0',
    M: 'w-[110px] h-[140px] rounded-lg overflow-hidden shrink-0',
    S: 'hidden',
    XS: 'hidden',
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

  getKindInfo(): { text: string; icon: string } {
    if (!this.record?.kind) return { text: '', icon: '' }

    switch (this.record.kind.toLowerCase()) {
      case 'dataset':
        return { text: 'record.kind.dataset', icon: 'iconoirDatabase' }
      case 'reuse':
        return { text: 'record.kind.reuse', icon: 'iconoirMap' }
      case 'service':
        return { text: 'record.kind.service', icon: 'matCode' }
      default:
        return { text: '', icon: '' }
    }
  }
}
