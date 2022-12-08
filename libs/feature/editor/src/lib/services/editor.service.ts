import { Inject, Injectable, Optional } from '@angular/core'
import { CatalogRecord, toModel } from '@geonetwork-ui/metadata-converter'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { FormFieldConfig } from '@geonetwork-ui/ui/inputs'

interface FormField {
  config: FormFieldConfig
  value: string | number | boolean | unknown
}

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private record$ = new BehaviorSubject<CatalogRecord | null>(null)
  private fieldsConfig: FormFieldConfig[] = [
    {
      model: 'title',
      labelKey: 'Metadata title',
      type: 'text',
    },
    {
      model: 'abstract',
      labelKey: 'Abstract',
      type: 'rich',
    },
    {
      model: 'uniqueIdentifier',
      labelKey: 'Unique identifier',
      type: 'text',
      locked: true,
    },
  ]

  fields$: Observable<FormField[]> = this.record$.pipe(
    map((record) =>
      this.fieldsConfig.map((fieldConfig) => ({
        config: fieldConfig,
        value: record[fieldConfig.model] || '',
      }))
    )
  )

  constructor(
    private http: HttpClient,
    @Optional()
    @Inject(Configuration)
    private apiConfiguration: Configuration
  ) {}
  loadRecordByUuid(uuid: string): Observable<CatalogRecord> {
    return this.http
      .get(
        `${
          this.apiConfiguration?.basePath || '/geonetwork/srv/api'
        }/records/${uuid}/formatters/xml`,
        {
          responseType: 'text',
          headers: {
            Accept: 'application/xml',
          },
        }
      )
      .pipe(map((response) => toModel(response.toString())))
  }

  setCurrentRecord(record: CatalogRecord) {
    this.record$.next(record)
  }
}
