import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core'

import { CommonModule } from '@angular/common'
import { Paginable } from '../paginable.interface'
import { BlockListComponent } from '../block-list/block-list.component'
import { PaginationDotsComponent } from '../pagination-dots/pagination-dots.component'
import { TranslateModule } from '@ngx-translate/core'
import { PreviousNextButtonsComponent } from '../previous-next-buttons/previous-next-buttons.component'

@Component({
  selector: 'gn-ui-resource-wrapper',
  templateUrl: './resource-wrapper.component.html',
  styleUrls: ['./resource-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PaginationDotsComponent,
    BlockListComponent,
    TranslateModule,
    PreviousNextButtonsComponent,
  ],
})
export class ResourceWrapperComponent implements AfterViewInit, Paginable {
  @Input() containerClass = ''
  @Input() paginationContainerClass = 'w-full bottom-0 top-auto'
  @ContentChildren('block', { read: ElementRef }) blocks: QueryList<
    ElementRef<HTMLElement>
  >

  @Input() title: string
  @ViewChild(BlockListComponent) list: BlockListComponent

  @ViewChild('resourceWrapperContainer')
  resourceWrapperContainer: ElementRef<HTMLElement>
  get paginableElement(): Paginable {
    return this
  }

  protected minHeight = 0
  protected subComponentSize: 'M' | 'S' | 'XS' = 'M'
  protected pageSize = 4
  protected currentPage_ = 0

  protected get pages() {
    return new Array(this.pagesCount).fill(0).map((_, i) => i)
  }
  get isFirstPage() {
    return this.currentPage_ === 0
  }
  get isLastPage() {
    return this.currentPage_ === this.pagesCount - 1
  }
  get pagesCount() {
    return this.blocks ? Math.ceil(this.blocks.length / this.pageSize) : 1
  }
  get currentPage() {
    return this.currentPage_ + 1 // this is 1-based
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.blocks.changes.subscribe(() => {
      this.updateSizes()
      this.refreshBlocksVisibility()
    })
    this.updateSizes()
    this.refreshBlocksVisibility()
    // we store the first height as the min-height of the list container
    this.minHeight = this.resourceWrapperContainer.nativeElement.clientHeight
    this.changeDetector.detectChanges()
  }

  protected refreshBlocksVisibility = () => {
    this.blocks.forEach((block, index) => {
      const element = block.nativeElement
      element.style.display =
        index >= this.currentPage_ * this.pageSize &&
        index < (this.currentPage_ + 1) * this.pageSize
          ? null
          : 'none'
      //element.setAttribute('data-size', this.subComponentSize)//TODO after my ticket i think
    })
  }

  protected updateSizes() {
    this.subComponentSize = this.computeSubComponentSize()
    this.pageSize = this.computePageSize()
  }

  protected computeSubComponentSize(): 'M' | 'S' | 'XS' {
    // size M for max 12 elts; S for max 18 elts; XS for more
    if (!this.blocks) return 'M'
    const blocksCount = this.blocks.length
    if (blocksCount <= 12) return 'M'
    if (blocksCount <= 18) return 'S'
    return 'XS'
  }

  protected computePageSize(): number {
    switch (this.subComponentSize) {
      case 'M':
        return 4
      case 'S':
        return 6
      case 'XS':
        return 8
      default:
        return 4
    }
  }

  // pageIndex is 1-based
  public goToPage(pageIndex: number) {
    this.currentPage_ = Math.max(
      Math.min(pageIndex - 1, this.pagesCount - 1),
      0
    )
    this.changeDetector.detectChanges()
    this.refreshBlocksVisibility()
  }

  public goToPrevPage() {
    if (this.isFirstPage) return
    this.goToPage(this.currentPage - 1)
  }

  public goToNextPage() {
    if (this.isLastPage) return
    this.goToPage(this.currentPage + 1)
  }
}
