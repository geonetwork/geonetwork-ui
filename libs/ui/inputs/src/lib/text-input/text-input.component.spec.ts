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

  describe('required validation', () => {
    let inputEl
    beforeEach(() => {
      component.required = true
      fixture.detectChanges()
      inputEl = fixture.nativeElement.querySelector('input')
    })

    it('does not mark an empty input invalid before it is touched', () => {
      component.ngAfterViewInit()
      expect(inputEl.classList).not.toContain('invalid')
    })

    it('marks the input invalid once it is touched and left empty', () => {
      inputEl.value = ''
      inputEl.dispatchEvent(new Event('input'))
      expect(inputEl.classList).toContain('invalid')
    })

    it('does not mark the input invalid when a value is entered', () => {
      inputEl.value = 'some value'
      inputEl.dispatchEvent(new Event('input'))
      expect(inputEl.classList).not.toContain('invalid')
    })

    it('does not mark the input invalid when not required', () => {
      component.required = false
      inputEl.value = ''
      inputEl.dispatchEvent(new Event('input'))
      expect(inputEl.classList).not.toContain('invalid')
    })
  })
})
