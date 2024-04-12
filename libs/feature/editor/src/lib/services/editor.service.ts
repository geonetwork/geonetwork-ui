import { Inject, Injectable, Optional } from '@angular/core'
import {
  findConverterForDocument,
  Iso19139Converter,
} from '@geonetwork-ui/api/metadata-converter'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { from, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { EditorFieldsConfig } from '../models/fields.model'
import { evaluate } from '../expressions'

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private apiUrl = `${this.apiConfiguration?.basePath || '/geonetwork/srv/api'}`

  constructor(
    private http: HttpClient,
    @Optional()
    @Inject(Configuration)
    private apiConfiguration: Configuration
  ) {}

  // TODO: use the catalog repository instead
  loadRecordByUuid(uuid: string): Observable<CatalogRecord> {
    return this.http
      .get(`${this.apiUrl}/records/${uuid}/formatters/xml`, {
        responseType: 'text',
        headers: {
          Accept: 'application/xml',
        },
      })
      .pipe(
        switchMap((response) =>
          findConverterForDocument(response).readRecord(response.toString())
        )
      )
  }

  // returns the record as it was when saved
  saveRecord(
    record: CatalogRecord,
    fieldsConfig: EditorFieldsConfig
  ): Observable<CatalogRecord> {
    const savedRecord = { ...record }

    // run onSave processes
    for (const field of fieldsConfig) {
      if (field.onSaveProcess && field.model) {
        const evaluator = evaluate(field.onSaveProcess)
        savedRecord[field.model] = evaluator({
          config: field,
          value: record[field.model],
        })
      }
    }

    // TODO: use the catalog repository instead
    // TODO: use converter based on the format of the record before change
    return from(new Iso19139Converter().writeRecord(savedRecord)).pipe(
      switchMap((recordXml) =>
        this.http.put(
          `${this.apiUrl}/records?metadataType=METADATA&uuidProcessing=OVERWRITE&transformWith=_none_&publishToAll=on`,
          recordXml,
          {
            headers: {
              'Content-Type': 'application/xml',
            },
            withCredentials: true,
          }
        )
      ),
      map(() => savedRecord)
    )
  }
}
