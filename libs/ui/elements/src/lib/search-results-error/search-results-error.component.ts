import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

export enum ErrorType {
  COULD_NOT_REACH_API,
  RECEIVED_ERROR,
  RECORD_NOT_FOUND,
}

@Component({
  selector: 'gn-ui-search-results-error',
  templateUrl: './search-results-error.component.html',
  styleUrls: ['./search-results-error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsErrorComponent {
  @Input() type!: ErrorType
  @Input() error?: string
  @Input() recordId?: string
  types = ErrorType
}
