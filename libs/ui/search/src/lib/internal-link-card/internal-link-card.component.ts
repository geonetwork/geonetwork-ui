import { Component, Input, TemplateRef, OnInit } from '@angular/core'
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
import { removeWhitespace, stripHtml } from '@geonetwork-ui/util/shared'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matLocationSearchingOutline } from '@ng-icons/material-icons/outline'
import { matCode } from '@ng-icons/material-icons/baseline'
import { iconoirDatabase, iconoirMap } from '@ng-icons/iconoir'
import { TranslateModule } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

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
  @Input() isGeodata: boolean
  @Input() set size(value: CardSize) {
    this._size = value
    this.cardClass = this.sizeClassMap[value] || ''
    this.thumbnailContainerClass = this.thumbnailSizeClassMap[value] || 'hidden'
  }
  abstract: string

  get size(): CardSize {
    return this._size
  }

  cardClass = ''
  thumbnailContainerClass = ''

  private _size: CardSize = 'M'

  // Updated size classes with consistent margins and paddings
  private readonly sizeClassMap: Record<CardSize, string> = {
    L: 'min-h-[205px] md:w-[992px] py-4 px-6 flex items-start gap-5',
    M: 'min-h-[140px] md:w-[570px] py-2 px-6 flex items-start gap-4',
    S: 'min-h-[135px] md:w-80 p-4 block',
    XS: 'min-h-[68px] md:w-[487px] py-2 px-6 block',
  }

  private readonly thumbnailSizeClassMap: Record<CardSize, string> = {
    L: 'w-[190px] h-[169px] rounded-lg overflow-hidden shrink-0',
    M: 'w-[110px] h-[140px] rounded-lg overflow-hidden shrink-0',
    S: 'hidden',
    XS: 'hidden',
  }

  ngOnInit() {
    this.abstract = removeWhitespace(stripHtml(this.record?.abstract))
  }

  get organization(): Organization {
    return this.record.ownerOrganization
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
