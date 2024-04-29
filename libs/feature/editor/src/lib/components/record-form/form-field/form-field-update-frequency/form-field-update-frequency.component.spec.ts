import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldUpdateFrequencyComponent } from './form-field-update-frequency.component'
import { TranslateModule } from '@ngx-translate/core'
import { FormControl } from '@angular/forms'

describe('FormFieldUpdateFrequencyComponent', () => {
  let component: FormFieldUpdateFrequencyComponent
  let fixture: ComponentFixture<FormFieldUpdateFrequencyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldUpdateFrequencyComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldUpdateFrequencyComponent)
    component = fixture.componentInstance
    const control = new FormControl()
    control.setValue({
      updatedTimes: 3,
      per: 'week',
    })
    component.control = control
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should parse the updatedTimes and per values', () => {
    component.onSelectFrequencyValue('day.1')
    expect(component.control.value).toEqual({
      updatedTimes: 1,
      per: 'day',
    })
  })

  it('should be recognized as planned', () => {
    expect(component.planned).toBeTruthy()
  })

  it('should add the custom frequency to the dropdown choices', () => {
    expect(component.choices).toContainEqual({
      value: 'week.3',
      label: 'domain.record.updateFrequency.week',
    })
  })

  describe('Switch to not planned', () => {
    beforeEach(async () => {
      component.onPlannedToggled()
    })

    it('should set the value as notPlanned', () => {
      expect(component.control.value).toBe('notPlanned')
    })

    it('should be recognized as not planned', () => {
      expect(component.planned).toBeFalsy()
    })
  })
})
