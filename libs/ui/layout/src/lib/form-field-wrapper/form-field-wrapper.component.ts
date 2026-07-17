import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatTooltipModule } from '@angular/material/tooltip'
import { CommonModule } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matHelpOutline } from '@ng-icons/material-icons/outline'

@Component({
  selector: 'gn-ui-form-field-wrapper',
  templateUrl: './form-field-wrapper.component.html',
  styleUrls: ['./form-field-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatTooltipModule,
    CommonModule,
    TranslateDirective,
    NgIconComponent,
  ],
  providers: [provideIcons({ matHelpOutline })],
})
export class FormFieldWrapperComponent {
  @Input() label?: string
  @Input() hint?: string
}
