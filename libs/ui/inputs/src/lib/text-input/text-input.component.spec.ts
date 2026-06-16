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
