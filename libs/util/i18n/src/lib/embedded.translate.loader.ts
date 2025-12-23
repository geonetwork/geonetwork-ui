import { TranslateLoader } from '@ngx-translate/core'
import { map, Observable, of } from 'rxjs'
import { dropEmptyTranslations } from './translate.loader.utils.js'
// @ts-expect-error TS2856 -- Import attributes provoke an error; should be fixed when upgrading Typescript
import de from '../../../../../translations/de.json' with { type: 'json' }
// @ts-expect-error TS2856
import en from '../../../../../translations/en.json' with { type: 'json' }
// @ts-expect-error TS2856
import es from '../../../../../translations/es.json' with { type: 'json' }
// @ts-expect-error TS2856
import fr from '../../../../../translations/fr.json' with { type: 'json' }
// @ts-expect-error TS2856
import it from '../../../../../translations/it.json' with { type: 'json' }
// @ts-expect-error TS2856
import nl from '../../../../../translations/nl.json' with { type: 'json' }
// @ts-expect-error TS2856
import pt from '../../../../../translations/pt.json' with { type: 'json' }
// @ts-expect-error TS2856
import sk from '../../../../../translations/sk.json' with { type: 'json' }

export class EmbeddedTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<Record<string, string>> {
    const langs = { de, en, es, fr, it, nl, pt, sk }
    const translations = langs[lang.substring(0, 2)]
    return of(translations).pipe(map(dropEmptyTranslations))
  }
}
