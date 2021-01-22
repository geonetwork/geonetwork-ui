import { Component, Input, OnInit, Output } from '@angular/core'
import { distinctUntilChanged } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'ui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Input() value = ''
  @Input() hint: string
  @Output() valueChange: Observable<string>
  rawChange = new Subject<string>()

  constructor() {}

  ngOnInit() {
    this.valueChange = this.rawChange.pipe(distinctUntilChanged())
  }
}
