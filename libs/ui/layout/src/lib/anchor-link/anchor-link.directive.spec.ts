import { AnchorLinkDirective } from './anchor-link.directive'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { By } from '@angular/platform-browser'

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
})
@Component({
  template: ` <div>
    <a
      href
      class="my-class"
      gnUiAnchorLink="my-target"
      gnUiAnchorLinkDisabledClass="is-disabled"
      gnUiAnchorLinkEnabledClass="is-enabled"
    >
      My Link
    </a>
  </div>`,
})
class HostComponent {}

describe('AnchorLinkDirective', () => {
  let hostEl: HTMLElement
  let anchorLinkEl: HTMLElement
  let targetEl: HTMLElement
  let fixture: ComponentFixture<HostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, AnchorLinkDirective],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent)
    hostEl = fixture.nativeElement
    anchorLinkEl = fixture.debugElement.query(By.css('a')).nativeElement
    targetEl = document.createElement('div')
    targetEl.id = 'my-target'
    targetEl.scrollIntoView = jest.fn()
  })

  describe('initial state', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })
    it('has the specified disabledClass', () => {
      expect(anchorLinkEl.className).toBe('my-class is-disabled')
    })
  })

  describe('when target element is added', () => {
    beforeEach(() => {
      hostEl.appendChild(targetEl)
      fixture.detectChanges()
    })
    it('adds the specified enabledClass', () => {
      expect(anchorLinkEl.className).toBe('my-class is-enabled')
    })
  })

  describe('when target element is added and removed', () => {
    beforeEach(() => {
      hostEl.appendChild(targetEl)
      targetEl.remove()
      fixture.detectChanges()
    })
    it('adds the specified disabledClass', () => {
      expect(anchorLinkEl.className).toBe('my-class is-disabled')
    })
  })

  describe('on click', () => {
    beforeEach(() => {
      hostEl.appendChild(targetEl)
      fixture.detectChanges()
      anchorLinkEl.click()
    })
    it('scrolls the target into view', () => {
      expect(targetEl.scrollIntoView).toHaveBeenCalled()
    })
  })
})
