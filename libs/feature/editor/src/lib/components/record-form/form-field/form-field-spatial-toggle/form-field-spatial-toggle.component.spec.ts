import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldSpatialToggleComponent } from './form-field-spatial-toggle.component'
import { MockProvider } from 'ng-mocks'
import { EditorFacade } from '../../../../+state/editor.facade'
import { BehaviorSubject } from 'rxjs'

class EditorFacadeMock {
  record$ = new BehaviorSubject([])
}
describe('FormFieldSpatialToggleComponent', () => {
  let component: FormFieldSpatialToggleComponent
  let fixture: ComponentFixture<FormFieldSpatialToggleComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormFieldSpatialToggleComponent],
      providers: [MockProvider(EditorFacade, EditorFacadeMock, 'useClass')],
    })
    fixture = TestBed.createComponent(FormFieldSpatialToggleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
