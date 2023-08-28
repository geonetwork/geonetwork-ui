import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { getBadgeColor, getFileFormat } from '@geonetwork-ui/util/shared'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'

marker('datahub.search.filter.all')
marker('datahub.search.filter.others')

const FILTER_FORMATS = ['all', 'csv', 'excel', 'json', 'shp', 'others'] as const
type FilterFormat = typeof FILTER_FORMATS[number]

@Component({
  selector: 'gn-ui-downloads-list',
  templateUrl: './downloads-list.component.html',
  styleUrls: ['./downloads-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsListComponent {
  constructor(private translateService: TranslateService) {}

  @Input() links: DatasetDistribution[]

  activeFilterFormats: FilterFormat[] = ['all']

  get filteredLinks(): DatasetDistribution[] {
    return this.links.filter((link) =>
      this.activeFilterFormats.some((format) =>
        this.isLinkOfFormat(link, format)
      )
    )
  }

  get visibleFormats(): FilterFormat[] {
    return FILTER_FORMATS.filter((format) =>
      this.links.some((link) => this.isLinkOfFormat(link, format))
    )
  }

  toggleFilterFormat(format: FilterFormat): void {
    if (format === 'all') {
      this.activeFilterFormats = ['all']
    } else {
      this.activeFilterFormats = this.isFilterActive(format)
        ? this.activeFilterFormats.filter((f: string) => format !== f)
        : [...this.activeFilterFormats.filter((f) => f !== 'all'), format]
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

  isLinkOfFormat(link: DatasetDistribution, format: FilterFormat): boolean {
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

  getLinkFormat(link: DatasetDistribution) {
    return getFileFormat(link)
  }

  getLinkColor(link: DatasetDistribution) {
    return getBadgeColor(getFileFormat(link))
  }

  isFromWfs(link: DatasetDistribution) {
    return link.type === 'service' && link.accessServiceProtocol === 'wfs'
  }
}
