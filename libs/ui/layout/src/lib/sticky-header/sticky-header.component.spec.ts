import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'

import { StickyHeaderComponent } from './sticky-header.component'
import { Component, DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({
  template: `<div style="overflow-y: auto">
    <gn-ui-sticky-header [minHeightPx]="100" [fullHeightPx]="300">
      <ng-template let-expandRatio>
        <div class="content" [style.opacity]="expandRatio">
          This is the header text.
        </div>
      </ng-template>
    </gn-ui-sticky-header>
  </div>`,
})
class ContainerComponent {}

describe('StickyHeaderComponent', () => {
  let component: StickyHeaderComponent
  let componentDebugEl: DebugElement
  let fixture: ComponentFixture<ContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerComponent, StickyHeaderComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent)
    componentDebugEl = fixture.debugElement.query(
      By.directive(StickyHeaderComponent)
    )
    component = componentDebugEl.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('contains the header text in the template', () => {
    const content = componentDebugEl.nativeElement.textContent
    expect(content.trim()).toBe('This is the header text.')
  })

  describe('size update', () => {
    let headerEl: HTMLElement
    let containerEl: HTMLElement
    let contentEl: HTMLElement
    beforeEach(() => {
      headerEl = component.innerContainer.nativeElement
      containerEl = fixture.nativeElement.children[0]
      contentEl = fixture.debugElement.query(By.css('.content')).nativeElement
    })
    describe('at initialization', () => {
      it('sets height at full height', () => {
        expect(headerEl.style.height).toBe('300px')
      })
      it('sets opacity using expandRatio', () => {
        expect(contentEl.style.opacity).toBe('1')
      })
    })
    describe('after partial scroll', () => {
      beforeEach(fakeAsync(() => {
        containerEl.scrollTop = 50
        containerEl.dispatchEvent(new Event('scroll'))
        tick(20)
      }))
      it('sets height between full and min height', () => {
        expect(headerEl.style.height).toBe('250px')
      })
      it('sets opacity using expandRatio', () => {
        expect(contentEl.style.opacity).toBe('0.75')
      })
    })
    describe('after complete scroll', () => {
      beforeEach(fakeAsync(() => {
        containerEl.scrollTop = 250
        containerEl.dispatchEvent(new Event('scroll'))
        tick(20)
      }))
      it('sets height at min height', () => {
        expect(headerEl.style.height).toBe('100px')
      })
      it('sets opacity using expandRatio', () => {
        expect(contentEl.style.opacity).toBe('0')
      })
    })
  })
})
