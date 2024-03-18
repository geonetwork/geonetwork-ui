import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'

@Component({
  selector: 'gn-ui-record-field-object',
  templateUrl: './record-field-object.component.html',
  styleUrls: ['./record-field-object.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordFieldObjectComponent {
  @Input() label: string
  @Input() fieldValue: Record<string, unknown>
  @Input() itemTemplate: TemplateRef<{
    getValue: () => Record<string, unknown>
    setValue: (v: Record<string, unknown>, prop?: string) => void
  }>
  @Input() defaultItem: unknown
  @Input() optional: boolean
  @Output() fieldValueChange = new EventEmitter<Record<string, unknown>>()
  @Output() confirm = new EventEmitter<void>()

  createObject() {
    this.fieldValue = {}
    this.fieldValueChange.emit(this.fieldValue)
    this.confirm.emit()
  }
  deleteObject() {
    this.fieldValue = undefined
    this.fieldValueChange.emit(this.fieldValue)
    this.confirm.emit()
  }
  valueGetter() {
    return () => this.fieldValue
  }
  valueSetter() {
    return (v: Record<string, unknown>, prop?: string) => {
      if (prop) {
        this.fieldValue[prop] = v
      } else this.fieldValue = v
    }
  }
}
