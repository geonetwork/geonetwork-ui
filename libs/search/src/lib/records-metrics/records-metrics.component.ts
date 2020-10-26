import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { RecordMetric } from '@lib/common'
import { SearchApiService } from '@lib/gn-api'
import { Observable } from 'rxjs'
import { map, share } from 'rxjs/operators'
import { SearchResponse } from 'elasticsearch'

@Component({
  selector: 'search-records-metrics',
  templateUrl: './records-metrics.component.html',
  styleUrls: ['./records-metrics.component.css'],
})
export class RecordsMetricsComponent implements OnInit {
  @Input() field: string
  @Input() count = 10
  @Input() config: any
  @Input() queryString = '+isTemplate:n'
  @Output() metricSelect = new EventEmitter<RecordMetric>()
  results$: Observable<RecordMetric[]>

  constructor(private searchService: SearchApiService) {}

  ngOnInit(): void {
    if (!!this.field === false && !!this.config === false) {
      console.warn(
        'A field name (eg. tag) ' +
          'or a JSON aggregation config (eg. {"terms":{"field":"tag","size":2}}) MUST be defined.'
      )
      return
    }

    if (this.config) {
      try {
        this.config = JSON.parse(this.config)
      } catch (parseException) {
        console.warn(`JSON config ${this.config} is invalid.`, parseException)
        return
      }
    }

    const agg = this.config || {
      terms: {
        field: this.field,
        size: this.count,
      },
    }
    const search = {
      size: 0,
      track_total_hits: true,
      query: {
        bool: {
          filter: { query: { query_string: { query: this.queryString } } },
        },
      },
      aggs: {
        metric: agg,
      },
    }
    this.results$ = this.searchService
      .call('_search', 'bucket', JSON.stringify(search))
      .pipe(
        map<any, RecordMetric[]>(
          (response: SearchResponse<any>) =>
            response.aggregations.metric.buckets.map((category) => ({
              value: category.key,
              recordCount: category.doc_count,
            })) as RecordMetric[]
        ),
        share()
      )
  }
}
