import { Inject, Injectable, Optional } from '@angular/core'
import { toModel, toXml } from '@geonetwork-ui/api/metadata-converter'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

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
      .pipe(map((response) => toModel(response.toString())))
  }

  // TODO: use the catalog repository instead
  saveRecord(record: CatalogRecord): Observable<void> {
    return this.http
      .put(
        `${this.apiUrl}/records?metadataType=METADATA&uuidProcessing=OVERWRITE&transformWith=_none_&publishToAll=on`,
        toXml(record),
        {
          headers: {
            'Content-Type': 'application/xml',
          },
          withCredentials: true,
        }
      )
      .pipe(map(() => undefined))
  }
}
