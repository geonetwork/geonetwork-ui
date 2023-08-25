import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

export type DDChoices = Array<{
  label: string
  value: string
}>

@Component({
  selector: 'gn-ui-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownSelectorComponent {
  @Input() title: string
  @Input() showTitle = true
  @Input() ariaName: string
  @Input() choices: DDChoices
  @Input() selected: any
  @Input() extraClass = ''
  @Output() selectValue = new EventEmitter<any>()

  get id() {
    return this.title.toLowerCase().replace(/[^a-z]+/g, '-')
  }

  isSelected(choice) {
    return choice.value === this.selected
  }
}
