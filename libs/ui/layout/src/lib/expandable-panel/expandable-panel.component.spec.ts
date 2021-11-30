import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ExpandablePanelComponent } from './expandable-panel.component'

describe('ExpandablePanelComponent', () => {
  let component: ExpandablePanelComponent
  let fixture: ComponentFixture<ExpandablePanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpandablePanelComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(ExpandablePanelComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandablePanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('click on title', () => {
    it('updates the collapsed property', () => {
      const el = fixture.debugElement.query(By.css('.title')).nativeElement
      expect(component.collapsed).toBe(true)
      el.click()
      expect(component.collapsed).toBe(false)
      el.click()
      expect(component.collapsed).toBe(true)
    })
  })

  describe('content rendering', () => {
    describe('when collapsed', () => {
      beforeEach(() => {
        component.collapsed = true
        fixture.detectChanges()
      })
      it('updates the collapsed property', () => {
        const el = fixture.debugElement.query(By.css('.content'))
        expect(el).toBeFalsy()
      })
    })
    describe('when not collapsed', () => {
      beforeEach(() => {
        component.collapsed = false
        fixture.detectChanges()
      })
      it('updates the collapsed property', () => {
        const el = fixture.debugElement.query(By.css('.content'))
        expect(el).toBeTruthy()
      })
    })
  })
})
