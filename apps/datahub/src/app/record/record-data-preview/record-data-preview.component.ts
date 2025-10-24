import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  InjectionToken,
  Input,
  OnInit,
  OnDestroy,
  Optional,
} from '@angular/core'
import { MatTabsModule } from '@angular/material/tabs'
import { DatavizConfigModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { DataService, StacViewComponent } from '@geonetwork-ui/feature/dataviz'
import {
  DataViewComponent,
  DataViewShareComponent,
  MapViewComponent,
  MdViewFacade,
} from '@geonetwork-ui/feature/record'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { getIsMobile } from '@geonetwork-ui/util/shared'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
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

marker('record.metadata.preview.config.idle')
marker('record.metadata.preview.config.saving')
marker('record.metadata.preview.config.saved')
marker('record.metadata.preview.config.error')

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
    StacViewComponent,
    ButtonComponent,
    TranslatePipe,
  ],
})
export class RecordDataPreviewComponent implements OnDestroy, OnInit {
  @Input()
  set recordUuid(value: string) {
    this.recordUuid$.next(value)
  }
  get recordUuid(): string {
    return this.recordUuid$.value
  }
  private recordUuid$ = new BehaviorSubject<string>(null)

  sub = new Subscription()
  hasConfig = false
  savingStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle'
  views = ['map', 'table', 'chart', 'stac']

  private readonly TAB_INDICES = {
    none: 0,
    map: 1,
    table: 2,
    chart: 3,
    stac: 4,
  } as const

  private readonly VIEW_PRIORITY = ['map', 'table', 'stac'] as const

  displayMap$ = combineLatest([
    this.metadataViewFacade.mapApiLinks$,
    this.metadataViewFacade.geoDataLinksWithGeometry$,
  ]).pipe(
    map(
      ([mapApiLinks, geoDataLinksWithGeometry]) =>
        mapApiLinks?.length > 0 || geoDataLinksWithGeometry?.length > 0
    ),
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

  displayStac$ = combineLatest([this.metadataViewFacade.stacLinks$]).pipe(
    map(([stacLinks]) => stacLinks?.length > 0)
  )

  isMobile$ = getIsMobile().pipe(map((isMobile) => !isMobile))

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

  datavizConfig = null

  selectedView$ = new BehaviorSubject(null)
  selectedIndex$ = new BehaviorSubject(0)
  selectedTMSStyle$ = new BehaviorSubject(0)

  config$ = this.recordUuid$.pipe(
    switchMap((uuid) => {
      if (!uuid) return of(null)

      return this.platformServiceInterface.getRecordAttachments(uuid).pipe(
        map((attachments) =>
          attachments.find((att) => att.fileName === 'datavizConfig.json')
        ),
        switchMap((configAttachment) =>
          (configAttachment
            ? this.platformServiceInterface.getFileContent(configAttachment.url)
            : of(null)
          ).pipe(map((config: DatavizConfigModel) => config))
        )
      )
    })
  )

  displayViewShare$ = combineLatest([
    this.displayMap$,
    this.displayData$,
    this.displayStac$,
    this.selectedView$,
    this.exceedsMaxFeatureCount$,
  ]).pipe(
    map(
      ([
        displayMap,
        displayData,
        displayStac,
        selectedView,
        exceedsMaxFeatureCount,
      ]) =>
        (displayData || displayMap || displayStac) &&
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
    this.sub.add(
      combineLatest([
        this.displayMap$,
        this.displayData$,
        this.displayStac$,
        this.config$,
        this.isMobile$,
      ])
        .pipe(
          take(1),
          map(([displayMap, displayData, displayStac, config, isMobile]) => {
            const availableViews = this.getAvailableViews(
              displayMap,
              displayData,
              displayStac
            )
            const selectedView = this.determineView(
              config,
              isMobile,
              availableViews
            )
            return { selectedView, config }
          })
        )
        .subscribe(({ selectedView, config }) => {
          this.applyViewConfiguration(selectedView, config)
        })
    )
  }

  private getAvailableViews(
    displayMap: boolean,
    displayData: boolean,
    displayStac: boolean
  ): Set<string> {
    const views = new Set<string>()
    if (displayMap) views.add('map')
    if (displayData) {
      views.add('table')
      views.add('chart')
    }
    if (displayStac) views.add('stac')
    return views
  }

  private determineView(
    config: DatavizConfigModel | null,
    isMobile: boolean,
    availableViews: Set<string>
  ): string | null {
    if (!config) {
      return this.getDefaultView(availableViews)
    }

    let desiredView = config.view

    // Mobile devices cannot display charts
    if (desiredView === 'chart' && isMobile) {
      desiredView = 'table'
    }

    // Check if desired view is available, otherwise fallback
    return availableViews.has(desiredView)
      ? desiredView
      : this.getDefaultView(availableViews)
  }

  private getDefaultView(availableViews: Set<string>): string | null {
    for (const view of this.VIEW_PRIORITY) {
      if (availableViews.has(view)) {
        return view
      }
    }
    return null
  }

  private applyViewConfiguration(
    view: string | null,
    config: DatavizConfigModel | null
  ): void {
    const tabIndex = view ? this.TAB_INDICES[view] : this.TAB_INDICES.none

    this.selectedView$.next(view)
    this.selectedIndex$.next(tabIndex)

    if (config) {
      this.selectedLink$.next(config.source)
      this.datavizConfig = { ...config, view }
    } else {
      this.datavizConfig = {
        link: this.selectedLink$.value,
        view: view,
      }
    }
  }

  ngOnDestroy(): void {
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
