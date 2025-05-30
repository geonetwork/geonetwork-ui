import { Component, Input } from '@angular/core'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { FormsModule } from '@angular/forms'
import {
  matChevronLeft,
  matChevronRight,
} from '@ng-icons/material-icons/baseline'
import { CommonModule } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core'
import { Paginable } from '../paginable.interface'

@Component({
  selector: 'gn-ui-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    NgIcon,
    FormsModule,
    TranslateDirective,
  ],
  viewProviders: [
    provideIcons({
      matChevronLeft,
      matChevronRight,
    }),
  ],
})
export class PaginationComponent {
  @Input() listComponent: Paginable
  @Input() hideButton = false

  private applyPageBounds(page: number): number {
    // make sure this works with NaN inputs as well by adding `|| 1`
    return Math.max(1, Math.min(this.listComponent.pagesCount, page || 1))
  }

  setPage(newPage) {
    if (!Number.isInteger(newPage)) return
    this.listComponent.goToPage(this.applyPageBounds(newPage))
  }
}
