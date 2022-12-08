import { Inject, Injectable, Optional } from '@angular/core'
import {
  CatalogRecord,
  toModel,
  toXml,
} from '@geonetwork-ui/metadata-converter'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { finalize, first, map, switchMap, take, tap } from 'rxjs/operators'
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

  private apiUrl = `${this.apiConfiguration?.basePath || '/geonetwork/srv/api'}`

  fields$: Observable<FormField[]> = this.record$.pipe(
    map((record) =>
      this.fieldsConfig.map((fieldConfig) => ({
        config: fieldConfig,
        value: record?.[fieldConfig.model] || null,
      }))
    )
  )
  saving$ = new BehaviorSubject(false)

  constructor(
    private http: HttpClient,
    @Optional()
    @Inject(Configuration)
    private apiConfiguration: Configuration
  ) {}
  loadRecordByUuid(uuid: string): Observable<CatalogRecord> {
    return this.http
      .get(`${this.apiUrl}/records/${uuid}/formatters/xml`, {
        responseType: 'text',
        headers: {
          Accept: 'application/xml',
        },
      })
      .pipe(map((response) => toModel(response.toString())))
  }

  saveCurrentRecord(): Observable<void> {
    return this.record$.pipe(
      take(1),
      tap((record) => {
        if (!record)
          throw new Error('Save record failed: no record currently open')
        this.saving$.next(true)
      }),
      switchMap((record) =>
        this.http.put(
          `${this.apiUrl}/records?metadataType=METADATA&uuidProcessing=OVERWRITE&transformWith=_none_&publishToAll=on`,
          toXml(record),
          {
            headers: {
              'Content-Type': 'application/xml',
            },
          }
        )
      ),
      map(() => undefined),
      finalize(() => {
        this.saving$.next(false)
      })
    )
  }

  setCurrentRecord(record: CatalogRecord) {
    this.record$.next(record)
  }
}
