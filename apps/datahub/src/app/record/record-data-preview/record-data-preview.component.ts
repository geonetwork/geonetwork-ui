import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core'
import { MatTabsModule } from '@angular/material/tabs'
import { DatavizConfigModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
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
import { getIsMobile } from '@geonetwork-ui/util/shared'
import { TranslateDirective } from '@ngx-translate/core'
import {
  BehaviorSubject,
  combineLatest,
  map,
  of,
  skip,
  startWith,
  Subscription,
  switchMap,
  take,
} from 'rxjs'

export const MAX_FEATURE_COUNT = new InjectionToken<string>('maxFeatureCount')
export const REUSE_FORM_URL = new InjectionToken<string>('reuseFormUrl')

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
export class RecordDataPreviewComponent implements OnDestroy, OnInit {
  @Input() recordUuid: string
  sub = new Subscription()
  hasConfig = false
  savingStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle'
  views = ['map', 'table', 'chart']
  displayMap$ = combineLatest([
    this.metadataViewFacade.mapApiLinks$,
    this.metadataViewFacade.geoDataLinksWithGeometry$,
  ]).pipe(
    map(([mapApiLinks, geoDataLinksWithGeometry]) => {
      const display =
        mapApiLinks?.length > 0 || geoDataLinksWithGeometry?.length > 0
      if (!this.datavizConfig) {
        this.selectedIndex$.next(display ? 1 : 2)
        this.selectedView$.next(display ? 'map' : 'table')
      }
      return display
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

  displayChart$ = getIsMobile().pipe(map((isMobile) => !isMobile))

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

  selectedView$ = new BehaviorSubject(null)
  datavizConfig = null

  selectedIndex$ = new BehaviorSubject(0)
  selectedTMSStyle$ = new BehaviorSubject(0)

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
    this.platformServiceInterface.getMe(),
    this.metadataViewFacade.metadata$,
  ]).pipe(
    map(([userInfo, metadata]) => {
      const isAdmin =
        userInfo?.profile === 'Administrator' ||
        userInfo?.username ===
          (metadata?.extras?.ownerInfo as string).split('|')[0]
      const isPublished = metadata?.extras?.isPublishedToAll
      return isAdmin && isPublished
    })
  )

  constructor(
    public metadataViewFacade: MdViewFacade,
    private dataService: DataService,
    @Inject(MAX_FEATURE_COUNT)
    @Optional()
    protected maxFeatureCount: number,
    @Inject(REUSE_FORM_URL)
    @Optional()
    public reuseFormUrl: string,
    private platformServiceInterface: PlatformServiceInterface,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.platformServiceInterface
      .getRecordAttachments(this.recordUuid)
      .pipe(
        map((attachments) =>
          attachments.find((att) => att.fileName === 'datavizConfig.json')
        ),
        switchMap((configAttachment) =>
          (configAttachment
            ? this.platformServiceInterface.getFileContent(configAttachment.url)
            : of(null)
          ).pipe(
            switchMap((config: DatavizConfigModel) =>
              this.displayMap$.pipe(
                skip(1),
                take(1),
                map((displayMap) => ({ config, displayMap }))
              )
            )
          )
        )
      )
      .subscribe(({ config, displayMap }) => {
        let view
        if (config) {
          view =
            window.innerWidth < 640
              ? config.view === 'chart'
                ? 'chart'
                : 'map'
              : config.view

          if (!displayMap && view === 'map') {
            view = 'table'
          }

          const tab = this.views.indexOf(view) + 1 || 3

          this.datavizConfig = {
            ...config,
            view,
          }
          this.selectedIndex$.next(tab)
          this.selectedView$.next(view)
          this.selectedLink$.next(config.source)
        } else {
          this.datavizConfig = {
            link: this.selectedLink$.value,
            view: this.selectedView$.value,
          }
        }
      })
  }

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
        this.selectedTMSStyle$,
      ])
        .pipe(
          take(1),
          map(([selectedView, selectedLink, chartConfig, selectedTMSStyle]) => {
            return this.dataService.writeConfigAsJSON({
              view: selectedView,
              source: selectedLink,
              chartConfig: selectedView === 'chart' ? chartConfig : null,
              styleTMSIndex: selectedView === 'map' ? selectedTMSStyle : null,
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
    const view = this.views[index - 1] ?? 'chart'
    this.selectedView$.next(view)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  onSelectedLinkChange(link: DatasetOnlineResource) {
    this.selectedLink$.next(link)
  }
  onSelectedTMSStyleChange(index: number) {
    this.selectedTMSStyle$.next(index)
  }
}
