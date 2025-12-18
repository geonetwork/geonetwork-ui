import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditorFacade } from '../../+state/editor.facade.js'
import { RecordFormComponent } from './record-form.component.js'
import { MockBuilder, MockProvider } from 'ng-mocks'

describe('RecordFormComponent', () => {
  let component: RecordFormComponent
  let fixture: ComponentFixture<RecordFormComponent>

  beforeEach(() => {
    return MockBuilder(RecordFormComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordFormComponent],
      providers: [MockProvider(EditorFacade)],
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
