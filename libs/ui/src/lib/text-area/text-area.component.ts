import { Component, Input, OnInit, Output } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'ui-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
})
export class TextAreaComponent implements OnInit {
  @Input() value = ''
  @Input() placeholder: string
  @Output() valueChange: Observable<string>
  rawChange = new Subject<string>()

  constructor() {}

  ngOnInit(): void {
    this.valueChange = this.rawChange.pipe(distinctUntilChanged())
  }
}
