import { Observable } from 'rxjs'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search/filter.model'
import { Organization } from '@geonetwork-ui/common/domain/model/record/organization.model'
import { BaseRecord, CatalogRecord } from '@geonetwork-ui/common/domain/model/record/metadata.model'

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
