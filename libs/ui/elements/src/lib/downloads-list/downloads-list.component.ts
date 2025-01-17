import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { getBadgeColor, getFileFormat } from '@geonetwork-ui/util/shared'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { DownloadItemComponent } from '../download-item/download-item.component'

marker('datahub.search.filter.all')
marker('datahub.search.filter.others')

const FILTER_FORMATS = ['all', 'csv', 'excel', 'json', 'shp', 'others'] as const
type FilterFormat = typeof FILTER_FORMATS[number]

@Component({
  selector: 'gn-ui-downloads-list',
  templateUrl: './downloads-list.component.html',
  styleUrls: ['./downloads-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DownloadItemComponent,
    TranslateModule,
  ],
})
export class DownloadsListComponent {
  constructor(private translateService: TranslateService) {}

  @Input() links: DatasetOnlineResource[]

  activeFilterFormats: FilterFormat[] = ['all']

  private filterByProtocol(
    links: DatasetOnlineResource[]
  ): DatasetOnlineResource[] {
    const preferredLinks = new Map<string, DatasetOnlineResource>()
    const OGC_FEATURES_PROTOCOL = 'ogcFeatures'

    links.forEach((link) => {
      const format = getFileFormat(link)
      if (!preferredLinks.has(format)) {
        preferredLinks.set(format, link)
      } else {
        const existingLink = preferredLinks.get(format)
        if (
          link.accessServiceProtocol === OGC_FEATURES_PROTOCOL &&
          existingLink?.accessServiceProtocol !== OGC_FEATURES_PROTOCOL
        ) {
          preferredLinks.set(format, link)
        }
      }
    })

    return Array.from(preferredLinks.values())
  }

  get filteredLinks(): DatasetOnlineResource[] {
    const filteredByFormat = this.links.filter((link) =>
      this.activeFilterFormats.some((format) =>
        this.isLinkOfFormat(link, format)
      )
    )
    return this.filterByProtocol(filteredByFormat)
  }

  get visibleFormats(): FilterFormat[] {
    return FILTER_FORMATS.filter((format) =>
      this.links.some((link) => this.isLinkOfFormat(link, format))
    )
  }

  toggleFilterFormat(format: FilterFormat): void {
    if (format === 'all') {
      this.activeFilterFormats = ['all']
      return
    }
    if (this.isFilterActive(format)) {
      this.activeFilterFormats = this.activeFilterFormats.filter(
        (f: string) => format !== f
      )
    } else {
      this.activeFilterFormats = [
        ...this.activeFilterFormats.filter((f) => f !== 'all'),
        format,
      ]
    }
    if (this.activeFilterFormats.length === 0) {
      this.activeFilterFormats = ['all']
    }
  }

  isFilterActive(filter: FilterFormat): boolean {
    return this.activeFilterFormats.includes(filter)
  }

  getFilterFormatTitle(format: FilterFormat) {
    if (format === 'all' || format === 'others') {
      return this.translateService.instant(`datahub.search.filter.${format}`)
    }
    return format
  }

  isLinkOfFormat(link: DatasetOnlineResource, format: FilterFormat): boolean {
    if (format === 'all') {
      return true
    }
    if (getFileFormat(link) === null) {
      return format === 'others'
    }
    if (format === 'others') {
      const knownFormats = FILTER_FORMATS.filter(
        (format) => format !== 'all' && format !== 'others'
      )
      return knownFormats.every(
        (knownFormat) => !getFileFormat(link).includes(knownFormat)
      )
    }
    return getFileFormat(link).includes(format)
  }

  getLinkFormat(link: DatasetOnlineResource) {
    return getFileFormat(link)
  }

  getLinkColor(link: DatasetOnlineResource) {
    return getBadgeColor(getFileFormat(link))
  }

  isFromWfs(link: DatasetOnlineResource) {
    return link.type === 'download' && link.accessServiceProtocol === 'wfs'
  }
}
