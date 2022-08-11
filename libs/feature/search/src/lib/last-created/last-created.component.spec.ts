import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BehaviorSubject, Subject } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { LastCreatedComponent } from './last-created.component'

const resultsMock = new BehaviorSubject([
  {
    abstract:
      '<p>A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS</p>',
    contact: {
      name: null,
      organisation: 'Métropole Européenne de Lille',
      logoUrl:
        'http://localhost:4200/geonetwork/images/logos/88d1dad6-ef31-4af8-9adb-031daa0b0965.png',
    },
    hasDownloads: false,
    hasMaps: false,
    id: '15245017',
    metadataUrl:
      '/geonetwork/srv/api/../fre/catalog.search#/metadata/dig-geoserver-ocs2d-wms',
    title: 'DIG GeoServer OCS2D WMS',
    uuid: 'dig-geoserver-ocs2d-wms',
    createdDate: '21/07/2022',
  },
  {
    abstract:
      '<p>A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS</p>',
    contact: {
      name: null,
      organisation: 'Métropole Européenne de Lille',
      logoUrl:
        'http://localhost:4200/geonetwork/images/logos/88d1dad6-ef31-4af8-9adb-031daa0b0965.png',
    },
    hasDownloads: false,
    hasMaps: false,
    id: '15245017',
    metadataUrl:
      '/geonetwork/srv/api/../fre/catalog.search#/metadata/dig-geoserver-ocs2d-wms',
    title: 'DIG GeoServer OCS2D WMS',
    uuid: 'dig-geoserver-ocs2d-wms',
    createdDate: '22/07/2022',
  },
])

@Component({
  selector: 'gn-ui-last-created',
  template: '<div></div>',
})
class LastUpdateMockComponent {
  @Input() lastUpdate: any
}

class SearchFacadeMock {
  results$ = new Subject()
  setPagination = jest.fn()
  setSortBy = jest.fn()
  setConfigRequestFields = jest.fn()
}

describe('LastCreatedComponent', () => {
  let component: LastCreatedComponent
  let fixture: ComponentFixture<lastCreatedComponent>
  let searchFacade
  let de

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastCreatedComponent, LastUpdateMockComponent],
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
      ],
    })
      .overrideComponent(LastCreatedComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
    searchFacade = TestBed.inject(SearchFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LastCreatedComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('get results on init', () => {
    let lastCreatedComponents: LastUpdateMockComponent[]

    beforeEach(fakeAsync(() => {
      searchFacade.results$.next(resultsMock)
      tick(200)
      fixture.detectChanges()
      lastCreatedComponents = de.queryAll(By.directive(LastUpdateMockComponent))
    }))
    it('Should get results sorted by creation date', () => {
      expect(lastCreatedComponents[0]).toEqual([
        {
          abstract:
            '<p>A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS</p>',
          contact: {
            name: null,
            organisation: 'Métropole Européenne de Lille',
            logoUrl:
              'http://localhost:4200/geonetwork/images/logos/88d1dad6-ef31-4af8-9adb-031daa0b0965.png',
          },
          hasDownloads: false,
          hasMaps: false,
          id: '15245017',
          metadataUrl:
            '/geonetwork/srv/api/../fre/catalog.search#/metadata/dig-geoserver-ocs2d-wms',
          title: 'DIG GeoServer OCS2D WMS',
          uuid: 'dig-geoserver-ocs2d-wms',
          createdDate: '22/07/2022',
        },
      ])
    })
  })
})
