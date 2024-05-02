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
import { DatasetDistribution } from '@geonetwork-ui/common/domain/model/record'
import { MatPaginator, PageEvent } from '@angular/material/paginator'

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

  isFirstPage = true
  isLastPage = false

  constructor(
    private readonly translateService: TranslateService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

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

  get filteredListItems(): DatasetDistribution[] {
    const startIndex = this.currentPage * this.listPageSize
    const endIndex = startIndex + this.listPageSize

    return this.listItems.slice(startIndex, endIndex)
  }
}
