import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CheckToggleComponent } from './check-toggle.component'

describe('CheckToggleComponent', () => {
  let component: CheckToggleComponent
  let fixture: ComponentFixture<CheckToggleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckToggleComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CheckToggleComponent)
    component = fixture.componentInstance
    component.config = ['CC-BY']
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the new license value on toggle', () => {
    const toggledSpy = jest.spyOn(component.toggled, 'emit')
    component.model = 'licenses'
    component.toggle(true)
    expect(toggledSpy).toHaveBeenCalledWith([true, [{ text: 'CC-BY' }]])
  })

  it('should emit the event value on toggle when model is not licenses', () => {
    const toggledSpy = jest.spyOn(component.toggled, 'emit')
    component.model = 'not-licenses'
    component.toggle(true)
    expect(toggledSpy).toHaveBeenCalledWith(true)
  })
})
