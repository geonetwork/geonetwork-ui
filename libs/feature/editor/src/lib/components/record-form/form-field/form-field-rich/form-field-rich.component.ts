import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MarkdownEditorComponent } from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { FormFieldWrapperComponent } from '@geonetwork-ui/ui/layout'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  matVisibilityOffOutline,
  matVisibilityOutline,
} from '@ng-icons/material-icons/outline'

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
    NgIconComponent,
  ],
  providers: [provideIcons({ matVisibilityOutline, matVisibilityOffOutline })],
})
export class FormFieldRichComponent {
  @Input() label: string
  @Input() hint: string
  @Input() placeholder = ''
  @Input() value: string

  @Output() valueChange: EventEmitter<string> = new EventEmitter()

  preview = false

  togglePreview() {
    this.preview = !this.preview
  }
}
