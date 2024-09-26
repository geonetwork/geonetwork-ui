import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UrlInputComponent } from './url-input.component'
import { By } from '@angular/platform-browser'
import { ButtonComponent } from '../button/button.component'

describe('UrlInputComponent', () => {
  let component: UrlInputComponent
  let fixture: ComponentFixture<UrlInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlInputComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlInputComponent)
    component = fixture.componentInstance
    component.placeholder = 'Hint'
    fixture.detectChanges()
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('url input', () => {
    let inputEl
    let button
    beforeEach(() => {
      fixture.detectChanges()
      inputEl = fixture.nativeElement.querySelector('input')
      button = fixture.debugElement.query(By.directive(ButtonComponent))
    })
    it('emits the value on a button click event', () => {
      let emitted
      component.valueChange.subscribe((v) => (emitted = v))
      inputEl.value = 'Aaabcd'
      button.triggerEventHandler('buttonClick', null)
      expect(emitted).toBe('Aaabcd')
    })
    it('does not the value on an input event', () => {
      let emitted = null
      component.valueChange.subscribe((v) => (emitted = v))
      inputEl.value = 'Aaabcd'
      inputEl.dispatchEvent(new Event('input'))
      expect(emitted).toBe(null)
    })
    it('emits the value on a enter press event', () => {
      let emitted
      component.valueChange.subscribe((v) => (emitted = v))
      inputEl.value = 'Aaabcd'
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }))
      expect(emitted).toBe('Aaabcd')
    })
    it('can emit multiple equal values', () => {
      let emittedCount = 0
      component.valueChange.subscribe(() => emittedCount++)
      inputEl.value = 'http://bla'
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }))
      inputEl.value = 'http://bla'
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }))
      inputEl.value = 'http://bla'
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }))
      expect(emittedCount).toBe(3)
    })
    it('does not emit empty values', () => {
      let emitted = null
      component.valueChange.subscribe((v) => (emitted = v))
      inputEl.value = ''
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }))
      expect(emitted).toBe(null)
      inputEl.value = 'http://bla'
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }))
      expect(emitted).toBe('http://bla')
    })

    describe('button', () => {
      it('is disabled if parent set it as disabled', () => {
        component.disabled = true
        inputEl.value = ''
        fixture.detectChanges()
        expect(button.componentInstance.disabled).toBe(true)
      })
      it('is disabled if value is empty', () => {
        inputEl.value = ''
        fixture.detectChanges()
        expect(button.componentInstance.disabled).toBe(true)
      })
      it('is disabled if asking for parseable URL and value is not an URL', () => {
        component.urlCanParse = true
        inputEl.value = 'hello'
        fixture.detectChanges()
        expect(button.componentInstance.disabled).toBe(true)
      })
      it('is not disabled otherwise', () => {
        inputEl.value = 'hello'
        fixture.detectChanges()
        expect(button.componentInstance.disabled).toBeFalsy()
      })
    })
  })
})
