import { Component, Input } from '@angular/core'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  matArrowBackIos,
  matArrowForwardIos,
} from '@ng-icons/material-icons/baseline'
import { Paginable } from '../paginable.interface'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-previous-next-buttons',
  templateUrl: './previous-next-buttons.component.html',
  styleUrls: ['./previous-next-buttons.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, NgIconComponent, TranslateDirective],
  providers: [
    provideIcons({ matArrowBackIos, matArrowForwardIos }),
    provideNgIconsConfig({
      size: '0.875em',
    }),
  ],
})
export class PreviousNextButtonsComponent {
  @Input() listComponent: Paginable
  @Input() displayLabels = false
}
