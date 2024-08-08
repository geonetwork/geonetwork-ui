import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditorFacade } from '../../+state/editor.facade'
import { RecordFormComponent } from './record-form.component'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { Gn4Converter } from '@geonetwork-ui/api/metadata-converter'
import { of } from 'rxjs'
import { EditorFieldWithValue } from '../../+state/editor.models'

class EditorFacadeMock {
  updateRecordField = jest.fn()
}

class Gn4MetadataMapperMock {
  readRecords = jest.fn((records) =>
    Promise.all(records.map((r) => this.readRecord(r)))
  )
  readRecord = jest.fn((record) => Promise.resolve(record))
}

class PlatformServiceInterfaceMock {
  getMe = jest.fn(() => of({}))
}

describe('RecordFormComponent', () => {
  let component: RecordFormComponent
  let fixture: ComponentFixture<RecordFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RecordFormComponent,
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
      ],
      providers: [
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceInterfaceMock,
        },
        {
          provide: Gn4Converter,
          useClass: Gn4MetadataMapperMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('handleFieldValueChange', () => {
    it('should call facade.updateRecordField', () => {
      component.handleFieldValueChange('title', 'new title')
      expect(component.facade.updateRecordField).toHaveBeenCalledWith(
        'title',
        'new title'
      )
    })

    it('should filter spatialExtents fields', () => {
      const fields = [
        { config: { model: 'spatialExtents' } },
        { config: { model: 'keywords', id: 'placeKeywords' } },
        { config: { model: 'licenses' } },
        { config: { model: 'resourceUpdated' } },
      ] as EditorFieldWithValue[]
      const result = component.filterSpatialExtentsFields(fields)

      expect(result).toEqual([
        { config: { model: 'licenses' } },
        { config: { model: 'resourceUpdated' } },
      ])
    })

    it('should extract spatialExtents fields', () => {
      const fields = [
        {
          value: [{ type: 'place', key: 'Africa' }],
          config: {
            model: 'spatialExtents',
          },
        },
        {
          value: [{ type: 'place', key: 'Africa' }],
          config: {
            model: 'keywords',
            id: 'placeKeywords',
          },
        },
        { config: { model: 'licenses' }, value: [{ xyz: '' }] },
      ] as EditorFieldWithValue[]
      const result = component.extractSpatialExtentsFields(fields)

      expect(result).toEqual({
        placeKeywordsField: [{ type: 'place', key: 'Africa' }],
        spatialExtentsField: [{ type: 'place', key: 'Africa' }],
      })
    })

    it('should return null if spatialExtentsField is not found', () => {
      const fields = [
        {
          value: [{ type: 'place', key: 'Africa' }],
          config: {
            model: 'keywords',
            id: 'placeKeywords',
          },
        },
        { config: { model: 'licenses' }, value: [{ xyz: '' }] },
      ] as EditorFieldWithValue[]
      const result = component.extractSpatialExtentsFields(fields)

      expect(result).toBeNull()
    })

    it('should return null if placeKeywordsField is not found', () => {
      const fields = [
        {
          value: [{ type: 'place', key: 'Africa' }],
          config: {
            model: 'spatialExtents',
          },
        },
        { config: { model: 'licenses' }, value: [{ xyz: '' }] },
      ] as EditorFieldWithValue[]
      const result = component.extractSpatialExtentsFields(fields)

      expect(result).toBeNull()
    })
  })
})
