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

  handleFirstNameChange(firstName: string) {
    this.contactChange.emit({ ...this.contact, firstName })
  }

  handleLastNameChange(lastName: string) {
    this.contactChange.emit({ ...this.contact, lastName })
  }

  handleEmailChange(email: string) {
    this.contactChange.emit({
      ...this.contact,
      organization: { ...this.contact.organization, email },
    })
  }

  handleOrganizationChange(name: string) {
    this.contactChange.emit({
      ...this.contact,
      organization: { ...this.contact.organization, name },
    })
  }
}
