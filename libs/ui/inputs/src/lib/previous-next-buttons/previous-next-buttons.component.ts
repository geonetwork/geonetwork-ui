import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ButtonComponent } from '../button/button.component'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'gn-ui-previous-next-buttons',
  templateUrl: './previous-next-buttons.component.html',
  styleUrls: ['./previous-next-buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonComponent, MatIconModule],
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
