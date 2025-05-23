import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { CommonModule } from '@angular/common'
import {
  matFace,
  matMoodBad,
  matQuestionMark,
} from '@ng-icons/material-icons/baseline'
import { matComputerOutline } from '@ng-icons/material-icons/outline'
import { TranslateDirective } from '@ngx-translate/core'

export enum ErrorType {
  COULD_NOT_REACH_API,
  RECEIVED_ERROR,
  RECORD_NOT_FOUND,
  DATASET_HAS_NO_LINK,
  ORGANIZATION_HAS_NO_DATASET,
  ORGANIZATION_NOT_FOUND,
}

@Component({
  selector: 'gn-ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIcon, TranslateDirective],
  viewProviders: [
    provideIcons({
      matFace,
      matQuestionMark,
      matMoodBad,
      matComputerOutline,
    }),
  ],
})
export class ErrorComponent {
  @Input() type!: ErrorType
  @Input() error?: string
  @Input() recordId?: string
  types = ErrorType
}
