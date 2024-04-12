import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditorFacade } from '../../+state/editor.facade'
import { RecordFormComponent } from './record-form.component'

class EditorFacadeMock {
  updateRecordField = jest.fn()
}

describe('RecordFormComponent', () => {
  let component: RecordFormComponent
  let fixture: ComponentFixture<RecordFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordFormComponent],
      providers: [
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
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
      component.handleFieldValueChange(
        { config: { model: 'title' }, value: 'old title' },
        'new title'
      )
      expect(component.facade.updateRecordField).toHaveBeenCalledWith(
        'title',
        'new title'
      )
    })
  })
})
