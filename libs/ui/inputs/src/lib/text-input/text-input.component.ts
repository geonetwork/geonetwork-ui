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
  private readonly baseClass = [
    'appearance-none',
    'border border-gray-300',
    'rounded w-full',
    'p-2',
    'text-gray-700',
    'leading-tight',
    'focus:outline-none',
    'focus:border-primary',
  ].join(' ')

  @Input() value = ''
  @Input() extraClass = ''
  @Input() hint: string
  @Input() required = false
  @Input() disabled: boolean
  rawChange = new Subject<string>()
  @Output() valueChange = this.rawChange.pipe(distinctUntilChanged())
  @ViewChild('input') input

  get classList() {
    return `${this.baseClass} ${this.extraClass}`
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
