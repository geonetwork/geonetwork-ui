import {
  getCustomTranslations,
  isConfigLoaded,
} from '@geonetwork-ui/util/app-config'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { map } from 'rxjs/operators'
import { dropEmptyTranslations } from './translate.loader.utils'

/**
 * This loader will rely on JSON files in the app assets, as well as an app config
 * if one was loaded (for custom translations)
 * Implements a fallback on default lang if translated labels are empty
 */
export class FileTranslateLoader extends TranslateHttpLoader {
  getTranslation(lang: string) {
    const baseLang = lang.substr(0, 2) // removing the right part of e.g. en_EN
    return super.getTranslation(baseLang).pipe(
      map(dropEmptyTranslations),
      map((translations) => {
        if (isConfigLoaded()) {
          return { ...translations, ...getCustomTranslations(baseLang) }
        }
        return translations
      })
    )
  }
}
