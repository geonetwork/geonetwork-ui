import { Injectable } from '@angular/core'
import { TranslateLoader } from '@ngx-translate/core'
import { forkJoin, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { StandardsApiService } from '@lib/gn-api'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class TranslationService implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private standardApiService: StandardsApiService
  ) {}

  getTranslation(lang: string): Observable<any> {
    const observables: Observable<any>[] = []
    const translationFiles = [`assets/i18n/${lang}.json`]

    const core = this.http.get(translationFiles[0])
    observables.push(core)
    observables.push(
      this.standardApiService.getCodelistsTranslations('iso19139', [
        'gmd:MD_TopicCategoryCode',
        'gmd:MD_ScopeCode',
        'gmd:MD_MaintenanceFrequencyCode',
        'gmd:MD_ProgressCode',
        'gmd:DS_InitiativeTypeCode',
        'gmd:MD_SpatialRepresentationTypeCode',
      ])
    )

    return forkJoin(observables).pipe(
      map((response) => {
        return response.reduce((a, b) => {
          return Object.assign(a, b)
        })
      })
    )
  }
}
