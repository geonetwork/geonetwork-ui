import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AutofocusDirective } from './autofocus.directive'

@Component({
  template: `<input type="text" [gnUiAutofocus]="focused" />`,
  imports: [AutofocusDirective],
  standalone: true,
})
class TestComponent {
  focused = false
}

describe('AutofocusDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let input: HTMLInputElement

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({}).createComponent(TestComponent)
    fixture.detectChanges()
    await fixture.whenStable()
    input = fixture.nativeElement.querySelector('input')
  })

  it('does not focus while the value is false', () => {
    expect(document.activeElement).not.toBe(input)
  })

  describe('when the value becomes true', () => {
    beforeEach(async () => {
      fixture.componentInstance.focused = true
      fixture.detectChanges()
      await fixture.whenStable()
    })

    it('focuses the host element', () => {
      expect(document.activeElement).toBe(input)
    })

    describe('and true again after losing focus', () => {
      beforeEach(async () => {
        input.blur()
        fixture.componentInstance.focused = false
        fixture.detectChanges()
        await fixture.whenStable()
        fixture.componentInstance.focused = true
        fixture.detectChanges()
        await fixture.whenStable()
      })

      it('focuses the host element again', () => {
        expect(document.activeElement).toBe(input)
      })
    })
  })
})
