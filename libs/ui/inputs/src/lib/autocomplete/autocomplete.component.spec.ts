import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatIconModule } from '@angular/material/icon'
import { By } from '@angular/platform-browser'
import { of, throwError } from 'rxjs'
import {
  AutocompleteComponent,
  AutocompleteItem,
} from './autocomplete.component'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent
  let fixture: ComponentFixture<AutocompleteComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatIconModule,
        UiWidgetsModule,
      ],
      declarations: [AutocompleteComponent],
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
    let emitted
    let sub
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
        component.inputRef.nativeElement.dispatchEvent(new InputEvent('input'))
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
        component.inputRef.nativeElement.dispatchEvent(new InputEvent('input'))
      })
      it('does not call the action given as input after debounce', () => {
        jest.runOnlyPendingTimers()
        expect(component.action).not.toHaveBeenCalled()
      })
      it('does not emit', () => {
        jest.runOnlyPendingTimers()
        expect(emitted).toEqual(null)
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
        expect(fixture.debugElement.query(By.css('.clear-btn'))).toBeNull()
      })
    })
    describe('when input is not empty', () => {
      let anyEmitted
      let button
      beforeEach(() => {
        component.inputRef.nativeElement.value = 'blar'
        component.inputRef.nativeElement.dispatchEvent(new InputEvent('input'))
        component.triggerRef.closePanel = jest.fn()
        component.inputSubmitted.subscribe((event) => (anyEmitted = event))
        fixture.detectChanges()
        button = fixture.debugElement.query(By.css('.clear-btn'))
      })
      it('is visible', () => {
        expect(button).not.toBeNull()
      })
      it('resets the text input', () => {
        button.nativeElement.click()
        expect(component.inputRef.nativeElement.value).toBe('')
      })
      it('sets the text input of the focus', () => {
        button.nativeElement.click()
        expect(document.activeElement).toBe(component.inputRef.nativeElement)
      })
      it('closes the autocomplete panel', () => {
        button.nativeElement.click()
        expect(component.triggerRef.closePanel).toHaveBeenCalled()
      })
      it('clears search result by emitting empty string', () => {
        button.nativeElement.click()
        expect(anyEmitted).toEqual('')
      })
    })
  })

  describe('search button', () => {
    let anyEmitted
    beforeEach(() => {
      anyEmitted = []
    })
    describe('with a text value', () => {
      beforeEach(() => {
        fixture.detectChanges()
        component.triggerRef.closePanel = jest.fn()
        component.inputSubmitted.subscribe((event) => anyEmitted.push(event))
        component.inputRef.nativeElement.value = 'bla'
        const button = fixture.debugElement.query(By.css('.search-btn'))
        button.nativeElement.click()
      })
      it('sends a submitted value', () => {
        expect(anyEmitted).toEqual(['bla'])
      })
      it('closes the autocomplete panel', () => {
        expect(component.triggerRef.closePanel).toHaveBeenCalled()
      })
    })
    describe('with an empty text value', () => {
      beforeEach(() => {
        fixture.detectChanges()
        component.inputSubmitted.subscribe((event) => anyEmitted.push(event))
        component.inputRef.nativeElement.value = ''
        const button = fixture.debugElement.query(By.css('.search-btn'))
        button.nativeElement.click()
      })
      it('sends an empty value', () => {
        expect(anyEmitted).toEqual([''])
      })
    })
  })

  describe('@Input() value', () => {
    let anyEmitted
    describe('when set', () => {
      beforeEach(() => {
        const simpleChanges: any = {
          value: {
            previousValue: undefined,
            currentValue: { title: 'hello' },
          },
        }
        component.displayWithFn = (item) => item?.title
        component.inputSubmitted.subscribe((event) => (anyEmitted = event))
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
        component.displayWithFn = (item) => item?.title
        component.inputSubmitted.subscribe((event) => (anyEmitted = event))
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
        component.displayWithFn = (item) => item?.title
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
        component.inputSubmitted.subscribe((event) => (anyEmitted = event))
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
        component.clearOnSelection = true
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
      describe('if clear on selection', () => {
        it('set input value to last entered text', () => {
          component.control.setValue('second')
          component.handleSelection(selectionEvent)
          expect(component.inputRef.nativeElement.value).toEqual('second')
          component.control.setValue({ title: 'third' })
          component.handleSelection(selectionEvent)
          expect(component.inputRef.nativeElement.value).toEqual('second')
        })
      })
    })
  })

  describe('when autocomplete action throws an error', () => {
    let suggestions
    beforeEach(() => {
      suggestions = null
      component.action = jest.fn(() => throwError(new Error('blargz')))
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

  afterEach(() => {
    jest.clearAllTimers()
  })
})
