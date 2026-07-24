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
    fixture.componentRef.setInput('placeholder', 'Hint')
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
      fixture.componentRef.setInput('type', 'email')
      fixture.detectChanges()
      expect(inputEl.type).toBe('email')
    })
  })

  describe('isValid', () => {
    let inputEl: HTMLInputElement
    beforeEach(() => {
      inputEl = fixture.nativeElement.querySelector('input')
      // mock basic email check
      jest
        .spyOn(inputEl, 'checkValidity')
        .mockImplementation(
          () => inputEl.value === '' || inputEl.value.includes('@')
        )
    })

    describe('native validation', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('type', 'email')
      })

      it('returns false for an invalid email', () => {
        inputEl.value = 'not-an-email'
        component.inputModel.set('not-an-email')
        expect(component.isValid()).toBe(false)
      })

      it('returns true for a valid email', () => {
        inputEl.value = 'aaa@bbb.com'
        component.inputModel.set('aaa@bbb.com')
        expect(component.isValid()).toBe(true)
      })

      it('returns true for an empty field', () => {
        inputEl.value = ''
        component.inputModel.set('')
        expect(component.isValid()).toBe(true)
      })

      it('applies validation including with an initial value', () => {
        fixture.componentRef.setInput('value', 'not-an-email')
        expect(component.isValid()).toBe(false)
      })
    })

    describe('required', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('required', true)
      })

      it('returns true for non empty field', () => {
        component.inputModel.set('dadzadzad')
        expect(component.isValid()).toBe(true)
      })

      it('returns false for empty field', () => {
        component.inputModel.set('')
        expect(component.isValid()).toBe(false)
      })
    })
  })
})
