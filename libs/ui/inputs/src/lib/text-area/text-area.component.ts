import {
  AfterViewInit,
  Component,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { Subject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  standalone: true,
})
export class TextAreaComponent implements AfterViewInit {
  private readonly baseClasses: string
  private readonly disabledClasses: string

  @Input() value = ''
  @Input() disabled = false
  @Input() extraClass = ''
  @Input() placeholder: string
  @Input() required = false

  rawChange = new Subject<string>()
  @Output() valueChange = this.rawChange.pipe(distinctUntilChanged())

  @ViewChild('input') input

  constructor() {
    this.baseClasses = [
      'w-full',
      'pt-2',
      'pl-2',
      'resize-none',
      'border',
      'border-gray-800',
      'rounded italic',
      'leading-tight',
      'focus:outline-none',
      'focus:bg-background',
      'focus:border-primary',
    ].join(' ')

    this.disabledClasses = ['cursor-not-allowed'].join(' ')
  }

  get classList() {
    return `${this.baseClasses} ${this.extraClass} ${
      this.disabled ? this.disabledClasses : ''
    }`
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
