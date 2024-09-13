import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerRecordPreviewComponent } from './add-layer-record-preview.component'
import { MapFacade } from '../../+state/map.facade'
import {
  aSetOfLinksFixture,
  datasetRecordsFixture,
  mapCtxFixture,
} from '@geonetwork-ui/common/fixtures'
import { of } from 'rxjs'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { MockBuilder, MockProvider } from 'ng-mocks'

describe('AddLayerRecordPreviewComponent', () => {
  let component: AddLayerRecordPreviewComponent
  let fixture: ComponentFixture<AddLayerRecordPreviewComponent>
  let mapFacade: MapFacade

  beforeEach(() => {
    return MockBuilder(AddLayerRecordPreviewComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(MapFacade, {
          context$: of(mapCtxFixture()),
          applyContext: jest.fn(),
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    mapFacade = TestBed.inject(MapFacade)
    fixture = TestBed.createComponent(AddLayerRecordPreviewComponent)
    component = fixture.componentInstance
    component.record = datasetRecordsFixture()[0] as CatalogRecord
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('click on link', () => {
    beforeEach(() => {
      component.handleLinkClick(aSetOfLinksFixture().geodataWms())
    })
    it('adds a layer', () => {
      expect(mapFacade.applyContext).toHaveBeenCalledWith({
        ...mapCtxFixture(),
        layers: [
          ...mapCtxFixture().layers,
          {
            name: 'mylayer',
            label:
              'A very interesting dataset (un jeu de données très intéressant)',
            type: 'wms',
            url: 'https://my.ogc.server/wms',
          },
        ],
      })
    })
  })
})
