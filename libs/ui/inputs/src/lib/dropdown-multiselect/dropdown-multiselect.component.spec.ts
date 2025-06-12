import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DropdownMultiselectComponent } from './dropdown-multiselect.component'
import { By } from '@angular/platform-browser'
import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { ButtonComponent } from '../button/button.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('DropdownMultiselectComponent', () => {
  let component: DropdownMultiselectComponent
  let fixture: ComponentFixture<DropdownMultiselectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
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

  describe('keyboard events', () => {
    let triggerBtn: HTMLElement

    async function dispatchEvent(el: HTMLElement, code: string) {
      el.dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          code,
        })
      )
      fixture.detectChanges()
      await Promise.resolve() // this makes sure that the overlay was updated
    }

    const getCheckboxes = () =>
      component.checkboxes.map((de) => de.nativeElement) as HTMLInputElement[]
    const getOverlay = () =>
      document.querySelector('.overlay-container') as HTMLElement

    beforeEach(() => {
      component.choices = [
        { label: 'First Choice', value: 'choice1' },
        { label: 'Second Choice', value: 'choice2' },
        { label: 'Third Choice', value: 'choice3' },
      ]
      triggerBtn = fixture.debugElement.query(
        By.directive(ButtonComponent)
      ).nativeElement
    })
    describe('when overlay is closed', () => {
      beforeEach(() => {
        component.overlayOpen = false
      })
      describe('right/down arrow, enter, space', () => {
        describe('opens the overlay and sets the focus on the first element', () => {
          it('right', async () => {
            await dispatchEvent(triggerBtn, 'ArrowRight')
            expect(component.overlayOpen).toBe(true)
            expect(getCheckboxes()[0]).toBe(document.activeElement)
          })
          it('down', async () => {
            await dispatchEvent(triggerBtn, 'ArrowDown')
            expect(component.overlayOpen).toBe(true)
            expect(getCheckboxes()[0]).toBe(document.activeElement)
          })
        })
      })
      describe('up/left arrow', () => {
        describe('opens the overlay and sets the focus on the last element', () => {
          it('up', async () => {
            await dispatchEvent(triggerBtn, 'ArrowUp')
            expect(component.overlayOpen).toBe(true)
            const checkboxes = getCheckboxes()
            expect(checkboxes[checkboxes.length - 1]).toBe(
              document.activeElement
            )
          })
          it('left', async () => {
            await dispatchEvent(triggerBtn, 'ArrowLeft')
            expect(component.overlayOpen).toBe(true)
            const checkboxes = getCheckboxes()
            expect(checkboxes[checkboxes.length - 1]).toBe(
              document.activeElement
            )
          })
        })
      })
    })
    describe('when overlay is open', () => {
      beforeEach(() => {
        component.openOverlay()
        fixture.detectChanges()
        component.focusFirstItem()
      })
      describe('right/down arrow', () => {
        describe('jumps to next element', () => {
          it('right', async () => {
            await dispatchEvent(getOverlay(), 'ArrowRight')
            expect(getCheckboxes()[1]).toBe(document.activeElement)
          })
          it('down', async () => {
            await dispatchEvent(getOverlay(), 'ArrowDown')
            expect(getCheckboxes()[1]).toBe(document.activeElement)
          })
        })
      })
      describe('up/left arrow', () => {
        describe('jump to previous element', () => {
          it('up', async () => {
            await dispatchEvent(getOverlay(), 'ArrowUp')
            expect(getCheckboxes()[2]).toBe(document.activeElement)
          })
          it('left', async () => {
            await dispatchEvent(getOverlay(), 'ArrowLeft')
            expect(getCheckboxes()[2]).toBe(document.activeElement)
          })
        })
      })
      describe('escape', () => {
        it('closes overlay', async () => {
          await dispatchEvent(getOverlay(), 'Escape')
          expect(component.overlayOpen).toBe(false)
        })
      })
    })
  })

  describe('clear button', () => {
    beforeEach(() => {
      component.choices = [
        { label: 'First Choice', value: 'choice1' },
        { label: 'Second Choice', value: 'choice2' },
        { label: 'Third Choice', value: 'choice3' },
      ]
    })
    describe('when no item selected', () => {
      it('is not displayed', () => {
        const clearBtn = fixture.debugElement.query(By.css('.clear-btn'))
        expect(clearBtn).toBeFalsy()
      })
    })
    describe('when items are selected', () => {
      beforeEach(() => {
        component.selected = ['choice2']
        fixture.detectChanges()
      })
      it('is displayed', () => {
        const clearBtn = fixture.debugElement.query(By.css('.clear-btn'))
        expect(clearBtn).toBeTruthy()
      })
    })
    describe('on click', () => {
      beforeEach(() => {
        component.selected = ['choice2']
        jest.spyOn(component.selectValues, 'emit')
        fixture.detectChanges()
        const clearBtn = fixture.debugElement.query(By.css('.clear-btn'))
        clearBtn.nativeElement.click()
      })
      it('is displayed', () => {
        expect(component.selectValues.emit).toHaveBeenCalledWith([])
      })
    })
  })
  describe('search', () => {
    const getOverlay = () =>
      document.querySelector('.overlay-container') as HTMLElement
    const getOverlaySearchInput = () =>
      document.querySelector('.overlaySearchInput') as HTMLElement

    beforeEach(() => {
      component.choices = [
        { label: 'First Choice', value: 'choice1' },
        { label: 'Second Choice', value: 'choice2' },
        { label: 'Third Choice', value: 'choice3' },
      ]
      component.openOverlay()
      fixture.detectChanges()
    })

    describe('no text input filter', () => {
      it('displays all choices', () => {
        expect(component.filteredChoicesByText.length).toBe(3)
      })
      it('search field is focused', () => {
        expect(getOverlaySearchInput().classList).toContain(
          'overlaySearchInput'
        )
      })
      it('overlay is on top', () => {
        expect(getOverlay().offsetTop).toBe(0)
      })
    })

    describe('with matching text input filter', () => {
      it('displays matching choices', () => {
        component.searchInputValue = 'Sec'
        expect(component.filteredChoicesByText.length).toBe(1)
        expect(component.filteredChoicesByText).toContain(component.choices[1])
      })
      it('displays matching choices case insensitive', () => {
        component.searchInputValue = 'SEC'
        expect(component.filteredChoicesByText.length).toBe(1)
        expect(component.filteredChoicesByText).toContain(component.choices[1])
      })
    })

    describe('with not matching text input filter', () => {
      it('displays no choices', () => {
        component.searchInputValue = 'XYZ'
        expect(component.filteredChoicesByText.length).toBe(0)
      })
    })

    describe('clearing the filter with x', () => {
      beforeEach(() => {
        component.searchInputValue = 'XYZ'
        fixture.detectChanges()
        const clearBtn = fixture.debugElement.query(
          By.css('.clear-search-input')
        )
        clearBtn.nativeElement.click()
      })

      it('displays all choices', () => {
        expect(component.filteredChoicesByText.length).toBe(3)
      })
    })
  })
})
