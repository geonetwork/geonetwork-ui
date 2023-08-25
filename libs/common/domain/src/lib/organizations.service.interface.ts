import { Observable } from 'rxjs'
import { FieldFilters } from './search/filter.model'
import { Organization } from './record/organization.model'
import { BaseRecord, CatalogRecord } from './record/metadata.model'

export abstract class OrganizationsServiceInterface {
  public abstract organisations$: Observable<Organization[]>
  public abstract organisationsCount$: Observable<number>
  public abstract getFiltersForOrgs(
    organisations: Organization[]
  ): Observable<FieldFilters>
  public abstract getOrgsFromFilters(
    filters: FieldFilters
  ): Observable<Organization[]>
  public abstract addOrganizationToRecordFromSource(
    source: Record<string, unknown>,
    sourceRecord: BaseRecord
  ): Observable<CatalogRecord>
}
