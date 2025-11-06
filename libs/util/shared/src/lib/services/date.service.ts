import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { type Locale } from 'date-fns/locale'
import { formatDistance } from 'date-fns/formatDistance'

@Injectable({
  providedIn: 'root',
})
export class DateService {
  dateLocales = import('date-fns/locale')

  constructor(private translateService: TranslateService) {}

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
    const locale = this.translateService.currentLang || 'en-US'
    const dateObj = this.getDateObject(date)
    return { locale, dateObj }
  }

  private async getDateLocale(): Promise<Locale> {
    return this.dateLocales.then(
      (locales) =>
        locales[this.translateService.currentLang || 'en-US'] as Locale
    )
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
