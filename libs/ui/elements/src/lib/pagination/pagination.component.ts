import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'

@Component({
  selector: 'gn-ui-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 1
  @Input() nPages = 1
  @Output() newCurrentPageEvent = new EventEmitter<number>()

  private applyPageBounds() {
    // make sure this works with NaN inputs as well by adding `|| 1`
    this.nPages = Math.max(1, this.nPages || 1)
    this.currentPage = Math.max(1, Math.min(this.nPages, this.currentPage || 1))
  }

  ngOnChanges(changes: SimpleChanges) {
    // make sure the inputs are valid
    if ('currentPage' in changes || 'nPages' in changes) {
      this.applyPageBounds()
    }
  }

  nextPage() {
    this.currentPage++
    this.applyPageBounds()
    this.emitCurrentPage()
  }

  previousPage() {
    this.currentPage--
    this.applyPageBounds()
    this.emitCurrentPage()
  }

  emitCurrentPage() {
    this.newCurrentPageEvent.emit(this.currentPage)
  }
}
