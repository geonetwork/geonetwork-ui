import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { TextInputComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('editor.record.form.field.contactDetails.lastName')
marker('editor.record.form.field.contactDetails.firstName')
marker('editor.record.form.field.contactDetails.email')
marker('editor.record.form.field.contactDetails.organization')
marker('editor.record.form.field.contactDetails.lastName.placeholder')
marker('editor.record.form.field.contactDetails.firstName.placeholder')
marker('editor.record.form.field.contactDetails.email.placeholder')
marker('editor.record.form.field.contactDetails.organization.placeholder')

@Component({
  selector: 'gn-ui-contact-details-form',
  templateUrl: './contact-details-form.component.html',
  styleUrls: ['./contact-details-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TextInputComponent, TranslateDirective, TranslatePipe],
})
export class ContactDetailsFormComponent {
  @Input() contact: Individual
  @Output() contactChange = new EventEmitter<Individual>()

  private get currentContact(): Individual {
    return (
      this.contact ?? {
        email: '',
        role: 'unspecified',
        organization: { name: '' },
      }
    )
  }

  handleFirstNameChange(firstName: string) {
    this.contactChange.emit({
      ...this.currentContact,
      firstName,
    })
  }

  handleLastNameChange(lastName: string) {
    this.contactChange.emit({
      ...this.currentContact,
      lastName,
    })
  }

  handleEmailChange(email: string) {
    this.contactChange.emit({
      ...this.currentContact,
      organization: { ...this.currentContact.organization, email },
    })
  }

  handleOrganizationChange(name: string) {
    this.contactChange.emit({
      ...this.currentContact,
      organization: { ...this.currentContact.organization, name },
    })
  }
}
