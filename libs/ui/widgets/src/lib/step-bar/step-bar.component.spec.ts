import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StepBarComponent } from './step-bar.component'
import { By } from '@angular/platform-browser'

describe('StepBarComponent', () => {
  let component: StepBarComponent
  let fixture: ComponentFixture<StepBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepBarComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBarComponent)
    component = fixture.componentInstance

    component.currentStep = 2
    component.steps = 3

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('current step circle has right color', () => {
    const el = fixture.debugElement.query(By.css('.circle-steps')).nativeElement
    const childArr = [...el.children]

    const currentStep = component.currentStep

    const currentElement = childArr[currentStep - 1]

    expect(currentElement.className.includes('bg-black')).toBeTruthy()
  })

  it('previous steps circle have right color', () => {
    const el = fixture.debugElement.query(By.css('.circle-steps')).nativeElement
    const childArr = [...el.children]

    const currentStep = component.currentStep

    for (let i = 0; i < currentStep - 1; i++) {
      const childEl = childArr[i]
      expect(childEl.className.includes('bg-white')).toBeTruthy()
    }
  })

  it('next steps circle have right color', () => {
    const el = fixture.debugElement.query(By.css('.circle-steps')).nativeElement
    const childArr = [...el.children]

    const currentStep = component.currentStep

    for (let i = currentStep; i < childArr.length; i++) {
      const childEl = childArr[i]
      expect(childEl.className.includes(component.color.innerBar)).toBeTruthy()
    }
  })
})
