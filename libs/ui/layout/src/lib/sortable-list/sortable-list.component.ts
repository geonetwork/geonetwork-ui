import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  matCloseOutline,
  matDragHandleOutline,
} from '@ng-icons/material-icons/outline'

@Component({
  selector: 'gn-ui-sortable-list',
  templateUrl: 'sortable-list.component.html',
  styleUrls: ['sortable-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [provideIcons({ matDragHandleOutline, matCloseOutline })],
})
export class SortableListComponent {
  @Input() elementTemplate: TemplateRef<unknown>
  @Input() items: unknown[]
  @Output() itemsOrderChange = new EventEmitter<unknown[]>()

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex)
    this.itemsOrderChange.emit([...this.items])
  }

  removeItem(index: number) {
    this.items = this.items.filter((_, i) => i !== index)
    this.itemsOrderChange.emit(this.items)
  }

  trackByFn(index: number) {
    return index
  }
}
