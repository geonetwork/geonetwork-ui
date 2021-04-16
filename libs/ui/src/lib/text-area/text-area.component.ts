import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'ui-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
})
export class TextAreaComponent implements OnInit, AfterViewInit {
  @Input() value = ''
  @Input() placeholder: string
  @Input() required = false
  @Output() valueChange: Observable<string>

  @ViewChild('input') input

  rawChange = new Subject<string>()

  constructor() {}

  ngOnInit(): void {
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
