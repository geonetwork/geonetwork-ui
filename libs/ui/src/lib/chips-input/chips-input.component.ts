import { Component, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

export interface Items {
  display: string
  value: string
}

@Component({
  selector: 'ui-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.css'],
})
export class ChipsInputComponent implements OnInit {
  @Input() items: Items[]
  @Input() autocompleteItems: Items[]
  @Input() placeholder: string
  @Output() itemsChange: Observable<Items[]>
  rawChange: BehaviorSubject<Items[]>

  onChange(event) {
    this.rawChange.next(this.items)
  }

  constructor() {
    this.rawChange = new BehaviorSubject<Items[]>(this.items)
    this.itemsChange = this.rawChange.pipe(distinctUntilChanged())
  }

  ngOnInit(): void {}
}
