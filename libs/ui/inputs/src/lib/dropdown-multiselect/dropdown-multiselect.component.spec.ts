import { OverlayModule } from '@angular/cdk/overlay'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DropdownMultiselectComponent } from './dropdown-multiselect.component'
import { MatIconModule } from '@angular/material/icon'
import { By } from '@angular/platform-browser'
import { ChangeDetectionStrategy, DebugElement } from '@angular/core'

describe('DropdownMultiselectComponent', () => {
  let component: DropdownMultiselectComponent
  let fixture: ComponentFixture<DropdownMultiselectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownMultiselectComponent],
      imports: [OverlayModule, MatIconModule],
    })
      .overrideComponent(DropdownMultiselectComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(DropdownMultiselectComponent)
    component = fixture.componentInstance
    component.choices = []
    component.selected = []
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('item toggling', () => {
    let emitted
    beforeEach(() => {
      component.choices = [
        { label: 'First Choice', value: 'choice1' },
        { label: 'Second Choice', value: 'choice2' },
        { label: 'Third Choice', value: 'choice3' },
      ]
      component.selected = ['choice2']
      emitted = null
      component.selectValues.subscribe((v) => (emitted = v))
    })
    describe('when clicking an unselected item', () => {
      it('emits the correct list of items', () => {
        component.toggle({ label: 'First Choice', value: 'choice1' })
        expect(emitted).toEqual(['choice2', 'choice1'])
      })
    })
    describe('when clicking a selected item', () => {
      it('emits the correct list of items', () => {
        component.toggle({ label: 'Second Choice', value: 'choice2' })
        expect(emitted).toEqual([])
      })
    })
  })

  describe('overlay sizing', () => {
    describe('width', () => {
      beforeEach(() => {
        const originEl: HTMLElement =
          component.overlayOrigin.elementRef.nativeElement
        originEl.getBoundingClientRect = () =>
          ({
            width: 25,
            height: 20,
          } as any)
        component.openOverlay()
      })
      it('sets the width according to the toggle element', () => {
        expect(component.overlayWidth).toBe('25px')
      })
    })
    describe('max height (with maxRows set)', () => {
      beforeEach(() => {
        component.maxRows = 10
        component.openOverlay()
      })
      it('sets the max height according to the max rows input', () => {
        expect(component.overlayMaxHeight).toMatch(/^[0-9]+px$/)
      })
    })
    describe('max height (with maxRows unset)', () => {
      beforeEach(() => {
        component.maxRows = undefined
        component.openOverlay()
      })
      it('sets the max height according to the max rows input', () => {
        // we don't need the exact measurement, just to make sure it's an actual value
        expect(component.overlayMaxHeight).toBe('none')
      })
    })
  })

  describe('selected choices count', () => {
    let selectedCountEl: DebugElement
    describe('if one or more selected choices', () => {
      beforeEach(() => {
        component.selected = ['aa', 'bb']
        fixture.detectChanges()
        selectedCountEl = fixture.debugElement.query(By.css('.selected-count'))
      })
      it('shows the count', () => {
        expect(selectedCountEl).toBeTruthy()
        expect(selectedCountEl.nativeElement.textContent.trim()).toEqual('2')
      })
    })
    describe('if no selected choice', () => {
      beforeEach(() => {
        component.selected = []
        fixture.detectChanges()
        selectedCountEl = fixture.debugElement.query(By.css('.selected-count'))
      })
      it('shows the count', () => {
        expect(selectedCountEl).toBeFalsy()
      })
    })
  })
})
