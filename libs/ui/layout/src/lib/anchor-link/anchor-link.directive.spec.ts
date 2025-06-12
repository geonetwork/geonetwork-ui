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
      gnUiAnchorLinkInViewClass="is-in-view"
      gnUiAnchorLinkOutOfViewClass="is-out-of-view"
    >
      My Link
    </a>
  </div>`,
  imports: [AnchorLinkDirective],
  standalone: true,
})
class HostComponent {}

describe('AnchorLinkDirective', () => {
  let hostEl: HTMLElement
  let anchorLinkEl: HTMLElement
  let targetEl: HTMLElement
  let fixture: ComponentFixture<HostComponent>

  beforeEach(async () => {
    await TestBed.compileComponents()
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
    it('adds the specified enabledClass and outOfViewClass', () => {
      expect(anchorLinkEl.className).toBe('my-class is-enabled is-out-of-view')
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

  describe('IntersectionObserver', () => {
    describe('if targetId is found', () => {
      beforeEach(() => {
        hostEl.appendChild(targetEl)
        fixture.detectChanges()
      })
      it('initializes IntersectionObserver with correct values', () => {
        expect(window.IntersectionObserver).toHaveBeenCalledWith(
          expect.any(Function),
          {
            root: null,
            rootMargin: '-30% 0% -60% 0%',
          }
        )
      })
      afterEach(() => {
        jest.clearAllMocks()
      })
    })
    describe('if targetId is NOT found', () => {
      beforeEach(() => {
        const targetElWithoutId = document.createElement('div')
        hostEl.appendChild(targetElWithoutId)
        fixture.detectChanges()
      })
      it('does not initialize IntersectionObserver', () => {
        expect(window.IntersectionObserver).not.toHaveBeenCalled()
      })
      afterEach(() => {
        jest.clearAllMocks()
      })
    })
  })
  describe('when target element is in view', () => {
    beforeEach(() => {
      hostEl.appendChild(targetEl)
      fixture.detectChanges()
      const observerCallback = (window.IntersectionObserver as jest.Mock).mock
        .calls[0][0]
      observerCallback([{ isIntersecting: true }])
      fixture.detectChanges()
    })
    it('adds the specified inViewClass and removes outOfViewClass', () => {
      expect(anchorLinkEl.className).toBe('my-class is-enabled is-in-view')
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
  })
  describe('when target element is NOT in view', () => {
    beforeEach(() => {
      hostEl.appendChild(targetEl)
      fixture.detectChanges()
      const observerCallback = (window.IntersectionObserver as jest.Mock).mock
        .calls[0][0]
      observerCallback([{ isIntersecting: false }])
      fixture.detectChanges()
    })
    it('removes the specified inViewClass and adds outOfViewClass', () => {
      expect(anchorLinkEl.className).toBe('my-class is-enabled is-out-of-view')
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
  })
})
