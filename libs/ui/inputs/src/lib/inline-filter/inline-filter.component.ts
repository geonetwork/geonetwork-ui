import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'
import { Choice } from './inline-filter.model'

@Component({
  selector: 'gn-ui-inline-filter',
  templateUrl: './inline-filter.component.html',
})
export class InlineFilterComponent {
  @Input() choices: Choice[]
  @Input() selected: unknown[] = []

  @Output() selectValues = new EventEmitter<unknown[]>()

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>

  isSelected(choice: Choice) {
    return (
      this.selected.indexOf(choice.value) > -1 ||
      (this.selected.length === 0 && choice.value === 'all')
    )
  }

  select(choice: Choice, selected: boolean) {
    if (choice.value === 'all' && selected) {
      this.selected = [choice.value]
    } else {
      this.selected = selected
        ? [...this.selected.filter((v) => v !== choice.value), choice.value]
        : this.selected.filter((v) => v !== choice.value)

      // If any value selected, unselect all
      this.selected = this.selected.filter((v) => v !== 'all')
    }

    this.selectValues.emit(this.selected)
  }
}
