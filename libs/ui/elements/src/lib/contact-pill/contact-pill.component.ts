import {
  ConnectedPosition,
  OverlayModule,
} from '@angular/cdk/overlay'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matClose } from '@ng-icons/material-icons/baseline'
import { matInfoOutline } from '@ng-icons/material-icons/outline'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { getIndividualDisplayName } from '@geonetwork-ui/util/shared'
import { ContactDetailsComponent } from '../contact-details/contact-details.component'

@Component({
  selector: 'gn-ui-contact-pill',
  templateUrl: './contact-pill.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIcon, ButtonComponent, OverlayModule, ContactDetailsComponent],
  viewProviders: [
    provideIcons({
      matClose,
      matInfoOutline,
    }),
  ],
})
export class ContactPillComponent {
  @Input() contact: Individual

  overlayOpen = false
  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -4,
    },
  ]

  get displayName(): string {
    return getIndividualDisplayName(this.contact)
  }

  toggleOverlay() {
    this.overlayOpen = !this.overlayOpen
  }

  closeOverlay() {
    this.overlayOpen = false
  }
}
