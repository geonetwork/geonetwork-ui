import { Injectable } from '@angular/core'
import { StandardsApiService, ToolsApiService } from '@lib/gn-api'
import { TranslateLoader } from '@ngx-translate/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TranslationService implements TranslateLoader {
  constructor(private toolsApiService: ToolsApiService) {}

  getTranslation(lang: string): Observable<any> {
    return this.toolsApiService.getTranslationsPackage1('gnui')
  }
}
