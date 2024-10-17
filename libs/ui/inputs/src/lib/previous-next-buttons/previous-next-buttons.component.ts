import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ButtonComponent } from '../button/button.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  matArrowBack,
  matArrowForward,
} from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-previous-next-buttons',
  templateUrl: './previous-next-buttons.component.html',
  styleUrls: ['./previous-next-buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonComponent, NgIconComponent],
  providers: [
    provideIcons({ matArrowForward, matArrowBack }),
    provideNgIconsConfig({
      size: '0.875em',
    }),
  ],
})
export class PreviousNextButtonsComponent {
  @Input() isFirst: boolean
  @Input() isLast: boolean

  @Output() directionButtonClicked: EventEmitter<string> = new EventEmitter()

  previousButtonClicked() {
    this.directionButtonClicked.next('previous')
  }

  nextButtonClicked() {
    this.directionButtonClicked.next('next')
  }
}
