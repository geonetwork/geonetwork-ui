import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditorFacade } from '../../+state/editor.facade'
import { RecordFormComponent } from './record-form.component'
import { MockBuilder, MockProvider } from 'ng-mocks'

class EditorFacadeMock {
  updateRecordField = jest.fn()
}

describe('RecordFormComponent', () => {
  let component: RecordFormComponent
  let fixture: ComponentFixture<RecordFormComponent>

  beforeEach(() => {
    return MockBuilder(RecordFormComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProvider(EditorFacade, EditorFacadeMock, 'useClass')],
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
