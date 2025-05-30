import { TranslateLoader } from '@ngx-translate/core'
import { map, Observable, of } from 'rxjs'
import { dropEmptyTranslations } from './translate.loader.utils'
import de from '../../../../../translations/de.json'
import en from '../../../../../translations/en.json'
import es from '../../../../../translations/es.json'
import fr from '../../../../../translations/fr.json'
import it from '../../../../../translations/it.json'
import nl from '../../../../../translations/nl.json'
import pt from '../../../../../translations/pt.json'
import sk from '../../../../../translations/sk.json'

export class EmbeddedTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<Record<string, string>> {
    const langs = { de, en, es, fr, it, nl, pt, sk }
    const translations = langs[lang.substring(0, 2)]
    return of(translations).pipe(map(dropEmptyTranslations))
  }
}
