import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core'
import { InteractiveTableColumnComponent } from './interactive-table-column/interactive-table-column.component'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirNavArrowDown, iconoirNavArrowUp } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-interactive-table',
  templateUrl: './interactive-table.component.html',
  styleUrls: ['./interactive-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, InteractiveTableColumnComponent, NgIconComponent],
  providers: [provideIcons({ iconoirNavArrowDown, iconoirNavArrowUp })],
})
export class InteractiveTableComponent {
  @ContentChildren(InteractiveTableColumnComponent)
  columns: QueryList<InteractiveTableColumnComponent>

  @Input() items: unknown[] = []
  @Output() itemClick = new EventEmitter<unknown>()

  get gridStyle() {
    return {
      'grid-template-columns': this.columns
        .map((column) =>
          column.width
            ? column.width
            : column.grow
              ? `minmax(0px,1fr)`
              : `minmax(0px,max-content)`
        )
        .join(' '),
    }
  }

  handleRowClick(item: unknown) {
    this.itemClick.emit(item)
  }
}
