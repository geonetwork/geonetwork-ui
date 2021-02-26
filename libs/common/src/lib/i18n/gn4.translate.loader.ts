import { Injectable } from '@angular/core'
import { ToolsApiService } from '@lib/gn-api'
import { TranslateLoader } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class Gn4TranslateLoader implements TranslateLoader {
  constructor(private toolsApiService: ToolsApiService) {}

  getTranslation(lang: string): Observable<any> {
    // FIXME: need to filter translation with {{}} pattern
    // legacy from AngularJs, the api should handle it
    return this.toolsApiService.getTranslationsPackage1('gnui').pipe(
      map((json) =>
        Object.keys(json).reduce((translations, key) => {
          const value = json[key]
          if (!value.includes(' {{')) {
            translations[key] = value
          }
          return translations
        }, {})
      )
    )
  }
}
