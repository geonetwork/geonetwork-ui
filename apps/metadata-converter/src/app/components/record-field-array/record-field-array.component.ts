import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'

@Component({
  selector: 'gn-ui-record-field-array',
  templateUrl: './record-field-array.component.html',
  styleUrls: ['./record-field-array.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordFieldArrayComponent {
  @Input() label: string
  @Input() fieldValue: Array<unknown>
  @Input() itemTemplate: TemplateRef<{
    getValue: () => unknown
    setValue: (v: unknown, prop?: string) => void
  }>
  @Input() defaultItem: unknown
  @Output() fieldValueChange = new EventEmitter<Array<unknown>>()
  @Output() confirm = new EventEmitter<void>()

  addItem() {
    this.fieldValue = [...this.fieldValue, this.defaultItem]
    this.fieldValueChange.emit(this.fieldValue)
    this.confirm.emit()
  }
  removeItem(index: number) {
    this.fieldValue = this.fieldValue.filter((_, i) => i !== index)
    this.fieldValueChange.emit(this.fieldValue)
    this.confirm.emit()
  }
  valueGetterByIndex(index: number) {
    return () => this.fieldValue[index]
  }
  valueSetterByIndex(index: number) {
    return (v: unknown, prop?: string, prop2?: string) => {
      if (prop && prop2) {
        this.fieldValue[index] = {
          ...(this.fieldValue as unknown)[index],
          [prop]: {
            ...this.fieldValue[index][prop],
            [prop2]: v,
          },
        }
      } else if (prop) {
        this.fieldValue[index] = {
          ...(this.fieldValue as unknown)[index],
          [prop]: v,
        }
      } else this.fieldValue[index] = v
    }
  }

  trackBy(index: number) {
    return index
  }
}
