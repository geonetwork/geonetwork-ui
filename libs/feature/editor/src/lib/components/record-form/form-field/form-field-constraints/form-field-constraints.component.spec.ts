import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldConstraintsComponent } from './form-field-constraints.component'
import { MockBuilder, MockInstance, MockProvider } from 'ng-mocks'
import { EditorFacade } from '../../../../+state/editor.facade'
import { BehaviorSubject, of } from 'rxjs'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'

const mockConstraints = new BehaviorSubject([
  {
    legalConstraints: [...datasetRecordsFixture()[0].legalConstraints],
    securityConstraints: [],
    otherConstraints: [],
  },
])

describe('FormFieldConstraintsComponent', () => {
  MockInstance.scope()
  let component: FormFieldConstraintsComponent
  let fixture: ComponentFixture<FormFieldConstraintsComponent>
  const constraintType = 'legalConstraints'

  beforeEach(() => {
    return MockBuilder(FormFieldConstraintsComponent)
  })

  beforeEach(() =>
    MockInstance(EditorFacade, 'record$', jest.fn(), 'get').mockReturnValue(
      of(mockConstraints)
    )
  )

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormFieldConstraintsComponent],
      providers: [MockProvider(EditorFacade)],
    })
    fixture = TestBed.createComponent(FormFieldConstraintsComponent)
    component = fixture.componentInstance
    component.label = 'Constraints'
    component.value = datasetRecordsFixture()[0].legalConstraints
    component.constraintType = constraintType
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should use the correct translation keys', () => {
    expect(component.additionalConstraintsButtonLabel).toEqual(
      `editor.record.form.constraint.add.${constraintType}`
    )
    expect(component.constraintsHeader).toEqual(
      `editor.record.form.constraint.header.${constraintType}`
    )
  })

  it('#handleURLChange should emit the new value', () => {
    jest.spyOn(component.valueChange, 'emit')
    const newURL = new URL('http://example.com')
    component.handleURLChange(newURL, 0)

    expect(component.value[0].url).toBe(newURL)
    expect(component.valueChange.emit).toHaveBeenCalledWith(component.value)
  })

  it('#handleConstraintTextChange should emit the new value', () => {
    jest.spyOn(component.valueChange, 'emit')
    const newText = 'New text'
    component.handleConstraintTextChange(newText, 0)

    expect(component.value[0].text).toBe(newText)
    expect(component.valueChange.emit).toHaveBeenCalledWith(component.value)
  })

  it('#handleConstraintsOrderChange should emit the new value', () => {
    jest.spyOn(component.valueChange, 'emit')
    const newConstraints = [...datasetRecordsFixture()[0].legalConstraints]
    newConstraints.push({ text: 'New constraint' })

    component.handleConstraintsOrderChange(newConstraints)

    fixture.detectChanges()
    expect(component.valueChange.emit).toHaveBeenCalledWith(newConstraints)
  })

  it('#addConstraintSectionToDisplay should add a new constraint', () => {
    jest.spyOn(component.valueChange, 'emit')
    const initialConstraints = [...component.value]
    component.addConstraintSectionToDisplay()

    fixture.detectChanges()
    expect(component.valueChange.emit).toHaveBeenCalledWith([
      ...initialConstraints,
      { text: '' },
    ])
  })
})
