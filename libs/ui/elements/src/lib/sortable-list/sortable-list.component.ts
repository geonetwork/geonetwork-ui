import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop'
import { NgComponentOutlet, NgFor } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  Type,
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'

export type DynamicElement = {
  component: Type<unknown>
  inputs: Record<string, unknown>
}

@Component({
  selector: 'gn-ui-sortable-list',
  templateUrl: 'sortable-list.component.html',
  styleUrls: ['sortable-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgFor,
    NgComponentOutlet,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    MatIconModule,
  ],
})
export class SortableListComponent {
  @Input() elements: Array<DynamicElement>
  @Output() elementsChange = new EventEmitter<Array<DynamicElement>>()

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.elements, event.previousIndex, event.currentIndex)
    this.elementsChange.emit(this.elements)
  }

  removeElement(index: number) {
    this.elements = this.elements.filter((_, i) => i !== index)
    this.elementsChange.emit(this.elements)
  }

  trackByFn(index: number) {
    return index
  }
}
