import { Component, Input, OnInit } from '@angular/core'
import { SearchApiService } from '@lib/gn-api'
import { Observable } from 'rxjs'
import { map, share } from 'rxjs/operators'
import { RecordMetric } from '@lib/search'
import { SearchResponse } from 'elasticsearch'

@Component({
  selector: 'search-records-metrics',
  templateUrl: './records-metrics.component.html',
  styleUrls: ['./records-metrics.component.css'],
})
export class RecordsMetricsComponent implements OnInit {
  @Input() field: string
  @Input() count = 10
  @Input() queryString = '+isTemplate:n'
  results$: Observable<RecordMetric[]>

  constructor(private searchService: SearchApiService) {}

  ngOnInit(): void {
    this.results$ = this.searchService
      .call(
        '_search',
        'bucket',
        JSON.stringify({
          size: 0,
          track_total_hits: true,
          query: { query_string: { query: this.queryString } },
          aggs: {
            results: {
              terms: {
                field: this.field,
                size: this.count,
              },
            },
          },
        })
      )
      .pipe(
        map<any, RecordMetric[]>(
          (response: SearchResponse<any>) =>
            response.aggregations.results.buckets.map((category) => ({
              key: category.key,
              recordCount: category.doc_count,
            })) as RecordMetric[]
        ),
        share()
      )
  }
}
