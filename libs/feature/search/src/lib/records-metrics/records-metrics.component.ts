import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core'
import { Observable } from 'rxjs'
import { map, share } from 'rxjs/operators'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface.js'
import {
  AggregationBuckets,
  Aggregations,
  TermBucket,
} from '@geonetwork-ui/common/domain/model/search/index.js'
import { RecordMetric } from '@geonetwork-ui/api/metadata-converter'
import { RecordMetricComponent } from '@geonetwork-ui/ui/search'
import { CommonModule } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-records-metrics',
  templateUrl: './records-metrics.component.html',
  styleUrls: ['./records-metrics.component.css'],
  standalone: true,
  imports: [CommonModule, RecordMetricComponent, TranslatePipe],
})
export class RecordsMetricsComponent implements OnInit {
  private recordsRepository = inject(RecordsRepositoryInterface)

  @Input() field: string
  @Input() count = 10
  @Input() queryString = '+isTemplate:n'
  @Output() metricSelect = new EventEmitter<RecordMetric>()
  results$: Observable<TermBucket[]>

  ngOnInit(): void {
    this.results$ = this.recordsRepository
      .aggregate({
        [this.field]: {
          type: 'terms',
          field: this.field,
          limit: this.count,
          sort: ['asc', 'key'],
          filter: this.queryString,
        },
      })
      .pipe(
        map(
          (response: Aggregations) =>
            (response[this.field] as AggregationBuckets).buckets as TermBucket[]
        ),
        share()
      )
  }
}
