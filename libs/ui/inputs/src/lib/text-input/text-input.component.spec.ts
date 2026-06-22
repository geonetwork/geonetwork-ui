import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TextInputComponent } from './text-input.component'

describe('TextInputComponent', () => {
  let component: TextInputComponent
  let fixture: ComponentFixture<TextInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInputComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent)
    component = fixture.componentInstance
    component.placeholder = 'Hint'
    fixture.detectChanges()
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('text input', () => {
    let inputEl
    beforeEach(() => {
      fixture.detectChanges()
      inputEl = fixture.nativeElement.querySelector('input')
    })
    it('emits the value on a change event', () => {
      let emitted
      component.valueChange.subscribe((v) => (emitted = v))
      inputEl.value = 'Aaabcd'
      inputEl.dispatchEvent(new Event('change'))
      expect(emitted).toBe('Aaabcd')
    })
    it('emits the value on an input event', () => {
      let emitted
      component.valueChange.subscribe((v) => (emitted = v))
      inputEl.value = 'Aaabcd'
      inputEl.dispatchEvent(new Event('input'))
      expect(emitted).toBe('Aaabcd')
    })
    it('emits only unique values', () => {
      let emittedCount = 0
      component.valueChange.subscribe(() => emittedCount++)
      inputEl.value = 'Aaabcd'
      inputEl.dispatchEvent(new Event('input'))
      inputEl.value = 'Aaabcd'
      inputEl.dispatchEvent(new Event('input'))
      inputEl.value = 'bbb'
      inputEl.dispatchEvent(new Event('input'))
      expect(emittedCount).toBe(2)
    })
  })

  describe('input type', () => {
    let inputEl
    beforeEach(() => {
      inputEl = fixture.nativeElement.querySelector('input')
    })

    it('defaults to a text input', () => {
      expect(inputEl.type).toBe('text')
    })

    it('reflects the type input on the element', () => {
      component.type = 'email'
      fixture.detectChanges()
      expect(inputEl.type).toBe('email')
    })
  })

  describe('native validation', () => {
    let inputEl
    beforeEach(() => {
      component.type = 'email'
      fixture.detectChanges()
      inputEl = fixture.nativeElement.querySelector('input')
    })

    it('reports an invalid email as invalid', () => {
      inputEl.value = 'not-an-email'
      inputEl.dispatchEvent(new Event('input'))
      expect(inputEl.validity.typeMismatch).toBe(true)
      expect(inputEl.checkValidity()).toBe(false)
    })

    it('reports a valid email as valid', () => {
      inputEl.value = 'foo@bar.com'
      inputEl.dispatchEvent(new Event('input'))
      expect(inputEl.validity.valid).toBe(true)
    })

    it('treats an empty, non-required field as valid', () => {
      inputEl.value = ''
      inputEl.dispatchEvent(new Event('input'))
      expect(inputEl.validity.valid).toBe(true)
    })

    it('reports an empty required field as invalid', () => {
      component.required = true
      fixture.detectChanges()
      inputEl.value = ''
      inputEl.dispatchEvent(new Event('input'))
      expect(inputEl.validity.valueMissing).toBe(true)
    })
  })

  describe('value emission with validation', () => {
    let inputEl
    let emitted
    let emittedCount

    beforeEach(() => {
      emitted = undefined
      emittedCount = 0
      component.type = 'email'
      fixture.detectChanges()
      inputEl = fixture.nativeElement.querySelector('input')
      component.valueChange.subscribe((v) => {
        emitted = v
        emittedCount++
      })
    })

    it('does not emit a value that fails type validation', () => {
      inputEl.value = 'not-an-email'
      inputEl.dispatchEvent(new Event('input'))
      expect(emittedCount).toBe(0)
      expect(emitted).toBeUndefined()
    })

    it('does not emit an empty required value', () => {
      component.required = true
      fixture.detectChanges()
      inputEl.value = ''
      inputEl.dispatchEvent(new Event('input'))
      expect(emittedCount).toBe(0)
    })

    it('emits once the value becomes valid', () => {
      inputEl.value = 'not-an-email'
      inputEl.dispatchEvent(new Event('input'))
      inputEl.value = 'foo@bar.com'
      inputEl.dispatchEvent(new Event('input'))
      expect(emitted).toBe('foo@bar.com')
      expect(emittedCount).toBe(1)
    })
  })

  describe('required validation', () => {
    let inputEl
    beforeEach(() => {
      component.required = true
      fixture.detectChanges()
      inputEl = fixture.nativeElement.querySelector('input')
    })

    it('sets the required attribute on the element', () => {
      expect(inputEl.required).toBe(true)
    })

    it('reports an empty required input as invalid', () => {
      inputEl.value = ''
      inputEl.dispatchEvent(new Event('input'))
      expect(inputEl.validity.valueMissing).toBe(true)
      expect(inputEl.checkValidity()).toBe(false)
    })

    it('reports the input as valid when a value is entered', () => {
      inputEl.value = 'some value'
      inputEl.dispatchEvent(new Event('input'))
      expect(inputEl.validity.valid).toBe(true)
    })

    it('does not set the required attribute when not required', () => {
      component.required = false
      fixture.detectChanges()
      inputEl.value = ''
      inputEl.dispatchEvent(new Event('input'))
      expect(inputEl.required).toBe(false)
      expect(inputEl.validity.valid).toBe(true)
    })
  })
})
