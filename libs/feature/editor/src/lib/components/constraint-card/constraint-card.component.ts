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
import { Constraint } from '@geonetwork-ui/common/domain/model/record'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirPlus } from '@ng-icons/iconoir'

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
    NgIconComponent,
  ],
  providers: [
    provideIcons({ iconoirPlus }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
  templateUrl: './constraint-card.component.html',
  styleUrls: ['./constraint-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstraintCardComponent {
  @Input() label: string
  @Input() constraint: Constraint
  @Output() constraintChange = new EventEmitter<Constraint>()

  hint = 'editor.record.form.constraint.markdown.placeholder' // TODO: get text and translate
  showUrlBtnClicked = false
  get showUrlInput() {
    return this.showUrlBtnClicked || !!this.constraint.url?.toString()
  }

  handleConstraintTextChange(text: string) {
    this.constraintChange.emit({
      ...this.constraint,
      text,
    })
  }

  handleURLChange(url: string | null) {
    this.constraintChange.emit({
      text: this.constraint.text,
      ...(url && { url: new URL(url) }),
    })
  }
}
