import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'

@Component({
  selector: 'gn-ui-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ButtonComponent, ThumbnailComponent],
})
export class ContactCardComponent {
  @Input() contact: Individual
}
