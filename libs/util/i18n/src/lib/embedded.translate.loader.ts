import { TranslateLoader } from '@ngx-translate/core'
import { map, Observable, of } from 'rxjs'
import { dropEmptyTranslations } from './translate.loader.utils.js'
import de from '../../../../../translations/de.json' with { type: 'json' }
import en from '../../../../../translations/en.json' with { type: 'json' }
import es from '../../../../../translations/es.json' with { type: 'json' }
import fr from '../../../../../translations/fr.json' with { type: 'json' }
import it from '../../../../../translations/it.json' with { type: 'json' }
import nl from '../../../../../translations/nl.json' with { type: 'json' }
import pt from '../../../../../translations/pt.json' with { type: 'json' }
import sk from '../../../../../translations/sk.json' with { type: 'json' }

export class EmbeddedTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<Record<string, string>> {
    const langs = { de, en, es, fr, it, nl, pt, sk }
    const translations = langs[lang.substring(0, 2)]
    return of(translations).pipe(map(dropEmptyTranslations))
  }
}
