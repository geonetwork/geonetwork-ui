import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core'
import { TranslateDirective, TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { getBadgeColor, getFileFormat } from '@geonetwork-ui/util/shared'
import { DatasetDownloadDistribution } from '@geonetwork-ui/common/domain/model/record'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { DownloadItemComponent } from '../download-item/download-item.component'
import {
  BlockListComponent,
  PreviousNextButtonsComponent,
} from '@geonetwork-ui/ui/layout'

marker('datahub.search.filter.all')
marker('datahub.search.filter.others')

const FILTER_FORMATS = ['all', 'csv', 'excel', 'json', 'shp', 'others'] as const
type FilterFormat = (typeof FILTER_FORMATS)[number]

@Component({
  selector: 'gn-ui-downloads-list',
  templateUrl: './downloads-list.component.html',
  styleUrls: ['./downloads-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    BlockListComponent,
    DownloadItemComponent,
    TranslateDirective,
    PreviousNextButtonsComponent,
  ],
})
export class DownloadsListComponent {
  constructor(
    private translateService: TranslateService,
    private changeDetector: ChangeDetectorRef
  ) {}

  _list: BlockListComponent
  @Input() links: DatasetDownloadDistribution[]

  get linksCount(): number {
    return this.filteredLinks?.length || 0
  }

  activeFilterFormats: FilterFormat[] = ['all']

  updateList($event: BlockListComponent) {
    this._list = $event
    this.changeDetector.detectChanges()
  }

  private removeDuplicateFormats(
    links: DatasetDownloadDistribution[]
  ): DatasetDownloadDistribution[] {
    const preferredLinks = new Map<string, DatasetDownloadDistribution>()

    links.forEach((link) => {
      const format = getFileFormat(link)
      const withoutNameSpace = (link.name || link.description || '').replace(
        /^.*?:/,
        ''
      )
      const uniqueKey = `${format}-${withoutNameSpace}`
      if (!preferredLinks.has(uniqueKey)) {
        preferredLinks.set(uniqueKey, link)
      } else {
        const existingLink = preferredLinks.get(uniqueKey)
        if (
          link.accessServiceProtocol === 'ogcFeatures' &&
          existingLink?.accessServiceProtocol !== 'ogcFeatures'
        ) {
          preferredLinks.set(uniqueKey, link)
        }
      }
    })

    return Array.from(preferredLinks.values())
  }

  get filteredLinks(): DatasetDownloadDistribution[] {
    const filteredByFormat = this.links.filter((link) =>
      this.activeFilterFormats.some((format) =>
        this.isLinkOfFormat(link, format)
      )
    )
    return this.removeDuplicateFormats(filteredByFormat)
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

  isLinkOfFormat(
    link: DatasetDownloadDistribution,
    format: FilterFormat
  ): boolean {
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

  getLinkFormat(link: DatasetDownloadDistribution) {
    return getFileFormat(link)
  }

  getLinkColor(link: DatasetDownloadDistribution) {
    return getBadgeColor(getFileFormat(link))
  }

  isFromApi(link: DatasetDownloadDistribution) {
    return (
      link.type === 'download' &&
      (link.accessServiceProtocol === 'wfs' ||
        link.accessServiceProtocol === 'ogcFeatures')
    )
  }
}
