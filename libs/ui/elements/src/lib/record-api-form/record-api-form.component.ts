import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { BehaviorSubject, combineLatest, map } from 'rxjs'

const DEFAULT_PARAMS = {
  OFFSET: '',
  LIMIT: '',
  FORMAT: 'json',
}
@Component({
  selector: 'gn-ui-record-api-form',
  templateUrl: './record-api-form.component.html',
  styleUrls: ['./record-api-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordApiFormComponent {
  @Input() set apiLink(value: DatasetServiceDistribution) {
    this.apiBaseUrl = value ? value.url.href : undefined
    this.resetUrl()
  }
  offset$ = new BehaviorSubject('')
  limit$ = new BehaviorSubject('')
  format$ = new BehaviorSubject('')
  apiBaseUrl: string
  formatsList = [
    { label: 'JSON', value: 'json' },
    { label: 'CSV', value: 'csv' },
  ]
  apiQueryUrl$ = combineLatest([this.offset$, this.limit$, this.format$]).pipe(
    map(([offset, limit, format]) => {
      let outputUrl
      if (this.apiBaseUrl) {
        const url = new URL(this.apiBaseUrl)
        const params = { offset: offset, limit: limit, f: format }
        for (const [key, value] of Object.entries(params)) {
          if (value && value !== '0') {
            url.searchParams.set(key, value)
          } else {
            url.searchParams.delete(key)
          }
        }
        outputUrl = url.toString()
      }
      return outputUrl
    })
  )

  setOffset(value: string) {
    this.offset$.next(value)
  }

  setLimit(value: string) {
    this.limit$.next(value)
  }

  setFormat(value: string) {
    this.format$.next(value)
  }

  resetUrl() {
    this.offset$.next(DEFAULT_PARAMS.OFFSET)
    this.limit$.next(DEFAULT_PARAMS.LIMIT)
    this.format$.next(DEFAULT_PARAMS.FORMAT)
  }
}
