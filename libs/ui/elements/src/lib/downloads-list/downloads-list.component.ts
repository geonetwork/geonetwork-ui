import { Component, Input } from '@angular/core'
import { MetadataLinkValid } from '@geonetwork-ui/util/shared'
import { getBadgeColor, LinkHelperService } from '@geonetwork-ui/feature/search'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-downloads-list',
  templateUrl: './downloads-list.component.html',
  styleUrls: ['./downloads-list.component.css'],
})
export class DownloadsListComponent {
  constructor(
    private linkHelper: LinkHelperService,
    private translateService: TranslateService
  ) {}

  @Input() links: MetadataLinkValid[]

  filterParam: string = ''
  filterFormats: string[] = ['csv', 'excel', 'json', 'shapefile']
  activeFilterFormats: string[] = ['all']

  processedLinks: MetadataLinkValid[] = []
  filteredLinks: MetadataLinkValid[] = []
  filterButtons: Object[]

  toggleFilterFormat(format: string): void {
    if (format === 'all') {
      this.activeFilterFormats = ['all']
    } else {
      this.activeFilterFormats = this.isFilterActive(format)
        ? this.activeFilterFormats.filter((f: string) => format !== f)
        : [...this.activeFilterFormats.filter((f) => f !== 'all'), format]
    }
    this.filteredLinks = this.filterLinks(this.processedLinks)
  }

  isFilterActive(filter: string): boolean {
    return this.activeFilterFormats.includes(filter)
  }

  ngOnChanges(): void {
    this.processedLinks = this.formatLinks(this.links)
    this.processedLinks = this.assignColor(this.processedLinks)
    this.processedLinks = this.isGeneratedFromWfs(this.processedLinks)
    this.filteredLinks = this.filterLinks(this.processedLinks)

    console.log(this.filteredLinks)

    this.filterButtons = this.filterFormats.map((format) => {
      return {
        format: format,
        color: getBadgeColor(format),
      }
    })
  }

  formatLinks(links) {
    return links.map((link) => {
      return {
        ...link,
        format: link.format.split(':').at(-1),
      }
    })
  }

  filterLinks(links: MetadataLinkValid[]) {
    if (
      this.activeFilterFormats.length === 0 ||
      this.activeFilterFormats.includes('all')
    ) {
      return links
    }
    let others: MetadataLinkValid[] = []
    if (this.activeFilterFormats.includes('others')) {
      others = links.filter((link) => {
        let isOther = true
        for (let format of this.filterFormats) {
          if (format === link.format) isOther = false
        }
        return isOther
      })
    }
    let filteredLinks = links.filter((link: MetadataLinkValid) => {
      return this.activeFilterFormats.includes(link.format)
    })
    return [...filteredLinks, ...others]
  }

  assignColor(links: MetadataLinkValid[]) {
    return links.map((link: MetadataLinkValid) => {
      return {
        ...link,
        color: getBadgeColor(link.format),
      }
    })
  }

  isGeneratedFromWfs(links: MetadataLinkValid[]) {
    return links.map((link) => {
      if (!this.linkHelper.isWfsLink(link)) return link
      return {
        ...link,
        name: this.translateService.instant(
          'datahub.search.filter.generatedByWfs',
          { name: link.label }
        ),
      }
    })
  }
}
