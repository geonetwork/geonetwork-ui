import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

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

  formatRelativeDateTime(date: Date | string): string {
    const { locale, dateObj } = this.getLocaleAndDate(date)
    const now = Date.now()
    const diffInMs = dateObj.getTime() - now
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
    const absDiffInDays = Math.abs(diffInDays)
    const relativeFormatter = new Intl.RelativeTimeFormat(locale, {
      numeric: 'auto',
    })

    if (absDiffInDays >= 365 || Math.abs(diffInDays / 30) >= 12) {
      const years = Math.round(diffInDays / 365)
      return relativeFormatter.format(years, 'year')
    }

    if (absDiffInDays >= 30) {
      const months = Math.round(diffInDays / 30)
      return relativeFormatter.format(months, 'month')
    }

    if (absDiffInDays >= 7) {
      const weeks = Math.round(diffInDays / 7)
      return relativeFormatter.format(weeks, 'week')
    }

    const days = Math.round(diffInDays)
    return relativeFormatter.format(days, 'day')
  }
}
