import { inject, Provider } from '@angular/core'
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core'
import {
  DateFnsAdapter,
  MAT_DATE_FNS_FORMATS,
} from '@angular/material-date-fns-adapter'
import { enUS } from 'date-fns/locale/en-US'
import { DateService } from '@geonetwork-ui/util/shared'

/**
 * Angular Material's date adapter, localized from the current UI language.
 *
 * `NativeDateAdapter` must not be used by any field the user can type into: its
 * `parse()` ignores both the parse format and the locale and falls back to
 * `Date.parse`, which reads 05/08/2026 as May 8th whatever the language, and
 * rejects 13/08/2026 outright. `MAT_NATIVE_DATE_FORMATS.parse.dateInput` is
 * `null` for that very reason.
 *
 * The date-fns locales are a lazily loaded chunk, so the adapter is seeded with
 * en-US and switches over once the real locale resolves. Material's own date
 * inputs and calendars redraw themselves on `DateAdapter.localeChanges`;
 * components that format dates by hand should subscribe to it as well.
 */
export function provideLocalizedDateAdapter(): Provider[] {
  return [
    { provide: MAT_DATE_LOCALE, useValue: enUS },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
    {
      provide: DateAdapter,
      useFactory: () => {
        const dateService = inject(DateService)
        const adapter = new DateFnsAdapter()
        dateService
          .getDateFnsLocale()
          .then((locale) => adapter.setLocale(locale))
        return adapter
      },
    },
  ]
}
