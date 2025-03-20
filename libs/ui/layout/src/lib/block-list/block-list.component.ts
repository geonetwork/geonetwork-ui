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
import { PaginationDotsComponent } from '../pagination-dots/pagination-dots.component'

type ComponentSize = 'L' | 'M' | 'S' | 'XS'
@Component({
  selector: 'gn-ui-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PaginationDotsComponent],
})
export class BlockListComponent implements AfterViewInit, Paginable {
  pageSize = 10
  @Input() containerClass = ''
  @Input() paginationContainerClass = 'w-full bottom-0 top-auto'
  @ContentChildren('block', { read: ElementRef }) blocks: QueryList<
    ElementRef<HTMLElement>
  >
  @ViewChild('blockContainer') blockContainer: ElementRef<HTMLElement>
  protected subComponentSize: ComponentSize = ComponentSize.MEDIUM
  protected minHeight = 0

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
      this.goToPage(1)
      this.changeDetector.detectChanges()
    })
    this.updateSizes()
    this.refreshBlocksVisibility()

    // we store the first height as the min-height of the list container
    this.minHeight = this.blockContainer.nativeElement.clientHeight
    this.changeDetector.detectChanges()
  }

  protected refreshBlocksVisibility = () => {
    this.blocks.forEach((block, index) => {
      block.nativeElement.style.display =
        index >= this.currentPage_ * this.pageSize &&
        index < (this.currentPage_ + 1) * this.pageSize
          ? null
          : 'none'
    })
  }

  protected refreshSubComponentsVisibility = () => {
    this.blocks.forEach((subComponent, index) => {
      const element = subComponent.nativeElement
      element.style.display =
        index >= this.currentPage_ * this.pageSize &&
        index < (this.currentPage_ + 1) * this.pageSize
          ? null
          : 'none'
    })
  }

  protected updateSizes() {
    this.subComponentSize = this.computeSubComponentSize()
    this.pageSize = this.computePageSize()
  }

  protected computeSubComponentSize(): ComponentSize {
    if (!this.blocks) return ComponentSize.MEDIUM
    const subComponentsCount = this.blocks.length
    if (subComponentsCount <= 12) return ComponentSize.MEDIUM
    if (subComponentsCount <= 18) return ComponentSize.SMALL
    return ComponentSize.EXTRA_SMALL
  }

  protected computePageSize(): number {
    switch (this.subComponentSize) {
      case ComponentSize.MEDIUM:
        return 4
      case ComponentSize.SMALL:
        return 6
      case ComponentSize.EXTRA_SMALL:
        return 8
      default:
        return 4
    }
  }

  public goToPage(pageIndex: number) {
    this.currentPage_ = Math.max(
      Math.min(pageIndex - 1, this.pagesCount - 1),
      0
    )
    this.changeDetector.detectChanges()
    this.refreshSubComponentsVisibility()
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
