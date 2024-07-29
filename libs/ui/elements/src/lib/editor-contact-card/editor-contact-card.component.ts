import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-editor-contact-card',
  templateUrl: './editor-contact-card.component.html',
  styleUrls: ['./editor-contact-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonComponent],
})
export class EditorContactCardComponent {
  @Input() contact: Individual
  @Input() organization: Organization
  @Output() contactRemoved = new EventEmitter<Individual>()

  removeContact(contact: Individual) {
    this.contactRemoved.emit(contact)
  }
}
