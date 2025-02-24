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

  formatDate(
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ): string {
    const currentLocale = this.translateService.currentLang || 'en-US'
    const dateObj = this.getDateObject(date)
    return options
      ? dateObj.toLocaleDateString(currentLocale, options)
      : dateObj.toLocaleDateString(currentLocale)
  }

  formatDateTime(
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ): string {
    const currentLocale = this.translateService.currentLang || 'en-US'
    const dateObj = this.getDateObject(date)
    return options
      ? dateObj.toLocaleString(currentLocale, options)
      : dateObj.toLocaleString(currentLocale)
  }
}
