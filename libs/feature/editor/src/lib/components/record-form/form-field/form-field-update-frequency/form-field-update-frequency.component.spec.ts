import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldUpdateFrequencyComponent } from './form-field-update-frequency.component'
import { provideTranslateService } from '@ngx-translate/core'

describe('FormFieldUpdateFrequencyComponent', () => {
  let component: FormFieldUpdateFrequencyComponent
  let fixture: ComponentFixture<FormFieldUpdateFrequencyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideTranslateService()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldUpdateFrequencyComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when the initial value is an UpdateFrequencyCustom', () => {
    beforeEach(async () => {
      component.value = {
        updatedTimes: 3,
        per: 'week',
      }
      fixture.detectChanges()
      await component.ngOnInit()
    })

    it('should offer a set of initial choices', () => {
      expect(component['choices']).toHaveLength(13)
      expect(component['choices']).toContainEqual({
        label: 'domain.record.updateFrequency.week',
        value: 'week.3',
      })
    })

    it('should be recognized as planned', () => {
      expect(component.planned).toBeTruthy()
    })

    it('should add the custom frequency to the dropdown choices', () => {
      expect(component['choices']).toContainEqual({
        value: 'week.3',
        label: 'domain.record.updateFrequency.week',
      })
    })

    it('should parse and emit the updatedTimes and per values on new selection', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onSelectFrequencyValue('day.1')
      expect(spy).toHaveBeenCalledWith({
        updatedTimes: 1,
        per: 'day',
      })
    })

    it('should emit notPlanned on toggle', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onPlannedToggled()
      expect(spy).toHaveBeenCalledWith('notPlanned')
    })
  })

  describe('when the initial value is an UpdateFrequencyCode', () => {
    beforeEach(() => {
      component.value = 'notPlanned'
      fixture.detectChanges()
    })

    it('should be recognized as not planned', () => {
      expect(component.planned).toBeFalsy()
    })

    it('should emit once per day on toggle', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      component.onPlannedToggled()
      expect(spy).toHaveBeenCalledWith('continual')
    })
  })
})
