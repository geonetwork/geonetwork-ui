import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import {
  catchError,
  finalize,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators'
import { BaseReader, FetchError } from '@geonetwork-ui/data-fetcher'
import { DataService } from '../service/data.service'
import { DataTableComponent } from '@geonetwork-ui/ui/dataviz'
import {
  DatasetFeatureCatalog,
  DatasetOnlineResource,
} from '@geonetwork-ui/common/domain/model/record'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import {
  LoadingMaskComponent,
  PopupAlertComponent,
} from '@geonetwork-ui/ui/widgets'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DataTableComponent,
    LoadingMaskComponent,
    PopupAlertComponent,
    TranslatePipe,
  ],
  standalone: true,
})
export class TableViewComponent {
  featureAttributes = []
  @Input() featureCatalog: DatasetFeatureCatalog
  @Input() cacheActive = true
  @Input() set link(value: DatasetOnlineResource) {
    this.currentLink$.next(value)
  }
  private currentLink$ = new BehaviorSubject<DatasetOnlineResource>(null)

  loading = false
  error = null

  tableData$ = this.currentLink$.pipe(
    switchMap((link) => {
      this.error = null
      if (!link) return of(undefined)
      if (link.accessRestricted) {
        this.handleError('dataset.error.restrictedAccess')
        return of([])
      }
      this.loading = true
      return this.getDatasetReader(link).pipe(
        tap((dataset: BaseReader) => this.setProperties(dataset)),
        catchError((error) => {
          this.handleError(error)
          return of(undefined)
        }),
        finalize(() => {
          this.loading = false
        })
      )
    }),
    startWith(undefined),
    shareReplay(1)
  )

  constructor(
    private dataService: DataService,
    private translateService: TranslateService
  ) {}

  getDatasetReader(link: DatasetOnlineResource): Observable<BaseReader> {
    return this.dataService.getDataset(link, this.cacheActive)
  }

  onTableSelect(event) {
    console.log(event)
  }

  handleError(error: FetchError | Error | string) {
    if (error instanceof FetchError) {
      this.error = this.translateService.instant(
        `dataset.error.${error.type}`,
        {
          info: error.info,
        }
      )
      console.warn(error.message)
    } else if (error instanceof Error) {
      this.error = this.translateService.instant(error.message)
      console.warn(error.stack || error)
    } else {
      this.error = this.translateService.instant(error)
      console.warn(error)
    }
    this.loading = false
  }

  setProperties(dataset: BaseReader) {
    dataset.properties.then((properties) => {
      const updatedProperties = properties.map((p) => {
        let label = p.name
        if (this.featureCatalog) {
          const attributes = this.featureCatalog.featureTypes[0].attributes
          const matchingAttribute = attributes.find(
            (attr) => attr.name === p.name
          )
          if (matchingAttribute && matchingAttribute.code) {
            label = matchingAttribute.code
          }
        }
        return { value: p.name, label }
      })
      this.featureAttributes = updatedProperties
    })
  }
}
