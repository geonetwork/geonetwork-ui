import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'ui-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.css'],
})
export class DropdownSelectorComponent implements OnInit {
  @Input() title: string
  @Input() ariaName: string
  @Input() choices: {
    value: any
    label: string
  }[]
  @Input() selected: any
  @Output() selectValue = new EventEmitter<any>()

  constructor() {}

  ngOnInit(): void {}
}
