import { Observable } from 'rxjs'
import {
  MetadataRecord,
  Organisation,
  SearchFilters,
  SourceWithUnknownProps,
} from '@geonetwork-ui/util/shared'

export abstract class OrganisationsServiceInterface {
  public abstract organisations$: Observable<Organisation[]>
  public abstract organisationsCount$: Observable<number>
  public abstract getFiltersForOrgs(
    organisations: Organisation[]
  ): Observable<SearchFilters>
  public abstract getOrgsFromFilters(
    filters: SearchFilters
  ): Observable<Organisation[]>
  public abstract addOrganisationToRecordFromSource(
    source: SourceWithUnknownProps,
    sourceRecord: MetadataRecord
  ): Observable<MetadataRecord>
}
