import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { de, enUS, es, fr, it, Locale, nl, pt, sk } from 'date-fns/locale'
import { formatDistance } from 'date-fns/formatDistance'

@Injectable({
  providedIn: 'root',
})
export class DateService {
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

  formatRelativeDateTime(date: Date | string) {
    const dateObj = this.getDateObject(date)

    const now = new Date()
    let locale: Locale

    switch (this.translateService.currentLang) {
      case 'fr':
        locale = fr
        break
      case 'de':
        locale = de
        break
      case 'es':
        locale = es
        break
      case 'it':
        locale = it
        break
      case 'nl':
        locale = nl
        break
      case 'pt':
        locale = pt
        break
      case 'sk':
        locale = sk
        break
      case 'en':
      default:
        locale = enUS
        break
    }

    return formatDistance(dateObj, now, {
      addSuffix: true,
      locale: locale,
    })
  }
}
