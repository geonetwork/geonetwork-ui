import {
  AfterViewInit,
  Component,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { distinctUntilChanged } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'gn-ui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements AfterViewInit {
  @Input() value = ''
  @Input() hint: string
  @Input() required = false
  rawChange = new Subject<string>()
  @Output() valueChange = this.rawChange.pipe(distinctUntilChanged())

  @ViewChild('input') input

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
