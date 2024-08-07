import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent.component'
import { of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import {
  AutocompleteComponent,
  DropdownSelectorComponent,
  SwitchToggleComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { Gn4Converter } from '@geonetwork-ui/api/metadata-converter'
import { KeywordType } from '@geonetwork-ui/common/domain/model/thesaurus'

const DUMMY_DATA_PLACE_KEYWORDS = [
  {
    key: 'uri1',
    label: 'Berlin',
    thesaurus: {
      id: '1',
      name: 'GEMET',
    },
    type: 'place' as KeywordType,
    coords: {
      coordEast: '13.27',
      coordNorth: '52.63',
      coordSouth: '52.50',
      coordWest: '13.14',
    },
  },
  {
    key: 'uri2',
    label: 'Hamburg',
    thesaurus: {
      id: '1',
      name: 'GEMET',
    },
    type: 'place' as KeywordType,
    coords: {
      coordEast: '10.5',
      coordNorth: '53.66',
      coordSouth: '53.53',
      coordWest: '10',
    },
  },
  {
    key: 'uri3',
    label: 'Munich',
    thesaurus: {
      id: '1',
      name: 'GEMET',
    },
    type: 'place' as KeywordType,
    coords: {
      coordEast: '11.64',
      coordNorth: '48.65',
      coordSouth: '48.51',
      coordWest: '11.50',
    },
  },
]

const DUMMY_DATA_SPATIAL_EXTENTS = [
  {
    description: 'uri1',
    bbox: [13.5, 52.5, 14.5, 53.5] as [number, number, number, number],
  },
  {
    description: 'uri2',
    bbox: [10, 53.5, 11, 53.4] as [number, number, number, number],
  },
  {
    description: 'uri3',
    bbox: [11.5, 48.5, 11.5, 48.3] as [number, number, number, number],
  },
  {
    description: 'URI-Paris',
    bbox: [1, 2, 3, 4] as [number, number, number, number],
  },
]
class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}
;(window as any).ResizeObserver = ResizeObserverMock
class Gn4MetadataMapperMock {
  readRecords = jest.fn((records) =>
    Promise.all(records.map((r) => this.readRecord(r)))
  )
  readRecord = jest.fn((record) => Promise.resolve(record))
}

class PlatformServiceInterfaceMock {
  getKeywordsByUri = jest.fn(() =>
    of([{ label: 'Africa', thesaurus: { id: '1' } }])
  )
  getMe = jest.fn(() => of({}))
}
describe('FormFieldSpatialExtentComponent', () => {
  let component: FormFieldSpatialExtentComponent
  let fixture: ComponentFixture<FormFieldSpatialExtentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormFieldSpatialExtentComponent,
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
        DropdownSelectorComponent,
        UiInputsModule,
        CommonModule,
        UiWidgetsModule,
        AutocompleteComponent,
        SwitchToggleComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceInterfaceMock,
        },
        {
          provide: Gn4Converter,
          useClass: Gn4MetadataMapperMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(FormFieldSpatialExtentComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldSpatialExtentComponent)
    component = fixture.componentInstance
    component.placeKeywords = []
    component.spatialExtents = []
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should link place keywords to spatial extents', () => {
    component.linkPlaceKeywordsToSpatialExtents(
      DUMMY_DATA_PLACE_KEYWORDS,
      DUMMY_DATA_SPATIAL_EXTENTS
    )

    expect(Object.keys(component.keywordsLinkedToExtents).length).toEqual(3)
  })

  it('should link spatial extents to place keywords', () => {
    component.placeKeywords = DUMMY_DATA_PLACE_KEYWORDS
    component.spatialExtents = DUMMY_DATA_SPATIAL_EXTENTS

    component.linkSpatialExtentsToPlaceKeywords(DUMMY_DATA_SPATIAL_EXTENTS)
    expect(Object.keys(component.keywordsLinkedToExtents).length).toEqual(4)
  })

  it('should emit place keywords and spatial extents', () => {
    component.placeKeywords = DUMMY_DATA_PLACE_KEYWORDS
    component.spatialExtents = DUMMY_DATA_SPATIAL_EXTENTS

    component.linkPlaceKeywordsToSpatialExtents(
      DUMMY_DATA_PLACE_KEYWORDS,
      DUMMY_DATA_SPATIAL_EXTENTS
    )
    component.linkSpatialExtentsToPlaceKeywords(DUMMY_DATA_SPATIAL_EXTENTS)

    component.keywordsWithExtentsObservable$.subscribe(() => {
      expect(component.updatedPlaceKeywords.length).toEqual(4)
      expect(component.updatedSpatialExtents.length).toEqual(4)
    })
  })

  it('should emit place keywords and spatial extents when place keywords are updated', () => {
    component.placeKeywords = DUMMY_DATA_PLACE_KEYWORDS
    component.spatialExtents = DUMMY_DATA_SPATIAL_EXTENTS

    component.linkPlaceKeywordsToSpatialExtents(
      DUMMY_DATA_PLACE_KEYWORDS,
      DUMMY_DATA_SPATIAL_EXTENTS
    )
    component.linkSpatialExtentsToPlaceKeywords(DUMMY_DATA_SPATIAL_EXTENTS)

    component.keywordsWithExtentsObservable$.subscribe(() => {
      const copyKeywords = [...DUMMY_DATA_PLACE_KEYWORDS]
      // remove last keyword
      copyKeywords.pop()
      component.handlePlaceKeywordsChange(copyKeywords)

      expect(component.updatedPlaceKeywords.length).toEqual(3)
      expect(component.updatedSpatialExtents.length).toEqual(3)
    })
  })

  it('should transform coords to geometry', () => {
    const geometry = component.transformCoordsToGeometry(
      '13.27',
      '52.50',
      '13.14',
      '52.63'
    )

    expect(geometry).toBeDefined()
  })
})
