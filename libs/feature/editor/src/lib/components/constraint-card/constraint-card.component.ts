import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { MarkdownEditorComponent } from '@geonetwork-ui/ui/elements'
import { FormFieldRichComponent } from '../record-form/form-field/form-field-rich/form-field-rich.component'
import { ButtonComponent, UrlInputComponent } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-constraint-card',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownEditorComponent,
    FormFieldRichComponent,
    UrlInputComponent,
    ButtonComponent,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './constraint-card.component.html',
  styleUrls: ['./constraint-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstraintCardComponent {
  @Input() label: string
  @Input() constraintText: string
  @Input() constraintURL: string
  hint = 'editor.record.form.constraint.markdown.placeholder' // TODO: get text and translate

  showUrlInput = false
  @Output() urlChange = new EventEmitter<URL>()
  @Output() constraintTextChange = new EventEmitter<string>()

  handleConstraintTextChange(text: string) {
    this.constraintTextChange.emit(text)
  }

  handleURLChange(url: string) {
    this.urlChange.emit(new URL(url))
  }

  displayUrlInput() {
    this.showUrlInput = true
  }
}
