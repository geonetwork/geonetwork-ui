import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CheckboxComponent } from './checkbox.component'

describe('CheckboxComponent', () => {
  let component: CheckboxComponent
  let fixture: ComponentFixture<CheckboxComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(CheckboxComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('click when unchecked', () => {
    beforeEach(() => {
      component.checked = false
    })
    it('should invert checked state when being clicked', () => {
      const event = new Event('click')
      component.handleClick(event)

      expect(component.checked).toBe(true)
    })
  })

  describe('click when checked', () => {
    beforeEach(() => {
      component.checked = true
    })
    it('should invert checked state when being clicked', () => {
      const event = new Event('click')
      component.handleClick(event)

      expect(component.checked).toBe(false)
    })
  })
})
