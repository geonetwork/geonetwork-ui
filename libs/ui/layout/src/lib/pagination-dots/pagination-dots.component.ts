import { Component, Input } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { CommonModule } from '@angular/common'
import { iconoirNavArrowLeft, iconoirNavArrowRight } from '@ng-icons/iconoir'
import { Paginable } from '../paginable.interface'

@Component({
  selector: 'gn-ui-pagination-dots',
  templateUrl: './pagination-dots.component.html',
  styleUrls: ['./pagination-dots.component.css'],
  standalone: true,
  imports: [CommonModule],
  viewProviders: [
    provideIcons({
      iconoirNavArrowRight,
      iconoirNavArrowLeft,
    }),
  ],
})
export class PaginationDotsComponent {
  @Input() listComponent: Paginable
  @Input() containerClass = ''

  // 1-based
  get steps() {
    return Array.from(
      { length: this.listComponent.pagesCount },
      (_, i) => i + 1
    )
  }
}
