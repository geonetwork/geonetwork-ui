import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common'
import { GeoDataBadgeComponent } from '../geo-data-badge/geo-data-badge.component'
import { KindBadgeComponent } from '../kind-badge/kind-badge.component'
import { MarkdownParserComponent } from '../markdown-parser/markdown-parser.component'
import { MetadataQualityComponent } from '../metadata-quality/metadata-quality.component'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component'
import { removeWhitespace, stripHtml } from '@geonetwork-ui/util/shared'
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { matLocationSearchingOutline } from '@ng-icons/material-icons/outline'
import { InternalLinkCardContactComponent } from '../internal-link-card-contact/internal-link-card-contact.component'
import { iconoirInternet } from '@ng-icons/iconoir'
import { fromEvent, Subscription } from 'rxjs'

type CardSize = 'L' | 'M' | 'S' | 'XS'

@Component({
  selector: 'gn-ui-internal-link-card',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    MetadataQualityComponent,
    NgTemplateOutlet,
    GeoDataBadgeComponent,
    KindBadgeComponent,
    MarkdownParserComponent,
    InternalLinkCardContactComponent,
    ThumbnailComponent,
  ],
  providers: [
    provideIcons({
      iconoirInternet,
      matLocationSearchingOutline,
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
  @Input() linkTarget = '_blank'
  @Input() linkHref: string = null
  @Input() metadataQualityDisplay: boolean
  @Input() favoriteTemplate: TemplateRef<{ $implicit: CatalogRecord }>
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
    L: 'w-full md:w-[190px] h-[180px] rounded-lg overflow-hidden shrink-0',
    M: 'w-[110px] h-[140px] rounded-lg overflow-hidden shrink-0',
    S: 'hidden',
    XS: 'hidden',
  }

  private readonly titleClassMap: Record<CardSize, string> = {
    L: 'text-xl line-clamp-1',
    M: 'text-base line-clamp-2',
    S: 'text-base line-clamp-3 ml-2',
    XS: 'text-base line-clamp-1 ml-2',
  }

  constructor(protected elementRef: ElementRef) {}

  ngOnInit(): void {
    this.abstract = removeWhitespace(stripHtml(this.record?.abstract))
    this.subscription.add(
      fromEvent(this.elementRef.nativeElement, 'click').subscribe(() =>
        this.mdSelect.emit(this.record)
      )
    )
  }

  getTitleClass() {
    return this.titleClassMap[this._size]
  }
  getAbstractClass(): string {
    const marginClass = ['S', 'XS'].includes(this.size) ? 'ml-2' : ''
    const clampClass =
      this.size === 'L' && !this.record.ownerOrganization?.name
        ? 'line-clamp-6'
        : 'line-clamp-2'
    return `${clampClass} ${marginClass}`.trim()
  }
  displayAbstract(): boolean {
    return (
      this.size === 'L' ||
      (['M', 'S'].includes(this.size) && !this.record.ownerOrganization?.name)
    )
  }

  get shouldShowThumbnail(): boolean {
    return this.size === 'L' || this.size === 'M'
  }
}
