import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { FieldFocusDirective } from './field-focus.directive'

@Component({
  standalone: true,
  imports: [FieldFocusDirective],
  template: `
    <div gnUiFieldFocus [gnUiFieldFocusGlowClass]="glowClass">
      <button type="button">a button</button>
      <input type="text" />
    </div>
  `,
})
class HostComponent {
  glowClass = 'gn-ui-field-focus-glow'
}

@Component({
  standalone: true,
  imports: [FieldFocusDirective],
  template: `
    <div gnUiFieldFocus>
      <button type="button">trigger</button>
    </div>
  `,
})
class ButtonOnlyHostComponent {}

function getDirective(fixture: ComponentFixture<unknown>): FieldFocusDirective {
  return fixture.debugElement
    .query(By.directive(FieldFocusDirective))
    .injector.get(FieldFocusDirective)
}

describe('FieldFocusDirective', () => {
  let fixture: ComponentFixture<HostComponent>
  let host: HostComponent
  let el: HTMLElement
  let directive: FieldFocusDirective

  beforeEach(() => {
    jest.useFakeTimers()
    TestBed.configureTestingModule({ imports: [HostComponent] })
    fixture = TestBed.createComponent(HostComponent)
    host = fixture.componentInstance
    el = fixture.nativeElement.querySelector('div')
    el.scrollIntoView = jest.fn()
    fixture.detectChanges()
    directive = getDirective(fixture)
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('should create', () => {
    expect(directive).toBeTruthy()
  })

  it('does not glow until focusField() is called', () => {
    expect(el.classList.contains('gn-ui-field-focus-glow')).toBe(false)
  })

  describe('focusField()', () => {
    it('adds the glow class', () => {
      directive.focusField()
      jest.runOnlyPendingTimers()
      expect(el.classList.contains('gn-ui-field-focus-glow')).toBe(true)
    })

    it('scrolls the host into view', () => {
      directive.focusField()
      jest.runOnlyPendingTimers()
      expect(el.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      })
    })

    it('focuses the first focusable text descendant (not a button)', () => {
      directive.focusField()
      jest.runOnlyPendingTimers()
      expect(document.activeElement).toBe(el.querySelector('input'))
    })

    it('uses a custom glow class when provided', () => {
      host.glowClass = 'gn-ui-row-focus-glow'
      fixture.detectChanges()
      directive.focusField()
      jest.runOnlyPendingTimers()
      expect(el.classList.contains('gn-ui-row-focus-glow')).toBe(true)
      expect(el.classList.contains('gn-ui-field-focus-glow')).toBe(false)
    })

    it('re-applies the glow when called again', () => {
      directive.focusField()
      jest.runOnlyPendingTimers()
      el.classList.remove('gn-ui-field-focus-glow')
      directive.focusField()
      jest.runOnlyPendingTimers()
      expect(el.classList.contains('gn-ui-field-focus-glow')).toBe(true)
    })

    it('does not focus any descendant when focusInnerTarget is false', () => {
      directive.focusField(false)
      jest.runOnlyPendingTimers()
      expect(document.activeElement).not.toBe(el.querySelector('input'))
      expect(document.activeElement).not.toBe(el.querySelector('button'))
      expect(el.classList.contains('gn-ui-field-focus-glow')).toBe(true)
    })

    it('falls back to focusing a button when there is no text input', () => {
      const buttonFixture = TestBed.createComponent(ButtonOnlyHostComponent)
      const buttonEl = buttonFixture.nativeElement.querySelector('div')
      buttonEl.scrollIntoView = jest.fn()
      buttonFixture.detectChanges()
      getDirective(buttonFixture).focusField()
      jest.runOnlyPendingTimers()
      expect(document.activeElement).toBe(buttonEl.querySelector('button'))
    })
  })
})
