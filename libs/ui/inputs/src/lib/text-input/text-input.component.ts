import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { distinctUntilChanged } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'ui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit, AfterViewInit {
  @Input() value = ''
  @Input() hint: string
  @Input() required = false
  @Output() valueChange: Observable<string>

  @ViewChild('input') input

  rawChange = new Subject<string>()

  constructor() {}

  ngOnInit() {
    this.valueChange = this.rawChange.pipe(distinctUntilChanged())
  }

  ngAfterViewInit() {
    this.checkRequired(this.input.nativeElement.value)
  }

  checkRequired(value) {
    this.input.nativeElement.classList.toggle(
      'invalid',
      this.required && value === ''
    )
  }

  handleChange($event) {
    const value = $event.target.value
    this.checkRequired(value)
    this.rawChange.next(value)
  }
}
