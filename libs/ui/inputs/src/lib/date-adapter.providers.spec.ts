import { TestBed } from '@angular/core/testing'
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core'
import { DateFnsAdapter } from '@angular/material-date-fns-adapter'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { type Locale } from 'date-fns/locale'
import { fr } from 'date-fns/locale/fr'
import { enUS } from 'date-fns/locale/en-US'

import { provideLocalizedDateAdapter } from './date-adapter.providers'

describe('provideLocalizedDateAdapter', () => {
  let adapter: DateAdapter<Date, Locale>
  let formats: MatDateFormats

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideI18n(), provideLocalizedDateAdapter()],
    })
    adapter = TestBed.inject<DateAdapter<Date, Locale>>(DateAdapter)
    formats = TestBed.inject<MatDateFormats>(MAT_DATE_FORMATS)
  })

  it('installs the date-fns adapter, not the native one', () => {
    expect(adapter).toBeInstanceOf(DateFnsAdapter)
  })

  it('uses pattern-based formats, so a parse format exists at all', () => {
    // MAT_NATIVE_DATE_FORMATS.parse.dateInput is null: the native adapter has
    // no way to parse a typed date
    expect(formats.parse.dateInput).toBeTruthy()
  })

  describe('parsing a typed date', () => {
    it('reads a day-first locale as day-first', () => {
      adapter.setLocale(fr)
      expect(adapter.parse('05/08/2026', formats.parse.dateInput)).toEqual(
        new Date(2026, 7, 5)
      )
    })

    it('accepts a day above 12, which Date.parse rejects', () => {
      adapter.setLocale(fr)
      expect(Number.isNaN(Date.parse('13/08/2026'))).toBe(true)
      expect(adapter.parse('13/08/2026', formats.parse.dateInput)).toEqual(
        new Date(2026, 7, 13)
      )
    })

    it('reads a month-first locale as month-first', () => {
      adapter.setLocale(enUS)
      expect(adapter.parse('05/08/2026', formats.parse.dateInput)).toEqual(
        new Date(2026, 4, 8)
      )
    })

    it('refuses a format the locale does not use', () => {
      adapter.setLocale(fr)
      const parsed = adapter.parse('05-08-2026', formats.parse.dateInput)
      expect(adapter.isValid(parsed)).toBe(false)
    })
  })

  it('formats in the locale short form', () => {
    adapter.setLocale(fr)
    expect(
      adapter.format(new Date(2026, 7, 5), formats.display.dateInput)
    ).toBe('05/08/2026')
  })
})
