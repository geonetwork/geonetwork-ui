import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { RecordMetric } from '@geonetwork-ui/util/shared'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { Observable } from 'rxjs'
import { map, share } from 'rxjs/operators'
import { SearchResponse } from 'elasticsearch'

@Component({
  selector: 'gn-ui-records-metrics',
  templateUrl: './records-metrics.component.html',
  styleUrls: ['./records-metrics.component.css'],
})
export class RecordsMetricsComponent implements OnInit {
  @Input() field: string
  @Input() count = 10
  @Input() queryString = '+isTemplate:n'
  @Output() metricSelect = new EventEmitter<RecordMetric>()
  results$: Observable<RecordMetric[]>

  constructor(private searchService: SearchApiService) {}

  ngOnInit(): void {
    this.results$ = this.searchService
      .search(
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
              value: category.key,
              recordCount: category.doc_count,
            })) as RecordMetric[]
        ),
        share()
      )
  }
}
