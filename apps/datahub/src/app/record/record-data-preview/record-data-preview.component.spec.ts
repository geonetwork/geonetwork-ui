import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BehaviorSubject, of, throwError } from 'rxjs'
import {
  MAX_FEATURE_COUNT,
  RecordDataPreviewComponent,
} from './record-data-preview.component.js'
import {
  DataViewComponent,
  DataViewShareComponent,
  MapViewComponent,
  MdViewFacade,
} from '@geonetwork-ui/feature/record'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { MatTab, MatTabGroup } from '@angular/material/tabs'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { StacViewComponent } from '@geonetwork-ui/feature/record'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { SAMPLE_RECORD } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record/index.js'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record/index.js'

describe('RecordDataPreviewComponent', () => {
  let component: RecordDataPreviewComponent
  let fixture: ComponentFixture<RecordDataPreviewComponent>
  let facade
  let dataService
  let platformServiceInterface

  beforeEach(() => MockBuilder(RecordDataPreviewComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProvider(MdViewFacade, {
          metadata$: new BehaviorSubject<CatalogRecord>({
            ...SAMPLE_RECORD,
            extras: { ownerInfo: 'fakeuser|other' },
          }),
          mapApiLinks$: new BehaviorSubject([]),
          dataLinks$: new BehaviorSubject([]),
          geoDataLinks$: new BehaviorSubject([]),
          geoDataLinksWithGeometry$: new BehaviorSubject([]),
          stacLinks$: new BehaviorSubject([]),
          chartConfig$: new BehaviorSubject(null),
        }),
        MockProvider(DataService, {
          getWfsFeatureCount: jest.fn(),
          writeConfigAsJSON: jest.fn(),
        }),
        MockProvider(PlatformServiceInterface, {
          attachFileToRecord: jest.fn().mockReturnValue(
            of({
              type: 'success',
              attachment: {
                url: new URL('http://example.com/file.json'),
                fileName: 'datavizConfig.json',
              },
              sizeBytes: 123,
            })
          ),
          getMe: jest.fn(),
          getRecordAttachments: jest.fn().mockReturnValue(of([])),
          getFileContent: jest.fn(),
        }),
        {
          provide: MAX_FEATURE_COUNT,
          useValue: 100,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
    dataService = TestBed.inject(DataService)
    platformServiceInterface = TestBed.inject(PlatformServiceInterface)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDataPreviewComponent)
    component = fixture.componentInstance
    component.recordUuid = 'test-uuid-1234'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Preview', () => {
    describe('when no MAPAPI, GEODATA nor DATA link', () => {
      beforeEach(() => {
        fixture.detectChanges()
      })
      it('does not render preview content', () => {
        expect(fixture.debugElement.query(By.css('#preview'))).toBeFalsy()
      })
    })
  })
  describe('Map view', () => {
    let mapTab
    let tabGroup
    describe('when DATA link, but no MAPAPI and no GEODATA link', () => {
      beforeEach(fakeAsync(() => {
        facade.dataLinks$.next(['link'])

        tick()
        component.ngOnInit()
        fixture.detectChanges()

        mapTab = fixture.debugElement.queryAll(By.directive(MatTab))[1]
        tabGroup = fixture.debugElement.queryAll(By.directive(MatTabGroup))[0]
      }))
      it('renders preview, map tab is disabled', () => {
        expect(mapTab.componentInstance.disabled).toBe(true)
      })
      it('renders preview, table tab is selected', () => {
        expect(tabGroup.componentInstance.selectedIndex).toBe(2)
      })
      it('does not render map component', () => {
        expect(
          fixture.debugElement.query(By.directive(MapViewComponent))
        ).toBeFalsy()
      })
    })
    describe('when a MAPAPI link present', () => {
      beforeEach(fakeAsync(() => {
        facade.mapApiLinks$.next(['link'])

        tick()
        component.ngOnInit()
        fixture.detectChanges()

        mapTab = fixture.debugElement.queryAll(By.directive(MatTab))[1]
      }))
      it('renders preview, map tab is enabled', () => {
        expect(mapTab.componentInstance.disabled).toBe(false)
      })
      it('renders map component', () => {
        expect(
          fixture.debugElement.query(By.directive(MapViewComponent))
        ).toBeTruthy()
      })
    })
    describe('when a GEODATA link present', () => {
      beforeEach(fakeAsync(() => {
        facade.geoDataLinksWithGeometry$.next(['link'])
        facade.geoDataLinks$.next(['link'])

        tick()
        component.ngOnInit()
        fixture.detectChanges()

        mapTab = fixture.debugElement.queryAll(By.directive(MatTab))[1]
      }))
      it('renders preview, map tab is enabled', () => {
        expect(mapTab.componentInstance.disabled).toBe(false)
      })
      it('renders map component', () => {
        expect(
          fixture.debugElement.query(By.directive(MapViewComponent))
        ).toBeTruthy()
      })
    })
  })
  describe('Data view - table and chart', () => {
    let tableTab
    let chartTab
    let tabGroup
    describe('when MAPAPI link, but no DATA and no GEODATA link', () => {
      beforeEach(fakeAsync(() => {
        facade.mapApiLinks$.next(['link'])
        facade.dataLinks$.next([])
        facade.geoDataLinksWithGeometry$.next([])

        tick()
        component.ngOnInit()
        fixture.detectChanges()

        tableTab = fixture.debugElement.queryAll(By.directive(MatTab))[2]
        chartTab = fixture.debugElement.queryAll(By.directive(MatTab))[3]
        tabGroup = fixture.debugElement.queryAll(By.directive(MatTabGroup))[0]
      }))
      it('renders preview, table tab is disabled', () => {
        expect(tableTab.componentInstance.disabled).toBe(true)
      })
      it('renders preview, chart tab is disabled', () => {
        expect(chartTab.componentInstance.disabled).toBe(true)
      })
      it('renders preview, map tab is selected', () => {
        expect(tabGroup.componentInstance.selectedIndex).toBe(1)
      })
      it('does not render any data view component', () => {
        expect(
          fixture.debugElement.query(By.directive(DataViewComponent))
        ).toBeFalsy()
      })
      it('does render the permalink component', () => {
        expect(
          fixture.debugElement.query(By.directive(DataViewShareComponent))
        ).toBeTruthy()
      })
    })
    describe('when a DATA link present', () => {
      beforeEach(fakeAsync(() => {
        facade.dataLinks$.next(['link'])

        tick()
        component.ngOnInit()
        fixture.detectChanges()

        tableTab = fixture.debugElement.queryAll(By.directive(MatTab))[2]
        chartTab = fixture.debugElement.queryAll(By.directive(MatTab))[3]
      }))
      it('renders preview, table tab is enabled', () => {
        expect(tableTab.componentInstance.disabled).toBe(false)
      })
      it('renders preview, chart tab is enabled', () => {
        expect(chartTab.componentInstance.disabled).toBe(false)
      })
      it('renders the table component only (the first tab)', () => {
        expect(
          fixture.debugElement.queryAll(By.directive(DataViewComponent)).length
        ).toEqual(1)
      })
      it('does render the permalink component', () => {
        expect(
          fixture.debugElement.query(By.directive(DataViewShareComponent))
        ).toBeTruthy()
      })
      describe('when selectedView$ is chart', () => {
        beforeEach(fakeAsync(() => {
          component.selectedView$.next('chart')

          tick()
          component.ngOnInit()
          fixture.detectChanges()
        }))
        it('renders the permalink component', () => {
          expect(
            fixture.debugElement.query(By.directive(DataViewShareComponent))
          ).toBeTruthy()
        })
      })
    })
    describe('when a GEODATA link present', () => {
      beforeEach(fakeAsync(() => {
        facade.geoDataLinks$.next(['link'])

        tick()
        component.ngOnInit()
        fixture.detectChanges()

        tableTab = fixture.debugElement.queryAll(By.directive(MatTab))[2]
        chartTab = fixture.debugElement.queryAll(By.directive(MatTab))[3]
      }))
      it('renders preview, table tab is enabled', () => {
        expect(tableTab.componentInstance.disabled).toBe(false)
      })
      it('renders preview, chart tab is enabled', () => {
        expect(chartTab.componentInstance.disabled).toBe(false)
      })
      it('renders the table component only (the first tab)', () => {
        expect(
          fixture.debugElement.queryAll(By.directive(DataViewComponent)).length
        ).toEqual(1)
      })
    })
  })
  describe('STAC view', () => {
    let stacTab
    let tabGroup
    describe('when only a GEODATA link present', () => {
      beforeEach(fakeAsync(() => {
        facade.geoDataLinks$.next(['link'])
        facade.dataLinks$.next(null)
        facade.mapApiLinks$.next(null)
        facade.stacLinks$.next(null)

        tick()
        component.ngOnInit()
        fixture.detectChanges()

        stacTab = fixture.debugElement.queryAll(By.directive(MatTab))[4]
      }))
      it('renders STAC tab and is disabled', () => {
        expect(stacTab).toBeDefined()
        expect(stacTab.componentInstance.disabled).toBe(true)
      })
    })
    describe('when only a STAC link present', () => {
      beforeEach(fakeAsync(() => {
        facade.stacLinks$.next(['link'])

        tick()
        component.ngOnInit()
        fixture.detectChanges()

        stacTab = fixture.debugElement.queryAll(By.directive(MatTab))[4]
        tabGroup = fixture.debugElement.queryAll(By.directive(MatTabGroup))[0]
      }))
      it('renders STAC tab and is enabled', () => {
        expect(stacTab).toBeDefined()
        expect(stacTab.componentInstance.disabled).toBe(false)
      })
      it('stac tab is selected', () => {
        expect(tabGroup.componentInstance.selectedIndex).toBe(4)
      })
      it('renders the STAC view component', fakeAsync(() => {
        // Wait for all async operations to complete (including lazy-loaded content)
        fixture.whenStable().then(() => {
          fixture.detectChanges()

          expect(
            fixture.debugElement.query(By.directive(StacViewComponent))
          ).toBeTruthy()
        })
      }))
      it('does NOT render the permalink component', () => {
        expect(
          fixture.debugElement.query(By.directive(DataViewShareComponent))
        ).toBeFalsy()
      })
    })
  })
  describe('exceedsMaxFeatureCount$', () => {
    it('should return false when no WFS link is present', (done) => {
      facade.geoDataLinksWithGeometry$.next([])

      component.exceedsMaxFeatureCount$.subscribe((result) => {
        expect(result).toBe(false)
        done()
      })
    })

    it('should return false when WFS link feature count is less than maxFeatureCount', (done) => {
      const link = {
        accessServiceProtocol: 'wfs',
        url: 'http://example.com',
        name: 'test',
      }
      facade.geoDataLinksWithGeometry$.next([link])
      dataService.getWfsFeatureCount.mockReturnValue(of(50))
      component.exceedsMaxFeatureCount$.subscribe((result) => {
        expect(result).toBe(false)
        done()
      })
    })

    it('should return true when WFS link feature count exceeds maxFeatureCount', (done) => {
      const link = {
        accessServiceProtocol: 'wfs',
        url: 'http://example.com',
        name: 'test',
      }
      facade.geoDataLinksWithGeometry$.next([link])
      dataService.getWfsFeatureCount.mockReturnValue(of(150))
      component.exceedsMaxFeatureCount$.subscribe((result) => {
        expect(result).toBe(true)
        done()
      })
    })
    it('should return true when switching between non-exceeding and exceeding maxFeatureCount links', (done) => {
      const firstLink = {
        accessServiceProtocol: 'wfs',
        url: 'http://example.com',
        name: 'test',
      }
      const secondLink = {
        accessServiceProtocol: 'wfs',
        url: 'http://example.com',
        name: 'switch test',
      }
      facade.geoDataLinksWithGeometry$.next([firstLink])
      dataService.getWfsFeatureCount.mockReturnValue(of(50))

      facade.geoDataLinksWithGeometry$.next([secondLink])
      dataService.getWfsFeatureCount.mockReturnValue(of(150))
      component.exceedsMaxFeatureCount$.subscribe((result) => {
        expect(result).toBe(true)
        done()
      })
    })
    it('should return false when switching between exceeding and non-exceeding maxFeatureCount links', (done) => {
      const firstLink = {
        accessServiceProtocol: 'wfs',
        url: 'http://example.com',
        name: 'test',
      }
      const secondLink = {
        accessServiceProtocol: 'wfs',
        url: 'http://example.com',
        name: 'switch test',
      }
      facade.geoDataLinksWithGeometry$.next([firstLink])
      dataService.getWfsFeatureCount.mockReturnValue(of(150))

      facade.geoDataLinksWithGeometry$.next([secondLink])
      dataService.getWfsFeatureCount.mockReturnValue(of(50))
      component.exceedsMaxFeatureCount$.subscribe((result) => {
        expect(result).toBe(false)
        done()
      })
    })
    it('should return true when switching between non-WFS link to WFS link exceeding maxFeatureCount', (done) => {
      const firstLink = {
        accessServiceProtocol: 'wms',
        url: 'http://example.com',
        name: 'test',
      }
      const secondLink = {
        accessServiceProtocol: 'wfs',
        url: 'http://example.com',
        name: 'switch test',
      }
      facade.geoDataLinksWithGeometry$.next([firstLink])

      facade.geoDataLinksWithGeometry$.next([secondLink])
      dataService.getWfsFeatureCount.mockReturnValue(of(150))
      component.exceedsMaxFeatureCount$.subscribe((result) => {
        expect(result).toBe(true)
        done()
      })
    })
  })
  describe('displayDatavizConfig$', () => {
    it('should emit true if user is Administrator', (done) => {
      ;(platformServiceInterface.getMe as jest.Mock).mockReturnValue(
        of({ profile: 'Administrator', username: 'admin' })
      )
      // recreate component after setting platformService mock values
      fixture = TestBed.createComponent(RecordDataPreviewComponent)
      component = fixture.componentInstance
      facade.metadata$.next({
        ...SAMPLE_RECORD,
        extras: { ownerInfo: 'someone|other', isPublishedToAll: true },
      })
      fixture.detectChanges()
      component.displayDatavizConfig$.subscribe((result) => {
        expect(result).toBe(true)
        done()
      })
    })

    it('should emit true if user is the owner', (done) => {
      ;(platformServiceInterface.getMe as jest.Mock).mockReturnValue(
        of({ profile: 'User', username: 'owner' })
      )
      fixture = TestBed.createComponent(RecordDataPreviewComponent)
      component = fixture.componentInstance
      facade.metadata$.next({
        ...SAMPLE_RECORD,
        extras: { ownerInfo: 'owner|other', isPublishedToAll: true },
      })
      fixture.detectChanges()
      component.displayDatavizConfig$.subscribe((result) => {
        expect(result).toBe(true)
        done()
      })
    })

    it('should emit false if user is not admin nor owner', (done) => {
      ;(platformServiceInterface.getMe as jest.Mock).mockReturnValue(
        of({ profile: 'User', username: 'someoneelse' })
      )
      fixture = TestBed.createComponent(RecordDataPreviewComponent)
      component = fixture.componentInstance
      facade.metadata$.next({
        ...SAMPLE_RECORD,
        extras: { ownerInfo: 'owner|other', isPublishedToAll: true },
      })
      fixture.detectChanges()
      component.displayDatavizConfig$.subscribe((result) => {
        expect(result).toBe(false)
        done()
      })
    })
    it('should emit false if record is not published', (done) => {
      ;(platformServiceInterface.getMe as jest.Mock).mockReturnValue(
        of({ profile: 'Administrator', username: 'admin' })
      )
      fixture = TestBed.createComponent(RecordDataPreviewComponent)
      component = fixture.componentInstance
      facade.metadata$.next({
        ...SAMPLE_RECORD,
        extras: { ownerInfo: 'someone|other', isPublishedToAll: false },
      })
      fixture.detectChanges()
      component.displayDatavizConfig$.subscribe((result) => {
        expect(result).toBe(false)
        done()
      })
    })
  })
  describe('Config saving', () => {
    const chartConf = {
      xProperty: 'something',
      yProperty: 'something else',
      aggregation: 'sum',
      chartType: 'bar',
    }
    it('should save the current map view as config', () => {
      const firstLink = {
        url: new URL('http://example.com'),
        type: 'link',
        name: 'test',
      } as DatasetOnlineResource
      component.selectedView$.next('map')
      component.selectedLink$.next(firstLink)
      facade.chartConfig$.next(chartConf)
      component.selectedTMSStyle$.next(3)
      const mockFile = new File(['{}'], 'config.json', {
        type: 'application/json',
      })
      dataService.writeConfigAsJSON = jest.fn().mockReturnValue(mockFile)
      component.saveDatavizConfig()
      expect(dataService.writeConfigAsJSON).toHaveBeenCalledWith({
        view: 'map',
        source: firstLink,
        chartConfig: null,
        styleTMSIndex: 3,
      })
      expect(platformServiceInterface.attachFileToRecord).toHaveBeenCalledWith(
        component.recordUuid,
        mockFile,
        true
      )
    })
    it('should save the current chart view as config', () => {
      const secondLink = {
        url: new URL('http://example2.com'),
        type: 'link',
        name: 'second test',
      } as DatasetOnlineResource
      component.selectedView$.next('chart')
      component.selectedLink$.next(secondLink)
      facade.chartConfig$.next(chartConf)
      component.saveDatavizConfig()
      expect(dataService.writeConfigAsJSON).toHaveBeenCalledWith({
        view: 'chart',
        source: secondLink,
        chartConfig: chartConf,
        styleTMSIndex: null,
      })
    })
  })
  describe('Read and apply dataviz config', () => {
    it('should read and apply dataviz config from attachment', fakeAsync(() => {
      const configContent = {
        view: 'chart',
        source: {
          url: 'http://example.com/dataset',
          type: 'link',
          name: 'dataset link',
        },
        chartConfig: {
          xProperty: 'prop1',
          yProperty: 'prop2',
          aggregation: 'average',
          chartType: 'line',
        },
      }
      platformServiceInterface.getRecordAttachments = jest.fn().mockReturnValue(
        of([
          {
            fileName: 'datavizConfig.json',
            url: new URL('http://example.com/attachment/datavizConfig.json'),
          },
        ])
      )
      platformServiceInterface.getFileContent = jest
        .fn()
        .mockReturnValue(of(configContent))

      facade.mapApiLinks$.next(['link'])
      facade.dataLinks$.next(['link'])

      fixture = TestBed.createComponent(RecordDataPreviewComponent)
      component = fixture.componentInstance
      component.recordUuid = 'test-uuid-1234'

      tick()
      component.ngOnInit()
      tick()
      fixture.detectChanges()

      expect(component.datavizConfig.view).toBe('chart')
      expect(component.datavizConfig.source.url).toEqual(
        new URL('http://example.com/dataset')
      )
      expect(component.datavizConfig.chartConfig.xProperty).toBe('prop1')
      expect(component.datavizConfig.chartConfig.yProperty).toBe('prop2')
      expect(component.datavizConfig.chartConfig.aggregation).toBe('average')
      expect(component.datavizConfig.chartConfig.chartType).toBe('line')
    }))
    it('should fallback to default behavior if no config file', fakeAsync(() => {
      facade.mapApiLinks$.next(['link'])
      facade.dataLinks$.next(['link'])

      fixture = TestBed.createComponent(RecordDataPreviewComponent)
      component = fixture.componentInstance
      component.recordUuid = 'test-uuid-1234'

      tick()
      component.ngOnInit()
      tick()
      fixture.detectChanges()

      expect(component.datavizConfig.view).toBe('map')
    }))
    it('should fallback to default behavior if an error occurs while reading the attachments', fakeAsync(() => {
      platformServiceInterface.getRecordAttachments = jest
        .fn()
        .mockReturnValue(throwError(() => new Error('Attachment read error')))

      facade.mapApiLinks$.next(['link'])
      facade.dataLinks$.next(['link'])

      fixture = TestBed.createComponent(RecordDataPreviewComponent)
      component = fixture.componentInstance
      component.recordUuid = 'test-uuid-1234'

      tick()
      component.ngOnInit()
      tick()
      fixture.detectChanges()

      expect(component.datavizConfig.view).toBe('map')
    }))
    it('should fallback to default behavior if an error occurs while reading the config', fakeAsync(() => {
      platformServiceInterface.getRecordAttachments = jest.fn().mockReturnValue(
        of([
          {
            fileName: 'datavizConfig.json',
            url: new URL('http://example.com/attachment/datavizConfig.json'),
          },
        ])
      )
      platformServiceInterface.getFileContent = jest
        .fn()
        .mockReturnValue(throwError(() => new Error('File read error')))

      facade.mapApiLinks$.next(['link'])
      facade.dataLinks$.next(['link'])

      fixture = TestBed.createComponent(RecordDataPreviewComponent)
      component = fixture.componentInstance
      component.recordUuid = 'test-uuid-1234'

      tick()
      component.ngOnInit()
      tick()
      fixture.detectChanges()

      expect(component.datavizConfig.view).toBe('map')
    }))
    describe('displayMap is false but config view is map', () => {
      it('should ignore the conf view and display table view', fakeAsync(() => {
        const configContent = {
          view: 'map',
          source: {
            url: 'http://example.com/dataset',
            type: 'link',
            name: 'dataset link',
          },
        }
        platformServiceInterface.getRecordAttachments = jest
          .fn()
          .mockReturnValue(
            of([
              {
                fileName: 'datavizConfig.json',
                url: new URL(
                  'http://example.com/attachment/datavizConfig.json'
                ),
              },
            ])
          )
        platformServiceInterface.getFileContent = jest
          .fn()
          .mockReturnValue(of(configContent))

        facade.mapApiLinks$.next([])
        facade.dataLinks$.next(['link'])
        fixture.detectChanges()
        tick()

        component.ngOnInit()

        expect(component.selectedIndex$.value).toBe(2)
        expect(component.selectedView$.value).toBe('table')
      }))
    })
    describe('Map takes a while to load but config view is map', () => {
      it('should display table at first and switch to map after resolving', fakeAsync(() => {
        const configContent = {
          view: 'map',
          source: {
            url: new URL('http://abcd.com/'),
            name: 'layer2',
            type: 'service',
            accessServiceProtocol: 'wms',
          },
          chartConfig: null,
          styleTMSIndex: 0,
        }
        platformServiceInterface.getRecordAttachments = jest
          .fn()
          .mockReturnValue(
            of([
              {
                fileName: 'datavizConfig.json',
                url: new URL(
                  'http://example.com/attachment/datavizConfig.json'
                ),
              },
            ])
          )
        platformServiceInterface.getFileContent = jest
          .fn()
          .mockReturnValue(of(configContent))

        facade.dataLinks$.next(['link'])
        fixture.detectChanges()
        tick()

        expect(component.selectedIndex$.value).toBe(2)
        expect(component.selectedView$.value).toBe('table')

        component.ngOnInit()

        facade.mapApiLinks$.next(['link'])
        fixture.detectChanges()
        tick(3000)

        expect(component.selectedIndex$.value).toBe(1)
        expect(component.selectedView$.value).toBe('map')
      }))
    })
    describe('Map takes a while to load but config view is table', () => {
      it('should ignore the map resolving and display table', fakeAsync(() => {
        const configContent = {
          view: 'table',
          source: {
            url: new URL('http://abcd.com/'),
            name: 'layer2',
            type: 'service',
            accessServiceProtocol: 'wms',
          },
          chartConfig: null,
          styleTMSIndex: 0,
        }
        platformServiceInterface.getRecordAttachments = jest
          .fn()
          .mockReturnValue(
            of([
              {
                fileName: 'datavizConfig.json',
                url: new URL(
                  'http://example.com/attachment/datavizConfig.json'
                ),
              },
            ])
          )
        platformServiceInterface.getFileContent = jest
          .fn()
          .mockReturnValue(of(configContent))

        facade.dataLinks$.next(['link'])
        fixture.detectChanges()
        tick()

        expect(component.selectedIndex$.value).toBe(2)
        expect(component.selectedView$.value).toBe('table')

        component.ngOnInit()

        facade.mapApiLinks$.next(['link'])
        fixture.detectChanges()
        tick(3000)

        expect(component.selectedIndex$.value).toBe(2)
        expect(component.selectedView$.value).toBe('table')
      }))
    })
  })
})
