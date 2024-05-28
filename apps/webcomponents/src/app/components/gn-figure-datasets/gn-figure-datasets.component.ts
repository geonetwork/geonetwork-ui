import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  ViewEncapsulation,
} from '@angular/core'
import { BaseComponent } from '../base.component'
import { RecordsService } from '@geonetwork-ui/feature/catalog'
import { startWith } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { SearchFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'wc-gn-figure-datasets',
  templateUrl: './gn-figure-datasets.component.html',
  styleUrls: ['./gn-figure-datasets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade],
})
export class GnFigureDatasetsComponent extends BaseComponent {
  catalogRecords: RecordsService
  recordsCount$: Observable<string | number>

  constructor(injector: Injector, private changeDetector: ChangeDetectorRef) {
    super(injector)
    this.catalogRecords = injector.get(RecordsService)
    this.recordsCount$ = this.catalogRecords.recordsCount$.pipe(startWith('-'))
  }

  init(): void {
    super.init()
  }

  changes(): void {
    super.changes()
  }
}
