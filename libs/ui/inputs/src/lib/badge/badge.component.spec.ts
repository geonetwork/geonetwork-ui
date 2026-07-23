import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { BadgeComponent } from './badge.component'

@Component({
  imports: [BadgeComponent],
  standalone: true,
  template: `<gn-ui-badge [clickable]="clickable">Keyword label</gn-ui-badge>`,
})
class BadgeTestHostComponent {
  clickable = false
}

describe('BadgeComponent', () => {
  let component: BadgeComponent
  let fixture: ComponentFixture<BadgeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(BadgeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('renders a clickable badge as a button and emits badgeClicked', () => {
    const badgeClicked = jest.fn()
    component.badgeClicked.subscribe(badgeClicked)
    fixture.componentRef.setInput('clickable', true)
    fixture.detectChanges()

    const button = fixture.debugElement.query(By.css('button'))
    expect(button).toBeTruthy()

    button.nativeElement.click()
    expect(badgeClicked).toHaveBeenCalledTimes(1)
  })

  it('projects its content whether clickable or not', () => {
    const hostFixture = TestBed.createComponent(BadgeTestHostComponent)
    hostFixture.detectChanges()
    expect(hostFixture.nativeElement.textContent).toContain('Keyword label')

    hostFixture.componentInstance.clickable = true
    hostFixture.detectChanges()
    expect(hostFixture.nativeElement.textContent).toContain('Keyword label')
  })
})
