import { map } from 'rxjs/operators'
import { getCustomTranslations } from '../app-config'
import { FileTranslateLoader } from '@geonetwork-ui/util/i18n'

/**
 * This loader extends the default one based on JSON files but also loads custom translations
 * defined in the app configuration
 * Implements a fallback on default lang if translated labels are empty
 */
export class FileWithOverridesTranslateLoader extends FileTranslateLoader {
  getTranslation(lang: string) {
    const baseLang = lang.substring(0, 2) // removing the right part of e.g. en_EN
    return super.getTranslation(baseLang).pipe(
      map((translations) => ({
        ...translations,
        ...getCustomTranslations(baseLang),
      }))
    )
  }
}
