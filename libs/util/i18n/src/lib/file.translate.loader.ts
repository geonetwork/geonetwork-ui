import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { map } from 'rxjs/operators'
import { dropEmptyTranslations } from './translate.loader.utils'

/**
 * This loader will rely on JSON files in the app assets
 * Implements a fallback on default lang if translated labels are empty
 */
export class FileTranslateLoader extends TranslateHttpLoader {
  getTranslation(lang: string) {
    const baseLang = lang.substring(0, 2) // removing the right part of e.g. en_EN
    return super.getTranslation(baseLang).pipe(map(dropEmptyTranslations))
  }
}
