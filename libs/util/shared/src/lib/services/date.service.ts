import { Injectable, inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { type Locale } from 'date-fns/locale'
import { formatDistance } from 'date-fns/formatDistance'

const DEFAULT_LANGUAGE = 'en'

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private translateService = inject(TranslateService)

  dateLocales = import('@geonetwork-ui/util/i18n/date-locales').then(
    (obj) => obj.default
  )

  private getDateObject(date: Date | string): Date {
    if (typeof date === 'string') {
      const dateObj = new Date(date)
      if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date string')
      }
      return dateObj
    }
    return date
  }

  private getLocaleAndDate(date: Date | string): {
    locale: string
    dateObj: Date
  } {
    const locale = this.translateService.currentLang || DEFAULT_LANGUAGE
    const dateObj = this.getDateObject(date)
    return { locale, dateObj }
  }

  private async getDateLocale(): Promise<Locale> {
    const lang = this.translateService.currentLang || DEFAULT_LANGUAGE
    const locales = await this.dateLocales
    return locales[lang]
  }

  formatDate(
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ): string {
    const { locale, dateObj } = this.getLocaleAndDate(date)
    return dateObj.toLocaleDateString(locale, options)
  }

  formatDateTime(
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ): string {
    const { locale, dateObj } = this.getLocaleAndDate(date)
    return dateObj.toLocaleString(locale, options)
  }

  async formatRelativeDateTime(date: Date | string): Promise<string> {
    const dateObj = this.getDateObject(date)

    const now = new Date()
    const locale = await this.getDateLocale()

    return formatDistance(dateObj, now, {
      addSuffix: true,
      locale: locale,
    })
  }
}
