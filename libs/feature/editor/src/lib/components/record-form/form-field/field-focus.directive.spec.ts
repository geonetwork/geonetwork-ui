import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FieldFocusDirective } from './field-focus.directive'

@Component({
  standalone: true,
  imports: [FieldFocusDirective],
  template: `
    <div
      gnUiFieldFocus
      [fieldFocusActive]="active"
      [fieldFocusScroll]="scroll"
      [fieldFocusCursor]="cursor"
      [fieldFocusGlowClass]="glowClass"
    >
      <button type="button">a button</button>
      <input type="text" />
    </div>
  `,
})
class HostComponent {
  active = false
  scroll = true
  cursor = true
  glowClass = 'gn-ui-field-focus-glow'
}

@Component({
  standalone: true,
  imports: [FieldFocusDirective],
  template: `
    <div gnUiFieldFocus [fieldFocusActive]="active">
      <button type="button">trigger</button>
    </div>
  `,
})
class ButtonOnlyHostComponent {
  active = false
}

describe('FieldFocusDirective', () => {
  let fixture: ComponentFixture<HostComponent>
  let host: HostComponent
  let el: HTMLElement

  beforeEach(() => {
    jest.useFakeTimers()
    TestBed.configureTestingModule({ imports: [HostComponent] })
    fixture = TestBed.createComponent(HostComponent)
    host = fixture.componentInstance
    el = fixture.nativeElement.querySelector('div')
    el.scrollIntoView = jest.fn() // jsdom has no layout
    fixture.detectChanges()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  function activate() {
    host.active = true
    fixture.detectChanges()
  }

  it('should create', () => {
    expect(el).toBeTruthy()
  })

  it('does not highlight while inactive', () => {
    expect(el.classList.contains('gn-ui-field-focus-glow')).toBe(false)
  })

  it('adds the highlight class when activated', () => {
    activate()
    jest.runOnlyPendingTimers()
    expect(el.classList.contains('gn-ui-field-focus-glow')).toBe(true)
  })

  it('scrolls the host into view when activated', () => {
    activate()
    jest.runOnlyPendingTimers()
    expect(el.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
  })

  it('focuses the first focusable text descendant (not a button)', () => {
    activate()
    jest.runOnlyPendingTimers()
    expect(document.activeElement).toBe(el.querySelector('input'))
  })

  it('re-applies the highlight when re-activated', () => {
    activate()
    jest.runOnlyPendingTimers()
    el.classList.remove('gn-ui-field-focus-glow')
    host.active = false
    fixture.detectChanges()
    host.active = true
    fixture.detectChanges()
    jest.runOnlyPendingTimers()
    expect(el.classList.contains('gn-ui-field-focus-glow')).toBe(true)
  })

  it('does nothing when toggled inactive', () => {
    host.active = false
    fixture.detectChanges()
    expect(el.classList.contains('gn-ui-field-focus-glow')).toBe(false)
  })

  it('does not scroll when fieldFocusScroll is false', () => {
    host.scroll = false
    activate()
    jest.runOnlyPendingTimers()
    expect(el.scrollIntoView).not.toHaveBeenCalled()
  })

  it('does not move focus when fieldFocusCursor is false', () => {
    host.cursor = false
    const before = document.activeElement
    activate()
    jest.runOnlyPendingTimers()
    expect(document.activeElement).toBe(before)
  })

  it('uses a custom glow class when provided', () => {
    host.glowClass = 'gn-ui-row-focus-glow'
    activate()
    jest.runOnlyPendingTimers()
    expect(el.classList.contains('gn-ui-row-focus-glow')).toBe(true)
    expect(el.classList.contains('gn-ui-field-focus-glow')).toBe(false)
  })

  it('falls back to focusing a button when there is no text input', () => {
    const buttonFixture = TestBed.createComponent(ButtonOnlyHostComponent)
    buttonFixture.nativeElement.querySelector('div').scrollIntoView = jest.fn()
    buttonFixture.componentInstance.active = true
    buttonFixture.detectChanges()
    jest.runOnlyPendingTimers()
    expect(document.activeElement).toBe(
      buttonFixture.nativeElement.querySelector('button')
    )
  })
})
