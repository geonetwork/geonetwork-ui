import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core'
import { DateFnsAdapter } from '@angular/material-date-fns-adapter'
import { type Locale } from 'date-fns/locale'
import { fr } from 'date-fns/locale/fr'
import { provideI18n } from '@geonetwork-ui/util/i18n'

import { DateRangeDropdownComponent } from './date-range-dropdown.component'

describe('DateRangeDropdownComponent', () => {
  let component: DateRangeDropdownComponent
  let fixture: ComponentFixture<DateRangeDropdownComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangeDropdownComponent],
      providers: [provideI18n()],
    })
      .overrideComponent(DateRangeDropdownComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(DateRangeDropdownComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('selected dates count', () => {
    it('is zero when no bound is set', () => {
      expect(component.selectedDatesCount).toBe(0)
    })
    it('is one for an open interval', () => {
      component.startDate = new Date('2024-01-15')
      expect(component.selectedDatesCount).toBe(1)
    })
    it('is two for a closed interval', () => {
      component.startDate = new Date('2024-01-15')
      component.endDate = new Date('2024-03-28')
      expect(component.selectedDatesCount).toBe(2)
    })
  })

  describe('expanding a bound', () => {
    it('expands the start bound when opening the dropdown', () => {
      component.openOverlay()
      expect(component.overlayOpen).toBe(true)
      expect(component.expandedBound).toBe('start')
    })
    it('collapses a bound that is already expanded', () => {
      component.expandedBound = 'end'
      component.toggleBound('end')
      expect(component.expandedBound).toBe(null)
    })
    it('switches to the other bound', () => {
      component.expandedBound = 'start'
      component.toggleBound('end')
      expect(component.expandedBound).toBe('end')
    })
  })

  describe('selecting dates independently', () => {
    it('emits the start date and moves on to the end bound', () => {
      const startDateChange = jest.fn()
      component.startDateChange.subscribe(startDateChange)
      const start = new Date('2024-01-15')

      component.selectStartDate(start)

      expect(startDateChange).toHaveBeenCalledWith(start)
      expect(component.startDate).toBe(start)
      expect(component.endDate).toBeUndefined()
      expect(component.expandedBound).toBe('end')
    })
    it('emits the end date without requiring a start date', () => {
      const endDateChange = jest.fn()
      component.endDateChange.subscribe(endDateChange)
      const end = new Date('2024-03-28')

      component.selectEndDate(end)

      expect(endDateChange).toHaveBeenCalledWith(end)
      expect(component.endDate).toBe(end)
      expect(component.startDate).toBeUndefined()
      expect(component.expandedBound).toBe(null)
    })
  })

  describe('the dropdown panel', () => {
    let panel: Element
    const startInput = () =>
      panel.querySelector<HTMLInputElement>('[data-test="start-date-input"]')
    const endInput = () =>
      panel.querySelector<HTMLInputElement>('[data-test="end-date-input"]')
    /**
     * Renders a date the way the inputs do. The date-fns adapter is provided by
     * the component itself, so it comes from its injector, not the TestBed one.
     */
    const asTyped = (date: Date) => {
      const injector = fixture.debugElement.injector
      const adapter = injector.get<DateAdapter<Date>>(DateAdapter)
      const formats = injector.get<MatDateFormats>(MAT_DATE_FORMATS)
      return adapter.format(date, formats.display.dateInput)
    }
    /** the component reads the field on `change`, i.e. on blur or Enter */
    const type = (input: HTMLInputElement, value: string) => {
      input.value = value
      input.dispatchEvent(new Event('change'))
    }
    const leave = (input: HTMLInputElement) =>
      input.dispatchEvent(new Event('blur'))

    beforeEach(() => {
      // local, not UTC: the input value is the local calendar day
      component.startDate = new Date(2024, 0, 15)
      component.openOverlay()
      fixture.detectChanges()
      panel = document.querySelector('[data-test="date-range-panel"]')
    })
    afterEach(() => {
      component.closeOverlay()
      fixture.detectChanges()
    })

    it('shows a text input per bound, only the set one holding a value', () => {
      expect(panel).toBeTruthy()
      // a text input, so that no browser contributes its own calendar picker
      expect(startInput().type).toBe('text')
      expect(startInput().value).toBe(asTyped(new Date(2024, 0, 15)))
      expect(endInput().value).toBe('')
    })
    it('applies a date typed into an input', () => {
      const endDateChange = jest.fn()
      component.endDateChange.subscribe(endDateChange)

      type(endInput(), asTyped(new Date(2024, 2, 28)))

      expect(endDateChange).toHaveBeenCalledWith(new Date(2024, 2, 28))
      expect(component.invalidBounds.end).toBe(false)
      // typing must not fold the accordion away while the field is being edited
      expect(component.expandedBound).toBe('start')
    })
    it('rewrites an accepted date in canonical form when the field is left', () => {
      // a padless day/month is accepted, then normalised on blur
      const canonical = asTyped(new Date(2024, 2, 8))
      const sloppy = canonical.replace(/\b0(\d)/g, '$1')
      // guards the test against a locale format that has no leading zeros
      expect(sloppy).not.toBe(canonical)
      type(endInput(), sloppy)
      leave(endInput())

      expect(component.endDate).toEqual(new Date(2024, 2, 8))
      expect(endInput().value).toBe(canonical)
    })
    it('leaves refused text as typed when the field is left', () => {
      type(startInput(), 'not a date')
      leave(startInput())

      expect(startInput().value).toBe('not a date')
      expect(component.invalidBounds.start).toBe(true)
    })
    it('drops the bound when an input is emptied', () => {
      const startDateChange = jest.fn()
      component.startDateChange.subscribe(startDateChange)

      type(startInput(), '')

      expect(startDateChange).toHaveBeenCalledWith(null)
      expect(component.selectedDatesCount).toBe(0)
    })
    it('flags unreadable text without touching the applied range', () => {
      const startDateChange = jest.fn()
      component.startDateChange.subscribe(startDateChange)

      type(startInput(), 'not a date')

      expect(startDateChange).not.toHaveBeenCalled()
      expect(component.startDate).toEqual(new Date(2024, 0, 15))
      expect(component.invalidBounds.start).toBe(true)
      fixture.detectChanges()
      expect(startInput().getAttribute('aria-invalid')).toBe('true')
    })
    it('rejects a typed bound that would cross the other one', () => {
      component.endDate = new Date(2024, 2, 28)
      fixture.detectChanges()

      type(startInput(), asTyped(new Date(2024, 5, 1)))

      expect(component.startDate).toEqual(new Date(2024, 0, 15))
      expect(component.invalidBounds.start).toBe(true)
    })
    it('redraws the fields when the lazily loaded locale reaches the adapter', () => {
      const adapter =
        fixture.debugElement.injector.get<DateAdapter<Date, Locale>>(
          DateAdapter
        )
      expect(startInput().value).toBe('01/15/2024')

      adapter.setLocale(fr)
      fixture.detectChanges()

      expect(startInput().value).toBe('15/01/2024')
    })
    it('sizes its icons itself, with no ancestor ng-icons config', () => {
      // otherwise they inherit whatever the host app configures, which differs
      // between apps and is absent in storybook
      const icons = [
        ...Array.from(
          (fixture.nativeElement as HTMLElement).querySelectorAll('ng-icon')
        ),
        ...Array.from(panel.querySelectorAll('ng-icon')),
      ] as HTMLElement[]

      expect(icons.length).toBeGreaterThan(3)
      icons.forEach((icon) =>
        expect(icon.style.getPropertyValue('--ng-icon__size')).toBe('1.5rem')
      )
    })
    it('only unfolds the calendar of the expanded bound', () => {
      expect(
        panel.querySelector('[data-test="start-date-calendar"]')
      ).toBeTruthy()
      expect(panel.querySelector('[data-test="end-date-calendar"]')).toBeFalsy()
    })
    it('unfolds the other calendar when the bound is toggled', () => {
      component.toggleBound('end')
      fixture.detectChanges()
      expect(
        panel.querySelector('[data-test="start-date-calendar"]')
      ).toBeFalsy()
      expect(
        panel.querySelector('[data-test="end-date-calendar"]')
      ).toBeTruthy()
    })
  })

  describe('clearing the range', () => {
    it('resets both bounds and notifies the parent', () => {
      const dateRangeClear = jest.fn()
      component.dateRangeClear.subscribe(dateRangeClear)
      component.startDate = new Date('2024-01-15')
      component.endDate = new Date('2024-03-28')

      component.clearDates(new MouseEvent('click'))

      expect(component.startDate).toBe(null)
      expect(component.endDate).toBe(null)
      expect(component.selectedDatesCount).toBe(0)
      expect(component.expandedBound).toBe('start')
      expect(dateRangeClear).toHaveBeenCalled()
    })
  })

  it('parses typed dates with the localized adapter, not Date.parse', () => {
    expect(fixture.debugElement.injector.get(DateAdapter)).toBeInstanceOf(
      DateFnsAdapter
    )
  })
})
