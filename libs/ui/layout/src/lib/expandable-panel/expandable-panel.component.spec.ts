import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ExpandablePanelComponent } from './expandable-panel.component'

describe('ExpandablePanelComponent', () => {
  let component: ExpandablePanelComponent
  let fixture: ComponentFixture<ExpandablePanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandablePanelComponent],
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

  describe('complex title rendering', () => {
    it('shows simple title when no template is provided', () => {
      component.title = 'Simple Title'
      fixture.detectChanges()
      const titleElement = fixture.debugElement.query(
        By.css('.font-medium.text-sm')
      )
      expect(titleElement.nativeElement.textContent).toContain('Simple Title')
    })

    it('uses template when provided', () => {
      const customTemplate = `<div>Custom Template</div>`
      component.titleTemplate = customTemplate as any
      fixture.detectChanges()
      const simpleTitle = fixture.debugElement.query(
        By.css('.font-medium.text-sm')
      )
      expect(simpleTitle).toBeFalsy()
    })
  })

  describe('content rendering', () => {
    describe('when collapsed', () => {
      beforeEach(() => {
        component.collapsed = true
        fixture.detectChanges()
      })
      it('hides content', () => {
        const el = fixture.debugElement.query(By.css('.content'))
        expect(el.styles.getPropertyValue('max-height')).toEqual('0px')
      })
      it('should have ease-out transition', () => {
        const el = fixture.debugElement.query(By.css('.content'))
        expect(el.classes['ease-out']).toBeTruthy()
        expect(el.classes['ease-in']).toBeFalsy()
      })
    })
    describe('when not collapsed', () => {
      beforeEach(() => {
        component.collapsed = false
        fixture.detectChanges()
      })
      it('should have ease-in transition', () => {
        const el = fixture.debugElement.query(By.css('.content'))
        expect(el.classes['ease-in']).toBeTruthy()
        expect(el.classes['ease-out']).toBeFalsy()
      })
    })
  })
})
