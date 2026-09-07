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
