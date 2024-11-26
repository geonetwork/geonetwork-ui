import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { CommonModule } from '@angular/common'
import { iconoirNavArrowLeft, iconoirNavArrowRight } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-pagination-buttons',
  templateUrl: './pagination-buttons.component.html',
  styleUrls: ['./pagination-buttons.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, NgIcon],
  viewProviders: [
    provideIcons({
      iconoirNavArrowRight,
      iconoirNavArrowLeft,
    }),
  ],
})
export class PaginationButtonsComponent implements OnChanges {
  @Input() currentPage: number
  @Input() totalPages: number
  visiblePages: (number | '...')[] = []
  @Output() newCurrentPageEvent = new EventEmitter<number>()

  ngOnChanges(): void {
    this.calculateVisiblePages()
  }

  calculateVisiblePages(): void {
    const maxVisiblePages = 5
    const halfVisible = Math.floor(maxVisiblePages / 2)
    const startPage = Math.max(this.currentPage - halfVisible, 1)
    const endPage = Math.min(this.currentPage + halfVisible, this.totalPages)

    const visiblePages: (number | '...')[] = []
    if (startPage > 1) {
      visiblePages.push(1)
      if (startPage > 2) {
        visiblePages.push('...')
      }
    }
    for (let page = startPage; page <= endPage; page++) {
      visiblePages.push(page)
    }
    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        visiblePages.push('...')
      }
      visiblePages.push(this.totalPages)
    }

    this.visiblePages = visiblePages
  }

  changePage(page) {
    this.setPage(page)
  }

  nextPage() {
    this.setPage(this.currentPage + 1)
  }

  previousPage() {
    this.setPage(this.currentPage - 1)
  }

  setPage(newPage) {
    if (!Number.isInteger(newPage)) return
    this.currentPage = newPage
    this.calculateVisiblePages()
    this.newCurrentPageEvent.emit(this.currentPage)
  }
}
