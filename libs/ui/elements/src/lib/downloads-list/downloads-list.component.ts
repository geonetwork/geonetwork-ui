import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  getBadgeColor,
  getFileFormat,
  LinkClassifierService,
  MetadataLink,
  MetadataLinkType,
} from '@geonetwork-ui/util/shared'

marker('datahub.search.filter.all')
marker('datahub.search.filter.others')

@Component({
  selector: 'gn-ui-downloads-list',
  templateUrl: './downloads-list.component.html',
  styleUrls: ['./downloads-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsListComponent implements OnInit {
  constructor(
    private linkClassifier: LinkClassifierService,
    private translateService: TranslateService
  ) {}

  @Input() links: MetadataLink[]

  filterFormats: string[] = ['all', 'csv', 'excel', 'json', 'shp', 'others']
  activeFilterFormats: string[] = ['all']

  filteredLinks: MetadataLink[] = []
  filterButtons: FilterButton[]

  toggleFilterFormat(format: string): void {
    if (format === 'all') {
      this.activeFilterFormats = ['all']
    } else {
      this.activeFilterFormats = this.isFilterActive(format)
        ? this.activeFilterFormats.filter((f: string) => format !== f)
        : [...this.activeFilterFormats.filter((f) => f !== 'all'), format]
    }
    this.filteredLinks = this.filterLinks(this.links)
  }

  isFilterActive(filter: string): boolean {
    return this.activeFilterFormats.includes(filter)
  }

  getFilterFormatTitle(format: string) {
    if (format === 'all' || format === 'others') {
      return this.translateService.instant(`datahub.search.filter.${format}`)
    }
    return format
  }

  ngOnInit(): void {
    this.filteredLinks = this.filterLinks(this.links)

    this.filterButtons = this.filterFormats.map((format) => {
      return {
        format,
        color: getBadgeColor(format),
      }
    })
  }

  filterLinks(links: MetadataLink[]) {
    if (
      this.activeFilterFormats.length === 0 ||
      this.activeFilterFormats.includes('all')
    ) {
      return links
    }
    let others: MetadataLink[] = []
    if (this.activeFilterFormats.includes('others')) {
      others = links.filter((link) => {
        let isOther = true
        for (const format of this.filterFormats) {
          if (format === getFileFormat(link)) isOther = false
        }
        return isOther
      })
    }
    const filteredLinks = links.filter((link: MetadataLink) => {
      return this.activeFilterFormats.includes(getFileFormat(link))
    })
    return [...filteredLinks, ...others]
  }

  getLinkFormat(link: MetadataLink) {
    return getFileFormat(link)
  }

  getLinkColor(link: MetadataLink) {
    return getBadgeColor(getFileFormat(link))
  }

  getIsFromWfs(link: MetadataLink) {
    return link.type === MetadataLinkType.WFS
  }
}

export type FilterButton = {
  format: string
  color: string | void
}
