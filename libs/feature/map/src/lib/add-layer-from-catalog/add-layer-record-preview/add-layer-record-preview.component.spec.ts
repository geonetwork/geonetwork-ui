import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerRecordPreviewComponent } from './add-layer-record-preview.component'
import { MapFacade } from '../../+state/map.facade'
import {
  LINK_FIXTURES,
  RECORDS_FULL_FIXTURE,
} from '@geonetwork-ui/util-shared/fixtures'
import { of } from 'rxjs'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { MapUtilsService } from '../../utils'

class MapFacadeMock {
  addLayer = jest.fn()
}

class MapUtilsServiceMock {
  getWmtsOptionsFromCapabilities = jest.fn(() => of())
}

describe('AddLayerRecordPreviewComponent', () => {
  let component: AddLayerRecordPreviewComponent
  let fixture: ComponentFixture<AddLayerRecordPreviewComponent>
  let mapFacade: MapFacade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLayerRecordPreviewComponent],
      providers: [
        {
          provide: MapFacade,
          useClass: MapFacadeMock,
        },
        {
          provide: MapUtilsService,
          useClass: MapUtilsServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    mapFacade = TestBed.inject(MapFacade)
    fixture = TestBed.createComponent(AddLayerRecordPreviewComponent)
    component = fixture.componentInstance
    component.record = RECORDS_FULL_FIXTURE[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('click on link', () => {
    beforeEach(() => {
      component.handleLinkClick(LINK_FIXTURES.geodataWms)
    })
    it('adds a layer', () => {
      expect(mapFacade.addLayer).toHaveBeenCalledWith({
        name: 'mylayer',
        title: 'Surval - Données par paramètre',
        type: 'wms',
        url: 'https://my.ogc.server/wms',
      })
    })
  })
})
