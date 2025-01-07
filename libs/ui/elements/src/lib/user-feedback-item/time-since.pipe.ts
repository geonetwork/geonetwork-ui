import { Pipe, PipeTransform } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { formatDistance } from 'date-fns/formatDistance'
import { de, enUS, es, fr, it, Locale, nl, pt, sk } from 'date-fns/locale'

@Pipe({
  name: 'timeSince',
  standalone: true,
})
export class TimeSincePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: Date): string {
    if (isNaN(value.getTime())) {
      throw new Error('Invalid Date')
    }

    const maintenant = new Date()
    let locale: Locale

    switch (this.translate.currentLang) {
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

    return formatDistance(value, maintenant, {
      addSuffix: true,
      locale: locale,
    })
  }
}
