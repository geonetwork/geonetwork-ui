import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core'
import { NgClass } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'gn-ui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, FormsModule],
})
export class TextInputComponent {
  value = input<string, string>('', {
    transform: (v: string) => {
      this.inputModel.set(v)
      // make sure the native element value is up to date
      // TODO: use form() signal when migrated to angular 22 for cleaner implementation
      if (this.inputRef()) {
        this.inputRef().nativeElement.value = v
      }
      return v
    },
  })
  extraClass = input('')
  placeholder = input<string>()
  required = input(false)
  disabled = input<boolean>()
  type = input('text', {
    transform: (type: string) => {
      // make sure the native element type is up to date
      // TODO: use form() signal when migrated to angular 22 for cleaner implementation
      if (this.inputRef()) {
        this.inputRef().nativeElement.type = type
      }
      return type
    },
  })

  valueChange = output<string>()

  inputModel = signal('')
  inputRef = viewChild<ElementRef<HTMLInputElement>>('input')

  isValid = computed<boolean>(() => {
    const isValid = this.inputRef().nativeElement.checkValidity()
    const isEmpty = this.inputModel().trim() === ''
    const isRequired = this.required()
    return isValid && !(isEmpty && isRequired)
  })

  private lastEmittedValue: string | undefined = undefined

  handleChange($event: Event) {
    const input = $event.target as HTMLInputElement
    const value = input.value
    if (value === this.lastEmittedValue) return
    this.inputModel.set(value)
    this.lastEmittedValue = value
    this.valueChange.emit(value)
  }
}
