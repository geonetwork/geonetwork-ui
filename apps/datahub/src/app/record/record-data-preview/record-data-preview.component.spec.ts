import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BehaviorSubject, of } from 'rxjs'
import {
  MAX_FEATURE_COUNT,
  RecordDataPreviewComponent,
} from './record-data-preview.component'
import {
  DataViewComponent,
  DataViewShareComponent,
  MapViewComponent,
  MdViewFacade,
} from '@geonetwork-ui/feature/record'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { MatTab, MatTabGroup } from '@angular/material/tabs'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { SAMPLE_RECORD } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'

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
      beforeEach(() => {
        facade.dataLinks$.next(['link'])
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.directive(MatTab))[0]
        tabGroup = fixture.debugElement.queryAll(By.directive(MatTabGroup))[0]
      })
      it('renders preview, map tab is disabled', () => {
        expect(mapTab.componentInstance.disabled).toBe(true)
      })
      it('renders preview, table tab is selected', () => {
        expect(tabGroup.componentInstance.selectedIndex).toBe(1)
      })
      it('does not render map component', () => {
        expect(
          fixture.debugElement.query(By.directive(MapViewComponent))
        ).toBeFalsy()
      })
    })
    describe('when a MAPAPI link present', () => {
      beforeEach(() => {
        facade.mapApiLinks$.next(['link'])
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.directive(MatTab))[0]
      })
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
      beforeEach(() => {
        facade.geoDataLinksWithGeometry$.next(['link'])
        facade.geoDataLinks$.next(['link'])
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.directive(MatTab))[0]
      })
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
      beforeEach(() => {
        facade.mapApiLinks$.next(['link'])
        facade.dataLinks$.next(null)
        facade.geoDataLinksWithGeometry$.next(null)
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.directive(MatTab))[1]
        chartTab = fixture.debugElement.queryAll(By.directive(MatTab))[2]
        tabGroup = fixture.debugElement.queryAll(By.directive(MatTabGroup))[0]
      })
      it('renders preview, table tab is disabled', () => {
        expect(tableTab.componentInstance.disabled).toBe(true)
      })
      it('renders preview, chart tab is disabled', () => {
        expect(chartTab.componentInstance.disabled).toBe(true)
      })
      it('renders preview, map tab is selected', () => {
        expect(tabGroup.componentInstance.selectedIndex).toBe(0)
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
      beforeEach(() => {
        facade.dataLinks$.next(['link'])
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.directive(MatTab))[1]
        chartTab = fixture.debugElement.queryAll(By.directive(MatTab))[2]
      })
      it('renders preview, table tab is enabled', () => {
        expect(tableTab.componentInstance.disabled).toBe(false)
      })
      it('renders preview, chart tab is enabled', () => {
        expect(chartTab.componentInstance.disabled).toBe(false)
      })
      it('renders two data view components (for table and chart tabs)', () => {
        expect(
          fixture.debugElement.queryAll(By.directive(DataViewComponent)).length
        ).toEqual(2)
      })
      it('does render the permalink component', () => {
        expect(
          fixture.debugElement.query(By.directive(DataViewShareComponent))
        ).toBeTruthy()
      })
      describe('when selectedView$ is chart', () => {
        beforeEach(() => {
          component.selectedView$.next('chart')
          fixture.detectChanges()
        })
        it('renders the permalink component', () => {
          expect(
            fixture.debugElement.query(By.directive(DataViewShareComponent))
          ).toBeTruthy()
        })
      })
    })
    describe('when a GEODATA link present', () => {
      beforeEach(() => {
        facade.geoDataLinks$.next(['link'])
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.directive(MatTab))[1]
        chartTab = fixture.debugElement.queryAll(By.directive(MatTab))[2]
      })
      it('renders preview, table tab is enabled', () => {
        expect(tableTab.componentInstance.disabled).toBe(false)
      })
      it('renders preview, chart tab is enabled', () => {
        expect(chartTab.componentInstance.disabled).toBe(false)
      })
      it('renders two data view components (for table and chart tabs)', () => {
        expect(
          fixture.debugElement.queryAll(By.directive(DataViewComponent)).length
        ).toEqual(2)
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
        extras: { ownerInfo: 'someone|other' },
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
        extras: { ownerInfo: 'owner|other' },
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
        extras: { ownerInfo: 'owner|other' },
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
      const mockFile = new File(['{}'], 'config.json', {
        type: 'application/json',
      })
      dataService.writeConfigAsJSON = jest.fn().mockReturnValue(mockFile)
      component.saveDatavizConfig()
      expect(dataService.writeConfigAsJSON).toHaveBeenCalledWith({
        view: 'map',
        source: firstLink,
        chartConfig: null,
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
      })
    })
  })
})
