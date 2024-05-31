import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

export enum ErrorType {
  COULD_NOT_REACH_API,
  RECEIVED_ERROR,
  RECORD_NOT_FOUND,
  DATASET_HAS_NO_LINK,
}

@Component({
  selector: 'gn-ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @Input() type!: ErrorType
  @Input() error?: string
  @Input() recordId?: string
  types = ErrorType
}
