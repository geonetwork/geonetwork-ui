import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { distinctUntilChanged } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'ui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Input() value: string = ''
  @Input() hint: string
  @Output() change: Observable<string>
  rawChange = new Subject<string>()

  constructor() {}

  ngOnInit() {
    this.change = this.rawChange.pipe(distinctUntilChanged())
  }
}
