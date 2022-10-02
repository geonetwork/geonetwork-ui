import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

type ValueModel = string | URL | Date | number

@Component({
  selector: 'gn-ui-record-field-simple',
  templateUrl: './record-field-simple.component.html',
  styleUrls: ['./record-field-simple.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordFieldSimpleComponent {
  @Input() label: string
  @Input() fieldValue: ValueModel
  @Output() fieldValueChange = new EventEmitter<ValueModel>()
  @Input() readonly = false
  @Input() type: 'text' | 'rich' | 'url' | 'date' = 'text'
  @Input() options?: string[]
  @Output() confirm = new EventEmitter<void>()

  get hasOptions() {
    return Array.isArray(this.options)
  }
  get isMissing() {
    return this.fieldValue === undefined && !this.hasOptions
  }
  get isSimpleText() {
    return !this.hasOptions && !this.isMissing && this.type === 'text'
  }
  get isRichText() {
    return !this.hasOptions && !this.isMissing && this.type === 'rich'
  }
  get isURL() {
    return !this.hasOptions && !this.isMissing && this.type === 'url'
  }
  get isDate() {
    return !this.hasOptions && !this.isMissing && this.type === 'date'
  }

  toDate(date: string) {
    return new Date(date)
  }

  toURL(url: string) {
    return new URL(url, window.location.toString())
  }

  addValue() {
    switch (this.type) {
      case 'url':
        this.fieldValue = new URL('', window.location.toString())
        break
      case 'date':
        this.fieldValue = new Date()
        break
      case 'rich':
      case 'text':
      default:
        this.fieldValue = ''
    }
    this.fieldValueChange.emit(this.fieldValue)
    this.confirm.emit()
  }
}
