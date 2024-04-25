import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { getBadgeColor, getFileFormat } from '@geonetwork-ui/util/shared'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/model/record'
import { MatPaginator, PageEvent } from '@angular/material/paginator'

const FILTER_FORMATS = ['all', 'csv', 'excel', 'json', 'shp', 'others'] as const
type FilterFormat = typeof FILTER_FORMATS[number]

@Component({
  selector: 'gn-ui-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnChanges {
  @ViewChild('matPaginator') matPaginator: MatPaginator

  @Input() listItems: any[]
  @Input() title = ''
  @Input() listPageSize = 1

  currentPage = 0
  listLength = 1
  listPages = []

  activeFilterFormats: FilterFormat[] = ['all']

  @Input() previousButtonWidth = 1.4
  @Input() previousButtonHeight = 1.4
  previousButtonStyle = ''

  @Input() nextButtonWidth = 1.4
  @Input() nextButtonHeight = 1.4
  nextButtonStyle = ''

  isFirstPage = true
  isLastPage = false

  constructor(
    private readonly translateService: TranslateService,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    this.previousButtonStyle = `width: ${this.previousButtonWidth}rem; height: ${this.previousButtonHeight}rem;`
    this.nextButtonStyle = `width: ${this.nextButtonWidth}rem; height: ${this.nextButtonHeight}rem;`
  }

  ngOnChanges(changes: SimpleChanges): void {
    const listItems = changes['listItems']
    const listItemsValue = listItems.currentValue as any[]
    const listHasChanged = listItems.currentValue !== listItems.previousValue

    if (listHasChanged) {
      this.listLength = listItemsValue.length
      const listPages = Math.ceil(listItemsValue.length / this.listPageSize)

      this.listPages = []
      for (let i = 0; i < listPages; i++) {
        this.listPages.push(i)
      }
    }
    this.changeDetector.markForCheck()
  }

  /**
   * Click on previous arrow
   */
  goToPreviousPage() {
    if (this.isFirstPage) return
    this.matPaginator.previousPage()
    this.checkListProperties()
    this.changeDetector.markForCheck()
  }

  /**
   * Click on next arrow
   */
  goToNextPage() {
    if (this.isLastPage) return
    this.matPaginator.nextPage()
    this.checkListProperties()
    this.changeDetector.markForCheck()
  }

  /**
   * Click on bottom buttons
   * @param newIndex
   */
  goToPage(newIndex: number) {
    this.currentPage = newIndex
    this.matPaginator.pageIndex = newIndex
    this.checkListProperties()
    this.changeDetector.markForCheck()
  }

  /**
   * Called internaly by goToNextPage() and goToPreviousPage()
   * @param event
   */
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex
    this.checkListProperties()
    this.changeDetector.markForCheck()
  }

  private checkListProperties() {
    this.isFirstPage = this.currentPage === 0
    this.isLastPage = this.currentPage === this.listPages.length - 1
  }

  // TODO <--------------------------------------------------------------------- TODO:

  get filteredListItems(): DatasetDistribution[] {
    const startIndex = this.currentPage * this.listPageSize
    const endIndex = startIndex + this.listPageSize

    return this.listItems
      .filter((link) =>
        this.activeFilterFormats.some((format) =>
          this.isLinkOfFormat(link, format)
        )
      )
      .slice(startIndex, endIndex)
  }

  get visibleFormats(): FilterFormat[] {
    return FILTER_FORMATS.filter((format) =>
      this.listItems.some((link) => this.isLinkOfFormat(link, format))
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
