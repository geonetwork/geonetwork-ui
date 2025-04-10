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
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { iconoirNavArrowDown, iconoirNavArrowUp } from '@ng-icons/iconoir'
import { TranslateModule } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

marker('editor.record.lock.reason')
marker('editor.record.lock.format')
@Component({
  selector: 'gn-ui-interactive-table',
  templateUrl: './interactive-table.component.html',
  styleUrls: ['./interactive-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIconComponent, TranslateModule],
  providers: [provideIcons({ iconoirNavArrowDown, iconoirNavArrowUp })],
})
export class InteractiveTableComponent {
  @ContentChildren(InteractiveTableColumnComponent)
  columns: QueryList<InteractiveTableColumnComponent>

  @Input() items: unknown[] = []
  @Input() isDraftPage = false
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

  getItemTitle(item: CatalogRecord) {
    if (!item.extras?.edit && !this.isDraftPage && item.kind === 'dataset') {
      return 'editor.record.lock.reason'
    } else if (item.kind !== 'dataset') {
      return 'editor.record.lock.format'
    }
    return ''
  }

  handleRowClick(item: unknown) {
    this.itemClick.emit(item)
  }
}
