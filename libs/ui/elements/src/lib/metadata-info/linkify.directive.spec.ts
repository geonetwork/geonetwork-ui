import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing'
import { Component, DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { GnUiLinkifyDirective } from './linkify.directive'

@Component({
  template: `<div [gnUiLinkify]>Click this link https://www.example.com</div>`,
})
class TestComponent {}

describe('GnUiLinkifyDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let component: TestComponent
  let debugElement: DebugElement

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GnUiLinkifyDirective, TestComponent],
    })

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    debugElement = fixture.debugElement.query(
      By.directive(GnUiLinkifyDirective)
    )

    fixture.detectChanges()
  }))

  it('should create an anchor element with the correct href', () => {
    fixture.detectChanges()
    const anchorElement = debugElement.query(By.css('a'))

    const href = anchorElement.nativeElement.getAttribute('href')
    expect(href).toBe('https://www.example.com')
  })

  it('should have the target attribute set to "_blank"', () => {
    fixture.detectChanges()
    const anchorElement = debugElement.query(By.css('a'))

    const target = anchorElement.nativeElement.getAttribute('target')
    expect(target).toBe('_blank')
  })
})
