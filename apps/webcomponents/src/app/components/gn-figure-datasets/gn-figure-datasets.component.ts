import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  ViewEncapsulation,
} from '@angular/core'
import { BaseComponent, DefaultProviders } from '../base.component'
import { RecordsService } from '@geonetwork-ui/feature/catalog'
import { catchError, startWith } from 'rxjs/operators'
import { Observable, of } from 'rxjs'

@Component({
  selector: 'wc-gn-figure-datasets',
  templateUrl: './gn-figure-datasets.component.html',
  styleUrls: ['./gn-figure-datasets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [DefaultProviders],
  standalone: false,
})
export class GnFigureDatasetsComponent extends BaseComponent {
  catalogRecords: RecordsService
  recordsCount$: Observable<string | number>

  constructor() {
    const injector = inject(Injector)

    super()
    this.catalogRecords = injector.get(RecordsService)
    this.recordsCount$ = this.catalogRecords.recordsCount$.pipe(
      startWith('-'),
      catchError(() => of('-'))
    )
  }

  init(): void {
    super.init()
  }

  changes(): void {
    super.changes()
  }
}
