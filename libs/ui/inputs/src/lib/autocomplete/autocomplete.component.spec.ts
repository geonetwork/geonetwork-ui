import { ChangeDetectionStrategy, ElementRef } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of, Subscription, throwError } from 'rxjs'
import {
  AutocompleteComponent,
  AutocompleteItem,
} from './autocomplete.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent
  let fixture: ComponentFixture<AutocompleteComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [provideI18n()],
    })
      .overrideComponent(AutocompleteComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    jest.useFakeTimers()
    fixture = TestBed.createComponent(AutocompleteComponent)
    component = fixture.componentInstance
    component.action = jest.fn(() => of(['aa', 'bb', 'cc']))
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('suggestions', () => {
    let emitted: unknown
    let sub: Subscription
    describe('with minCharacterCount above 0', () => {
      beforeEach(() => {
        fixture.detectChanges()
        emitted = null
        sub = component.suggestions$.subscribe((e) => (emitted = e))
      })
      afterEach(() => {
        sub.unsubscribe()
      })
      describe('when writing text over 2 chars', () => {
        beforeEach(() => {
          component.inputRef.nativeElement.value = 'bla'
          component.inputRef.nativeElement.dispatchEvent(
            new InputEvent('input')
          )
        })
        it('calls the action given as input after debounce', () => {
          jest.runOnlyPendingTimers()
          expect(component.action).toHaveBeenCalledWith('bla')
        })
        it('emits suggestions', () => {
          jest.runOnlyPendingTimers()
          expect(emitted).toEqual(['aa', 'bb', 'cc'])
        })
        it('does not show an error popup', () => {
          const popup = fixture.debugElement.query(By.css('gn-ui-popup-alert'))
          expect(popup).toBeFalsy()
        })
      })
      describe('when clicking a predefined button', () => {
        beforeEach(() => {
          component.updateInputValue({ title: 'cc' } as AutocompleteItem)
        })
        it('calls the action with object given as input', () => {
          expect(component.action).toHaveBeenCalledWith('cc')
        })
      })
      describe('when writing text with 2 chars or less', () => {
        beforeEach(() => {
          component.inputRef.nativeElement.value = 'bl'
          component.inputRef.nativeElement.dispatchEvent(
            new InputEvent('input')
          )
        })
        it('does not call the action given as input after debounce', () => {
          jest.runOnlyPendingTimers()
          expect(component.action).not.toHaveBeenCalled()
        })
        it('emit an empty suggestions list', () => {
          jest.runOnlyPendingTimers()
          expect(emitted).toEqual([])
        })
      })
    })
    describe('when minCharacterCount is 0', () => {
      beforeEach(() => {
        component.minCharacterCount = 0
        fixture.detectChanges()
        emitted = null
        sub = component.suggestions$.subscribe((e) => (emitted = e))
        component.inputRef.nativeElement.value = ''
        component.inputRef.nativeElement.dispatchEvent(new InputEvent('focus'))
      })
      it('calls action and shows suggestions on focus', () => {
        jest.runOnlyPendingTimers()
        expect(component.action).toHaveBeenCalled()
      })
      it('emits suggestions', () => {
        jest.runOnlyPendingTimers()
        expect(emitted).toEqual(['aa', 'bb', 'cc'])
      })
    })
  })

  describe('clear button', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })
    describe('when input is empty', () => {
      beforeEach(() => {
        component.inputRef.nativeElement.value = ''
        component.inputRef.nativeElement.dispatchEvent(new InputEvent('input'))
        fixture.detectChanges()
      })
      it('is not visible', () => {
        expect(
          fixture.debugElement.query(By.css('[data-test=clear-btn] button'))
        ).toBeNull()
      })
    })
    describe('when input is not empty', () => {
      let anyEmitted: boolean
      let clearEmitted: boolean
      let button
      beforeEach(() => {
        anyEmitted = false
        clearEmitted = false
        component.inputRef.nativeElement.value = 'blar'
        component.inputRef.nativeElement.dispatchEvent(new InputEvent('input'))
        component.triggerRef.closePanel = jest.fn()
        component.inputSubmitted.subscribe(() => (anyEmitted = true))
        component.inputCleared.subscribe(() => (clearEmitted = true))
        fixture.detectChanges()
        button = fixture.debugElement.query(
          By.css('[data-test=clear-btn] button')
        )
        button.nativeElement.click()
      })
      it('is visible', () => {
        expect(button).not.toBeNull()
      })
      it('resets the text input', () => {
        expect(component.inputRef.nativeElement.value).toBe('')
      })
      it('sets the text input of the focus', () => {
        expect(document.activeElement).toBe(component.inputRef.nativeElement)
      })
      it('closes the autocomplete panel', () => {
        expect(component.triggerRef.closePanel).toHaveBeenCalled()
      })
      it('does not emit an inputSubmitted event', () => {
        expect(anyEmitted).toEqual(false)
      })
      it('emits an inputCleared event', () => {
        expect(clearEmitted).toEqual(true)
      })
    })
  })

  describe('search button', () => {
    let anyEmitted
    beforeEach(() => {
      anyEmitted = []
      component.allowSubmit = true
      component.cancelEnter = false
    })
    describe('with a text value', () => {
      beforeEach(() => {
        fixture.detectChanges()
        component.triggerRef.closePanel = jest.fn()
        component.inputSubmitted.subscribe((event) => anyEmitted.push(event))
        component.inputRef.nativeElement.value = 'bla'
        const button = fixture.debugElement.query(
          By.css('[data-test=autocomplete-submit-btn] button')
        )
        button.nativeElement.click()
      })
      it('sends a submitted value', () => {
        expect(anyEmitted).toEqual(['bla'])
      })
    })
    describe('with an empty text value', () => {
      beforeEach(() => {
        fixture.detectChanges()
        component.inputSubmitted.subscribe((event) => anyEmitted.push(event))
        component.inputRef.nativeElement.value = ''
        const button = fixture.debugElement.query(
          By.css('[data-test=autocomplete-submit-btn] button')
        )
        button.nativeElement.click()
      })
      it('sends an empty value', () => {
        expect(anyEmitted).toEqual([''])
      })
    })
    describe('allowSubmit is false', () => {
      let emitted
      beforeEach(() => {
        component.allowSubmit = false
        fixture.detectChanges()
        emitted = null
        component.cancelEnter = false
        component.inputSubmitted.subscribe((e) => (emitted = e))
        component.inputRef.nativeElement.value = 'blarg'
        component.inputRef.nativeElement.dispatchEvent(
          new KeyboardEvent('keyup', {
            key: 'Enter',
            bubbles: true,
          })
        )
      })
      it('does not show a submit button', () => {
        const button = fixture.debugElement.query(
          By.css('[data-test=autocomplete-submit-btn] button')
        )
        expect(button).toBeFalsy()
      })
      it('does not emit inputSubmitted on enter', () => {
        expect(emitted).toBeNull()
      })
    })
  })

  describe('@Input() value', () => {
    describe('when set', () => {
      beforeEach(() => {
        const simpleChanges: any = {
          value: {
            previousValue: undefined,
            currentValue: { title: 'hello' },
          },
        }
        component.displayWithFn = (item) => item.title
        component.ngOnChanges(simpleChanges)
      })
      it('set control value', () => {
        expect(component.control.value).toEqual({ title: 'hello' })
      })
    })
    describe('when changed', () => {
      beforeEach(() => {
        const simpleChanges: any = {
          value: {
            previousValue: { title: 'hello' },
            currentValue: { title: 'good bye' },
          },
        }
        component.displayWithFn = (item) => item.title
        component.ngOnChanges(simpleChanges)
      })
      it('set control value', () => {
        expect(component.control.value).toEqual({ title: 'good bye' })
      })
    })
    describe('when ref changed but same text', () => {
      let anyEmitted
      beforeEach(() => {
        const simpleChanges: any = {
          value: {
            previousValue: { title: 'good bye' },
            currentValue: { title: 'good bye' },
          },
        }
        component.displayWithFn = (item) => item.title
        component.inputSubmitted.subscribe((event) => (anyEmitted = event))
        component.ngOnChanges(simpleChanges)
      })
      it('does not set control value', () => {
        expect(component.control.value).toBeNull()
      })
      it('does not emit any value', () => {
        expect(anyEmitted).toBeUndefined()
      })
    })
    describe('when not set on init (firstChange == true)', () => {
      beforeEach(() => {
        const simpleChanges: any = {
          value: {
            firstChange: true,
            previousValue: undefined,
            currentValue: null,
          },
        }
        component.ngOnChanges(simpleChanges)
      })
      it('does not set control value', () => {
        expect(component.control.value).toEqual(null)
      })
    })
  })

  describe('#handleSelection', () => {
    let selectionEmitted
    const selectionEvent: any = {
      option: {
        value: 'first',
      },
    }
    describe('when true', () => {
      beforeEach(() => {
        component.itemSelected.subscribe((event) => (selectionEmitted = event))
        fixture.detectChanges()
        component.handleSelection(selectionEvent)
      })
      it('set cancelEnter to true', () => {
        expect(component.cancelEnter).toBe(true)
      })
      it('emits selection event', () => {
        expect(selectionEmitted).toEqual('first')
      })
      describe('if preventCompleteOnSelection on selection', () => {
        it('set input value to last entered text', () => {
          component.clearOnSelection = false
          component.preventCompleteOnSelection = true

          component.control.setValue('second')
          component.handleSelection(selectionEvent)
          expect(component.inputRef.nativeElement.value).toEqual('second')
          component.control.setValue({ title: 'third' })
          component.handleSelection(selectionEvent)
          expect(component.inputRef.nativeElement.value).toEqual('second')
        })
      })
      describe('if clearOnSelection on selection', () => {
        it('set input value to empty string', () => {
          component.clearOnSelection = true
          component.preventCompleteOnSelection = false

          component.control.setValue('second')
          component.handleSelection(selectionEvent)
          expect(component.inputRef.nativeElement.value).toEqual('')
        })
      })
    })
  })

  describe('when autocomplete action throws an error', () => {
    let suggestions
    beforeEach(() => {
      suggestions = null
      component.action = jest.fn(() => throwError(() => new Error('blargz')))
      fixture.detectChanges()
      component.suggestions$.subscribe((value) => (suggestions = value))

      component.inputRef.nativeElement.value = 'bla'
      component.inputRef.nativeElement.dispatchEvent(new InputEvent('input'))
      jest.runOnlyPendingTimers()
      fixture.detectChanges()
    })
    it('shows an error popup', () => {
      const popup = fixture.debugElement.query(By.css('gn-ui-popup-alert'))
      expect(popup).toBeTruthy()
      expect(popup.nativeElement.textContent).toContain('blargz')
    })
    it('emits an empty suggestions list', () => {
      expect(suggestions).toEqual([])
    })
  })

  describe('when tracking is activated', () => {
    beforeEach(() => {
      component.inputRef = new ElementRef(document.createElement('input'))
      component.triggerRef = {
        panelOpen: true,
        updatePosition: jest.fn(),
      } as unknown as MatAutocompleteTrigger
      fixture.detectChanges()
    })

    it('starts the tracking position and redraw', () => {
      jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(() => 1519211809934)
      jest.spyOn(component.triggerRef, 'updatePosition')

      component.forceTrackPosition = true
      component.startTrackingPosition()

      expect(window.requestAnimationFrame).toHaveBeenCalledWith(
        expect.any(Function)
      )
      expect(component.triggerRef.updatePosition).not.toHaveBeenCalled()
    })
  })

  describe('when tracking is disabled', () => {
    beforeEach(() => {
      component.inputRef = new ElementRef(document.createElement('input'))
      component.triggerRef = {
        panelOpen: true,
        updatePosition: jest.fn(),
      } as unknown as MatAutocompleteTrigger
      fixture.detectChanges()
    })

    it('tracking is not called', () => {
      jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(() => 1519211809934)
      jest.spyOn(component.triggerRef, 'updatePosition')

      component.forceTrackPosition = false
      component.startTrackingPosition()

      expect(window.requestAnimationFrame).not.toHaveBeenCalledWith()
      expect(component.triggerRef.updatePosition).not.toHaveBeenCalled()
    })
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
})
