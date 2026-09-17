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
import { TranslatePipe } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { Observable, of } from 'rxjs'

@Component({
  selector: 'gn-ui-interactive-table',
  templateUrl: './interactive-table.component.html',
  styleUrls: ['./interactive-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIconComponent, TranslatePipe],
  providers: [provideIcons({ iconoirNavArrowDown, iconoirNavArrowUp })],
})
export class InteractiveTableComponent<T = unknown> {
  @ContentChildren(InteractiveTableColumnComponent)
  columns: QueryList<InteractiveTableColumnComponent>

  @Input() items: T[] = []
  @Input() canEditItem: (item: T) => Observable<boolean> = () => of(true)
  @Input() isDraftPage = false
  @Output() itemClick = new EventEmitter<T>()

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

  getItemTitle(item: T) {
    const record = item as CatalogRecord
    if (!this.isDraftPage) {
      if (record.extras?.isHarvested) {
        return marker('editor.record.lock.harvested')
      } else if (!record.extras?.edit) {
        return marker('editor.record.lock.owner')
      }
    }
    return ''
  }

  handleRowClick(item: T) {
    this.itemClick.emit(item)
  }

  getItemDisplayTitle(item: T): string {
    return (item as CatalogRecord).title
  }

  getItemKind(item: T): string {
    return (item as CatalogRecord).kind
  }
}
