import { Component, Input } from '@angular/core'
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
export class PaginationButtonsComponent {
  @Input() listComponent: Paginable

  get visiblePages(): (number | '...')[] {
    const maxVisiblePages = 5
    const halfVisible = Math.floor(maxVisiblePages / 2)
    const startPage = Math.max(this.listComponent.currentPage - halfVisible, 1)
    const endPage = Math.min(
      this.listComponent.currentPage + halfVisible,
      this.listComponent.pagesCount
    )

    const allPages = new Array(this.listComponent.pagesCount)
      .fill(0)
      .map((_, i) => i + 1) // pages are 1-based
    return allPages.reduce((pages, page) => {
      if (page === 1 || page === this.listComponent.pagesCount) {
        // first and last page
        pages.push(page)
      } else if (page >= startPage && page <= endPage) {
        // pages around current one
        pages.push(page)
      } else if (pages[pages.length - 1] !== '...') {
        // dots between pages
        pages.push('...')
      }
      return pages
    }, [])
  }
}
