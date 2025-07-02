import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core'
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common'
import { fromEvent, Subscription } from 'rxjs'
import { iconoirBank } from '@ng-icons/iconoir'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matLocationSearchingOutline } from '@ng-icons/material-icons/outline'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { KindBadgeComponent } from '../kind-badge/kind-badge.component'
import { MarkdownParserComponent } from '../markdown-parser/markdown-parser.component'
import { MetadataQualityComponent } from '../metadata-quality/metadata-quality.component'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component'
import { removeWhitespace, stripHtml } from '@geonetwork-ui/util/shared'

type CardSize = 'L' | 'M' | 'S' | 'XS'

@Component({
  selector: 'gn-ui-internal-link-card',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgIconComponent,
    MetadataQualityComponent,
    NgTemplateOutlet,
    KindBadgeComponent,
    MarkdownParserComponent,
    ThumbnailComponent,
  ],
  providers: [
    provideIcons({
      iconoirBank,
      matLocationSearchingOutline,
    }),
    provideNgIconsConfig({
      size: '1.2em',
    }),
  ],
  templateUrl: './internal-link-card.component.html',
  styleUrls: ['./internal-link-card.component.scss'],
})
export class InternalLinkCardComponent implements OnInit {
  @Input() record: CatalogRecord
  @Input() linkTarget = '_blank'
  @Input() linkHref: string = null
  @Input() metadataQualityDisplay: boolean
  @Input() favoriteTemplate: TemplateRef<{ $implicit: CatalogRecord }>
  @Input() set size(value: CardSize) {
    this._size = value
    this.cardClass = `size-${value}`
  }
  get size(): CardSize {
    return this._size
  }
  @Output() mdSelect = new EventEmitter<CatalogRecord>()
  subscription = new Subscription()

  abstract: string
  cardClass: string

  private _size: CardSize = 'L'

  constructor(protected elementRef: ElementRef) {}

  ngOnInit(): void {
    this.abstract = removeWhitespace(stripHtml(this.record?.abstract))
    this.subscription.add(
      fromEvent(this.elementRef.nativeElement, 'click').subscribe(() =>
        this.mdSelect.emit(this.record)
      )
    )
  }
  get shouldShowThumbnail(): boolean {
    return this.size === 'L' || this.size === 'M'
  }

  get displayContactIconOnly() {
    const cardWidth =
      this.elementRef.nativeElement.getBoundingClientRect().width
    return (
      this.record.ownerOrganization?.name &&
      this.metadataQualityDisplay &&
      this.size === 'M' &&
      cardWidth <= 490
    )
  }
}
