import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

@Component({
  selector: 'gn-ui-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownSelectorComponent implements AfterViewInit {
  @Input() title: string
  @Input() showTitle = true
  @Input() ariaName: string
  @Input() choices: {
    value: any
    label: string
  }[]
  @Input() selected: any
  @Output() selectValue = new EventEmitter<any>()

  get id() {
    return this.title.toLowerCase().replace(/[^a-z]+/g, '-')
  }

  isSelected(choice) {
    return choice.value === this.selected
  }

  ngAfterViewInit() {
    setTimeout(() => this.selectValue.emit(this.choices[0].value))
  }
}
