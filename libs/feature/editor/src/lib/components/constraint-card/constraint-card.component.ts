import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormFieldRichComponent } from '../record-form/form-field/form-field-rich/form-field-rich.component'
import { ButtonComponent, UrlInputComponent } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { Constraint } from '@geonetwork-ui/common/domain/model/record'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirPlus } from '@ng-icons/iconoir'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

@Component({
  selector: 'gn-ui-constraint-card',
  standalone: true,
  imports: [
    CommonModule,
    FormFieldRichComponent,
    UrlInputComponent,
    ButtonComponent,
    MatIconModule,
    TranslateDirective,
    TranslatePipe,
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
  constraint_: Constraint
  @Input() set constraint(v: Constraint) {
    this.constraint_ = v
    this.showUrl = this.showUrl || !!v.url
  }
  @Output() constraintChange = new EventEmitter<Constraint>()

  hint = marker('editor.record.form.constraint.markdown.placeholder')
  showUrl = false

  handleConstraintTextChange(text: string) {
    this.constraintChange.emit({
      ...this.constraint_,
      text,
    })
  }

  handleURLChange(url: string | null) {
    this.constraintChange.emit({
      text: this.constraint_.text,
      ...(url && { url: new URL(url) }),
    })
  }
}
