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

marker('editor.record.lock.resourceType')
marker('editor.record.lock.harvested')
marker('editor.record.lock.owner')
@Component({
  selector: 'gn-ui-interactive-table',
  templateUrl: './interactive-table.component.html',
  styleUrls: ['./interactive-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIconComponent, TranslatePipe],
  providers: [provideIcons({ iconoirNavArrowDown, iconoirNavArrowUp })],
})
export class InteractiveTableComponent {
  @ContentChildren(InteractiveTableColumnComponent)
  columns: QueryList<InteractiveTableColumnComponent>

  @Input() items: unknown[] = []
  @Input() canEditItem: (item: unknown) => Observable<boolean> = () => of(true)
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
    if (!this.isDraftPage) {
      if (item.kind !== 'dataset') {
        return 'editor.record.lock.resourceType'
      } else if (item.extras?.isHarvested) {
        return 'editor.record.lock.harvested'
      } else if (!item.extras?.edit) {
        return 'editor.record.lock.owner'
      }
    }
    return ''
  }

  handleRowClick(item: unknown) {
    this.itemClick.emit(item)
  }
}
