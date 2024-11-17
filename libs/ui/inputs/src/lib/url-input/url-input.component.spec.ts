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

    it('shows an empty input if given a nullish url', () => {
      component.value = null
      fixture.detectChanges()
      expect(inputEl.value).toEqual('')
    })

    describe('uploadClick', () => {
      it('emits the value on a button click event', () => {
        let emitted
        component.uploadClick.subscribe((v) => (emitted = v))
        inputEl.value = 'http://aaa.com/bcd'
        button.triggerEventHandler('buttonClick', null)
        expect(emitted).toBe('http://aaa.com/bcd')
      })
      it('does not emit the value on an input event', () => {
        let emitted = null
        component.uploadClick.subscribe((v) => (emitted = v))
        inputEl.value = 'http://aaa.com/bcd'
        inputEl.dispatchEvent(new Event('input'))
        expect(emitted).toBe(null)
      })
      it('emits the value on a enter press event', () => {
        let emitted
        component.uploadClick.subscribe((v) => (emitted = v))
        inputEl.value = 'http://aaa.com/bcd'
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }))
        expect(emitted).toBe('http://aaa.com/bcd')
      })
      it('can emit multiple equal values', () => {
        let emittedCount = 0
        component.uploadClick.subscribe(() => emittedCount++)
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
        component.uploadClick.subscribe((v) => (emitted = v))
        inputEl.value = ''
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }))
        expect(emitted).toBe(null)
        inputEl.value = 'http://bla'
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }))
        expect(emitted).toBe('http://bla')
      })
    })
    describe('valueChange', () => {
      it('does not the value on a button click event', () => {
        let emitted = null
        component.valueChange.subscribe((v) => (emitted = v))
        inputEl.value = 'http://aaa.com/bcd'
        button.triggerEventHandler('buttonClick', null)
        expect(emitted).toBe(null)
      })
      it('emits the value on an input event', () => {
        let emitted = null
        component.valueChange.subscribe((v) => (emitted = v))
        inputEl.value = 'http://aaa.com/bcd'
        inputEl.dispatchEvent(new Event('input'))
        expect(emitted).toBe('http://aaa.com/bcd')
      })
      it('does not emit the value if not a valid URL', () => {
        let emitted = null
        component.valueChange.subscribe((v) => (emitted = v))
        inputEl.value = 'blargz'
        inputEl.dispatchEvent(new Event('input'))
        expect(emitted).toBe(null)
      })
      it('emits null if the input is cleared', () => {
        let emitted = undefined
        component.valueChange.subscribe((v) => (emitted = v))
        inputEl.value = ''
        inputEl.dispatchEvent(new Event('input'))
        expect(emitted).toBe(null)
      })
    })

    describe('button', () => {
      it('is disabled if parent set it as disabled', () => {
        component.disabled = true
        inputEl.value = ''
        inputEl.dispatchEvent(new Event('input'))
        fixture.detectChanges()
        expect(button.componentInstance.disabled).toBe(true)
      })
      it('is disabled if value is empty', () => {
        inputEl.value = ''
        inputEl.dispatchEvent(new Event('input'))
        fixture.detectChanges()
        expect(button.componentInstance.disabled).toBe(true)
      })
      it('is disabled if value is not an URL', () => {
        inputEl.value = 'hello'
        inputEl.dispatchEvent(new Event('input'))
        fixture.detectChanges()
        expect(button.componentInstance.disabled).toBe(true)
      })
      it('is not disabled otherwise', () => {
        inputEl.value = 'http://hello.org'
        inputEl.dispatchEvent(new Event('input'))
        fixture.detectChanges()
        expect(button.componentInstance.disabled).toBeFalsy()
      })
    })

    describe('input value', () => {
      it('changes if the component input resolves to a different url', () => {
        inputEl.value = 'http://aaa.com/1234'
        inputEl.dispatchEvent(new Event('input'))
        component.value = 'http://aaa.com/bcd'
        fixture.detectChanges()
        expect(inputEl.value).toEqual('http://aaa.com/bcd')
      })
      it('does not change if the component input is different that the current value but resolves to the same url', () => {
        inputEl.value = 'http://aaa.com/1234 5678'
        inputEl.dispatchEvent(new Event('input'))
        component.value = 'http://aaa.com/1234%205678'
        fixture.detectChanges()
        expect(inputEl.value).toEqual('http://aaa.com/1234 5678')
      })
      it('does not change if both the component input and the current input are not valid urls', () => {
        inputEl.value = 'blargz'
        inputEl.dispatchEvent(new Event('input'))
        component.value = undefined
        fixture.detectChanges()
        expect(inputEl.value).toEqual('blargz')
      })
    })
  })
})
