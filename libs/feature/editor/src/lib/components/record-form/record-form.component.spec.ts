import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditorFacade } from '../../+state/editor.facade'
import { RecordFormComponent } from './record-form.component'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { Gn4Converter } from '@geonetwork-ui/api/metadata-converter'
import { of } from 'rxjs'

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
  })
})
