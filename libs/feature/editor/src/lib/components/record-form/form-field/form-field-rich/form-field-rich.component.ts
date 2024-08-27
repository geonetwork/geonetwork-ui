import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MarkdownEditorComponent } from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { FormFieldWrapperComponent } from '@geonetwork-ui/ui/layout'

@Component({
  selector: 'gn-ui-form-field-rich',
  templateUrl: './form-field-rich.component.html',
  styleUrls: ['./form-field-rich.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MarkdownEditorComponent,
    FormFieldWrapperComponent,
    ButtonComponent,
  ],
})
export class FormFieldRichComponent {
  @Input() label: string
  @Input() hint: string
  @Input() helperText: string
  @Input() placeholder = 'Votre texte ici' //TODO: translate
  @Input() value: string

  @Output() valueChange: EventEmitter<string> = new EventEmitter()

  preview = false

  getButtonExtraClass() {
    return `${
      this.preview ? 'text-gray-200 bg-gray-900' : 'text-gray-900 bg-gray-200'
    } rounded-[1.25rem] p-[0.375rem] text-xs font-medium w-24`
  }

  togglePreview() {
    this.preview = !this.preview
  }
}
