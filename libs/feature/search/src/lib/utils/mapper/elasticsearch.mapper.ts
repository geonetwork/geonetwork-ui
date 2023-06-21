import { Injectable } from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { ElasticsearchFieldMapper } from './elasticsearch.field.mapper'
import { combineLatest, Observable, of } from 'rxjs'
import { OrganisationsServiceInterface } from '@geonetwork-ui/feature/catalog'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchMapper {
  constructor(
    private fieldMapper: ElasticsearchFieldMapper,
    private orgsService: OrganisationsServiceInterface
  ) {}

  toRecords(response): Observable<MetadataRecord[]> {
    const responseHits = response.hits.hits
    if (!responseHits.length) return of([])
    const recordsObservable = responseHits.map((hit) =>
      this.toRecord(hit)
    ) as Observable<MetadataRecord>[]
    return combineLatest(recordsObservable)
  }

  toRecord(hit): Observable<MetadataRecord> {
    const { _source } = hit
    const record: MetadataRecord = Object.keys(_source).reduce(
      (prev, fieldName) =>
        this.fieldMapper.getMappingFn(fieldName)(prev, _source),
      {} as MetadataRecord
    )
    return this.orgsService.addOrganisationToRecordFromSource(_source, record)
  }
}
