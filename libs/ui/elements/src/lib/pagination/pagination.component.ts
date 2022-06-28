import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

@Component({
  selector: 'gn-ui-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() currentPage: number
  @Input() nPages: number
  @Output() newCurrentPageEvent = new EventEmitter<number>()

  nextPage() {
    if (this.currentPage < this.nPages) {
      this.currentPage++
      this.emitCurrentPage()
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.emitCurrentPage()
    }
  }

  emitCurrentPage() {
    this.newCurrentPageEvent.emit(this.currentPage)
  }
}
