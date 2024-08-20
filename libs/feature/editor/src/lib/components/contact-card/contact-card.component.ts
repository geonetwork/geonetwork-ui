import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'

@Component({
  selector: 'gn-ui-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonComponent, ThumbnailComponent],
})
export class ContactCardComponent {
  @Input() contact: Individual
  @Input() removable = true
  @Output() contactRemoved = new EventEmitter<Individual>()

  removeContact(contact: Individual) {
    this.contactRemoved.emit(contact)
  }
}
