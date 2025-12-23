import { Observable } from 'rxjs'
import {
  BaseRecord,
  CatalogRecord,
  Organization,
} from './model/record/index.js'
import { FieldFilters } from './model/search/index.js'

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
