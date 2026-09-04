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
      component.dateRange = { start: new Date('2024-01-15') }
      expect(component.selectedDatesCount).toBe(1)
    })
    it('is two for a closed interval', () => {
      component.dateRange = {
        start: new Date('2024-01-15'),
        end: new Date('2024-03-28'),
      }
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

  describe('setting dates independently', () => {
    let dateRangeChange: jest.Mock

    beforeEach(() => {
      dateRangeChange = jest.fn()
      component.dateRangeChange.subscribe(dateRangeChange)
    })

    it('emits a range with only the start date, then moves on to the end bound', () => {
      const start = new Date('2024-01-15')

      component.setStartDate(start)

      expect(dateRangeChange).toHaveBeenCalledWith({ start })
      expect(component.dateRange).toEqual({ start })
      expect(component.expandedBound).toBe('end')
    })
    it('emits a range with only the end date, no start date required', () => {
      const end = new Date('2024-03-28')

      component.setEndDate(end)

      expect(dateRangeChange).toHaveBeenCalledWith({ end })
      expect(component.dateRange).toEqual({ end })
      expect(component.expandedBound).toBe(null)
    })
    it('keeps the other bound when a range is completed', () => {
      const start = new Date('2024-01-15')
      const end = new Date('2024-03-28')

      component.setStartDate(start)
      component.setEndDate(end)

      expect(dateRangeChange).toHaveBeenLastCalledWith({ start, end })
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
      component.dateRange = { start: new Date(2024, 0, 15) }
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
      const dateRangeChange = jest.fn()
      component.dateRangeChange.subscribe(dateRangeChange)

      type(endInput(), asTyped(new Date(2024, 2, 28)))

      expect(dateRangeChange).toHaveBeenCalledWith({
        start: new Date(2024, 0, 15),
        end: new Date(2024, 2, 28),
      })
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
      const dateRangeChange = jest.fn()
      component.dateRangeChange.subscribe(dateRangeChange)

      type(startInput(), '')

      expect(dateRangeChange).toHaveBeenCalledWith({})
      expect(component.selectedDatesCount).toBe(0)
    })
    it('flags unreadable text without touching the applied range', () => {
      const dateRangeChange = jest.fn()
      component.dateRangeChange.subscribe(dateRangeChange)

      type(startInput(), 'not a date')

      expect(dateRangeChange).not.toHaveBeenCalled()
      expect(component.dateRange).toEqual({ start: new Date(2024, 0, 15) })
      expect(component.invalidBounds.start).toBe(true)
      fixture.detectChanges()
      expect(startInput().getAttribute('aria-invalid')).toBe('true')
    })
    it('rejects a typed bound that would cross the other one', () => {
      component.dateRange = {
        ...component.dateRange,
        end: new Date(2024, 2, 28),
      }
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
      const dateRangeChange = jest.fn()
      component.dateRangeChange.subscribe(dateRangeChange)
      component.dateRange = {
        start: new Date('2024-01-15'),
        end: new Date('2024-03-28'),
      }

      component.clearDates(new MouseEvent('click'))

      expect(component.dateRange).toEqual({})
      expect(component.selectedDatesCount).toBe(0)
      expect(component.expandedBound).toBe('start')
      expect(dateRangeChange).toHaveBeenCalledWith({})
    })
    it('does not open the dropdown when the clear icon is clicked', () => {
      component.dateRange = { start: new Date('2024-01-15') }
      fixture.detectChanges()
      const clearIcon = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('[data-test="dropdown-clear"] ng-icon')

      clearIcon.click()
      fixture.detectChanges()

      expect(component.dateRange).toEqual({})
      // the click must not reach the enclosing gn-ui-button
      expect(component.overlayOpen).toBe(false)
    })
  })

  it('parses typed dates with the localized adapter, not Date.parse', () => {
    expect(fixture.debugElement.injector.get(DateAdapter)).toBeInstanceOf(
      DateFnsAdapter
    )
  })
})
