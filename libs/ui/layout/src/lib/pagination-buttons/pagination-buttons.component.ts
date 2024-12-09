import { Component, Input, OnChanges } from '@angular/core'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { CommonModule } from '@angular/common'
import { iconoirNavArrowLeft, iconoirNavArrowRight } from '@ng-icons/iconoir'
import { Paginable } from '../paginable.interface'

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
  @Input() listComponent: Paginable
  visiblePages: (number | '...')[] = []

  ngOnChanges(): void {
    this.calculateVisiblePages()
  }

  calculateVisiblePages(): void {
    const maxVisiblePages = 5
    const halfVisible = Math.floor(maxVisiblePages / 2)
    const startPage = Math.max(this.listComponent.currentPage - halfVisible, 1)
    const endPage = Math.min(
      this.listComponent.currentPage + halfVisible,
      this.listComponent.pagesCount
    )

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
    if (endPage < this.listComponent.pagesCount) {
      if (endPage < this.listComponent.pagesCount - 1) {
        visiblePages.push('...')
      }
      visiblePages.push(this.listComponent.pagesCount)
    }

    this.visiblePages = visiblePages
  }

  changePage(page) {
    this.setPage(page)
  }

  setPage(newPage) {
    if (!Number.isInteger(newPage)) return
    this.listComponent.goToPage(newPage)
    this.calculateVisiblePages()
  }
}
