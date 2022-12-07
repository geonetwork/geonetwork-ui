import { Inject, Injectable, Optional } from '@angular/core'
import { CatalogRecord, toModel } from '@geonetwork-ui/metadata-converter'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class EditorService {
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
          this.apiConfiguration.basePath || '/geonetwork/srv/api'
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
}
