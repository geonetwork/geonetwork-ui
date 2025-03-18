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
import { Subscription } from 'rxjs'
export enum ComponentSize {
  LARGE = 'L',
  MEDIUM = 'M',
  SMALL = 'S',
  EXTRA_SMALL = 'XS',
}

@Component({
  selector: 'gn-ui-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PaginationDotsComponent],
})
export class BlockListComponent implements AfterViewInit, Paginable {
  @Input() pageSize = 4
  @Input() size: ComponentSize = ComponentSize.MEDIUM
  @Input() containerClass = ''
  @Input() paginationContainerClass = 'w-full bottom-0 top-auto'
  @ContentChildren('block', { read: ElementRef }) blocks: QueryList<
    ElementRef<HTMLElement>
  >
  @ViewChild('blockContainer') blockContainer: ElementRef<HTMLElement>

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

  protected updatePageSize() {
    switch (this.size) {
      case ComponentSize.MEDIUM:
        this.pageSize = 4
        break
      case ComponentSize.SMALL:
        this.pageSize = 6
        break
      case ComponentSize.EXTRA_SMALL:
        this.pageSize = 8
        break
      default:
        this.pageSize = 4
    }
  }

  protected computeSize(): ComponentSize {
    if (!this.blocks) return ComponentSize.MEDIUM
    const blocksCount = this.blocks.length
    if (blocksCount <= 12) return ComponentSize.MEDIUM
    if (blocksCount <= 18) return ComponentSize.SMALL
    return ComponentSize.EXTRA_SMALL
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

  private blocksChangeSubscription: Subscription

  ngAfterViewInit() {
    // Handle direct content children
    this.blocksChangeSubscription = this.blocks?.changes.subscribe(() => {
      this.handleBlocksChange()
    })

    // Initial calculation
    this.handleBlocksChange()
    this.minHeight = this.blockContainer?.nativeElement.clientHeight || 0
    this.changeDetector.detectChanges()
  }

  ngOnDestroy() {
    this.blocksChangeSubscription?.unsubscribe()
  }

  setBlocks(blocks: QueryList<ElementRef<HTMLElement>>) {
    // Unsubscribe from previous subscription if any
    this.blocksChangeSubscription?.unsubscribe()

    this.blocks = blocks
    // Subscribe to new blocks changes
    this.blocksChangeSubscription = blocks?.changes.subscribe(() => {
      this.handleBlocksChange()
    })

    // Initial calculation
    this.handleBlocksChange()
  }

  private handleBlocksChange() {
    this.size = this.computeSize()
    this.updatePageSize()
    this.refreshBlocksVisibility()
    this.changeDetector.markForCheck()
  }
}
