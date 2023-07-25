import { TranslateLoader } from '@ngx-translate/core'
import { Observable, map, of } from 'rxjs'
import { dropEmptyTranslations } from './translate.loader.utils'
import de from '../../../../../translations/de.json'
import en from '../../../../../translations/en.json'
import es from '../../../../../translations/es.json'
import fr from '../../../../../translations/fr.json'
import it from '../../../../../translations/it.json'
import nl from '../../../../../translations/nl.json'
import pt from '../../../../../translations/pt.json'

export class EmbeddedTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const langs = { de, en, es, fr, it, nl, pt }
    const translations = langs[lang.substring(0, 2)]
    return of(translations).pipe(map(dropEmptyTranslations))
  }
}
