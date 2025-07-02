import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
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
  pageSize = 4
  @Input() containerClass = ''
  @Input() paginationContainerClass = 'w-full bottom-0 top-auto'
  @ContentChildren('block', { read: ElementRef }) blocks: QueryList<
    ElementRef<HTMLElement>
  >
  @ViewChild('blockContainer') blockContainer: ElementRef<HTMLElement>
  @Output() listChanges = new EventEmitter<BlockListComponent>()
  subComponentSize: ComponentSize = 'M'

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
    return this.currentPage_ + 1
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  @HostListener('window:resize')
  onResize() {
    this.updateSizes()
    this.refreshBlocksVisibility()
  }

  ngAfterViewInit() {
    this.blocks.changes.subscribe(() => {
      this.updateSizes()
      this.refreshBlocksVisibility()
      this.goToPage(1)
      this.changeDetector.detectChanges()
      this.listChanges.emit(this)
    })
    this.updateSizes()
    this.refreshBlocksVisibility()
    this.changeDetector.detectChanges()
    this.listChanges.emit(this)
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

  protected updateSizes() {
    this.subComponentSize = this.computeResponsiveSize()
    this.pageSize = this.computePageSize()
  }

  protected computeResponsiveSize(): ComponentSize {
    if (window.innerWidth < 768) {
      return 'XS'
    }
    return this.computeSubComponentSize()
  }

  protected computeSubComponentSize(): ComponentSize {
    if (!this.blocks) return 'M'
    const subComponentsCount = this.blocks.length
    if (subComponentsCount <= 3) return 'L'
    if (subComponentsCount <= 12) return 'M'
    if (subComponentsCount <= 18) return 'S'
    return 'XS'
  }

  protected computePageSize(): number {
    switch (this.subComponentSize) {
      case 'L':
        return 3
      case 'S':
        return 6
      case 'XS':
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
