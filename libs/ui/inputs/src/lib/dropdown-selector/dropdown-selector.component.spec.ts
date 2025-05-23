import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DropdownSelectorComponent } from './dropdown-selector.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('DropdownSelectorComponent', () => {
  let component: DropdownSelectorComponent
  let fixture: ComponentFixture<DropdownSelectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSelectorComponent)
    component = fixture.componentInstance
    component.title = 'Title'
    component.choices = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' },
    ]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('items selection', () => {
    let emitted
    beforeEach(() => {
      component.selected = 'b'
      emitted = null
      component.selectValue.subscribe((v) => (emitted = v))
    })
    describe('when clicking an item with selectedValueExpectedAsObject', () => {
      it('emits the correct item as Json object', () => {
        component.onSelectValue({ label: 'A', value: 'a' })
        expect(emitted).toEqual('a')
      })
    })

    describe('when an existing value is provided', () => {
      beforeEach(() => {
        component.selected = 'b'
      })
      it('selects the corresponding choice', () => {
        expect(component.selectedChoice).toEqual({ label: 'B', value: 'b' })
      })
    })

    describe('when no selected value is provided', () => {
      beforeEach(() => {
        component.selected = undefined
      })
      it('selects the first choice', () => {
        expect(component.selectedChoice).toEqual({ label: 'A', value: 'a' })
      })
    })

    describe('when the selected value is not part of the choices', () => {
      beforeEach(() => {
        component.selected = 'blarg'
      })
      it('selects the first choice', () => {
        expect(component.selectedChoice).toEqual({ label: 'A', value: 'a' })
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
          }) as any
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
        expect(component.overlayMaxHeight).toMatch('350px')
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
})
