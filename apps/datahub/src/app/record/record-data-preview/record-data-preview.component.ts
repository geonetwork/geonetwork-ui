import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
} from '@angular/core'
import { MatTabsModule } from '@angular/material/tabs'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import {
  DataViewComponent,
  DataViewShareComponent,
  MapViewComponent,
  MdViewFacade,
} from '@geonetwork-ui/feature/record'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateDirective } from '@ngx-translate/core'
import {
  BehaviorSubject,
  combineLatest,
  map,
  of,
  startWith,
  Subscription,
  switchMap,
  take,
} from 'rxjs'

export const MAX_FEATURE_COUNT = new InjectionToken<string>('maxFeatureCount')

@Component({
  selector: 'datahub-record-data-preview',
  templateUrl: './record-data-preview.component.html',
  styleUrls: ['./record-data-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    TranslateDirective,
    DataViewShareComponent,
    DataViewComponent,
    MapViewComponent,
    ButtonComponent,
  ],
})
export class RecordDataPreviewComponent implements OnDestroy {
  @Input() recordUuid: string
  sub = new Subscription()
  savingStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle'
  displayMap$ = combineLatest([
    this.metadataViewFacade.mapApiLinks$,
    this.metadataViewFacade.geoDataLinksWithGeometry$,
  ]).pipe(
    map(([mapApiLinks, geoDataLinksWithGeometry]) => {
      return mapApiLinks?.length > 0 || geoDataLinksWithGeometry?.length > 0
    }),
    startWith(false)
  )

  displayData$ = combineLatest([
    this.metadataViewFacade.dataLinks$,
    this.metadataViewFacade.geoDataLinks$,
  ]).pipe(
    map(
      ([dataLinks, geoDataLinks]) =>
        dataLinks?.length > 0 || geoDataLinks?.length > 0
    )
  )

  selectedLink$ = new BehaviorSubject<DatasetOnlineResource>(null)

  exceedsMaxFeatureCount$ = combineLatest([
    this.metadataViewFacade.geoDataLinksWithGeometry$,
    this.selectedLink$,
  ]).pipe(
    map(([links, selectedLink]) =>
      selectedLink != null ? selectedLink : links[0]
    ),
    switchMap((link) => {
      return link && link.accessServiceProtocol === 'wfs'
        ? this.dataService
            .getWfsFeatureCount(link.url.toString(), link.name)
            .pipe(map((count) => count > this.maxFeatureCount))
        : of(false)
    })
  )

  selectedView$ = new BehaviorSubject('map')

  displayViewShare$ = combineLatest([
    this.displayMap$,
    this.displayData$,
    this.selectedView$,
    this.exceedsMaxFeatureCount$,
  ]).pipe(
    map(
      ([displayMap, displayData, selectedView, exceedsMaxFeatureCount]) =>
        (displayData || displayMap) &&
        !(selectedView === 'chart' && exceedsMaxFeatureCount)
    )
  )

  displayDatavizConfig$ = combineLatest([
    this.platformService.getMe(),
    this.metadataViewFacade.metadata$,
  ]).pipe(
    map(
      ([userInfo, metadata]) =>
        userInfo?.profile === 'Administrator' ||
        userInfo?.username ===
          (metadata?.extras?.ownerInfo as string).split('|')[0]
    )
  )

  constructor(
    public metadataViewFacade: MdViewFacade,
    private platformService: PlatformServiceInterface,
    private dataService: DataService,
    @Inject(MAX_FEATURE_COUNT)
    @Optional()
    protected maxFeatureCount: number,
    private platformServiceInterface: PlatformServiceInterface,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  saveDatavizConfig() {
    this.savingStatus = 'saving'
    this.sub.add(
      combineLatest([
        this.selectedView$,
        this.selectedLink$,
        this.metadataViewFacade.chartConfig$,
      ])
        .pipe(
          take(1),
          map(([selectedView, selectedLink, chartConfig]) => {
            return this.dataService.writeConfigAsJSON({
              view: selectedView,
              source: selectedLink,
              chartConfig: selectedView === 'chart' ? chartConfig : null,
            })
          }),
          switchMap((config) =>
            this.platformServiceInterface.attachFileToRecord(
              this.recordUuid,
              config,
              true
            )
          )
        )
        .subscribe({
          next: () => {
            this.savingStatus = 'saved'
            this.cdr.detectChanges()
            setTimeout(() => {
              this.savingStatus = 'idle'
              this.cdr.detectChanges()
            }, 2000)
          },
          error: () => {
            this.savingStatus = 'error'
            this.cdr.detectChanges()
            setTimeout(() => {
              this.savingStatus = 'idle'
              this.cdr.detectChanges()
            }, 3000)
          },
        })
    )
  }

  onTabIndexChange(index: number): void {
    let view
    switch (index) {
      case 0:
        view = 'map'
        break
      case 1:
        view = 'table'
        break
      default:
        view = 'chart'
    }
    this.selectedView$.next(view)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  onSelectedLinkChange(link: DatasetOnlineResource) {
    this.selectedLink$.next(link)
  }
}
