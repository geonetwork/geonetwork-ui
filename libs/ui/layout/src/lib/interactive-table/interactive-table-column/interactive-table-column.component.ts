import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-interactive-table-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactive-table-column.component.html',
  styleUrls: ['./interactive-table-column.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveTableColumnComponent {
  @ContentChild('header') header: TemplateRef<unknown>
  @ContentChild('cell') cell: TemplateRef<unknown>

  @Input() grow = false
  @Input() width: string
  @Input() sortable = false
  @Input() activeSort: 'asc' | 'desc' | null = null
  @Output() sortChange = new EventEmitter<'asc' | 'desc'>()

  handleSortChange() {
    this.activeSort = this.activeSort === 'asc' ? 'desc' : 'asc'
    this.sortChange.emit(this.activeSort)
  }
}
