import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldConstraintsComponent } from './form-field-constraints.component'
import { MockBuilder, MockInstance, MockProvider } from 'ng-mocks'
import { EditorFacade } from '../../../../+state/editor.facade'
import { BehaviorSubject, of } from 'rxjs'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

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
      providers: [
        MockProvider(EditorFacade),
        importProvidersFrom(TranslateModule.forRoot()),
      ],
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

  it('#handleConstraintChange should emit the new value', () => {
    jest.spyOn(component.valueChange, 'emit')
    const newConstraint = { text: 'aaa', url: new URL('http://example.com') }
    component.handleConstraintChange(newConstraint, 0)

    expect(component.value[0]).toBe(newConstraint)
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
