import { Injectable, Injector } from '@angular/core'
import {
  AbstractSearchField,
  AvailableServicesField,
  DateRangeSearchField,
  FieldValue,
  FullTextSearchField,
  IsSpatialSearchField,
  LicenseSearchField,
  MultilingualSearchField,
  OrganizationSearchField,
  OwnerSearchField,
  ResourceTypeLegacyField,
  SimpleSearchField,
  TranslatedSearchField,
  RecordKindField,
  UserSearchField,
} from './fields'
import { SearchFilters } from '@geonetwork-ui/api/metadata-converter'
import { forkJoin, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DateRange } from '@geonetwork-ui/api/repository'

// key is the field name
export type FieldValues = Record<string, FieldValue[] | FieldValue | DateRange>

marker('search.filters.format')
marker('search.filters.inspireKeyword')
marker('search.filters.keyword')
marker('search.filters.isSpatial')
marker('search.filters.license')
marker('search.filters.publicationYear')
marker('search.filters.organization')
marker('search.filters.representationType')
marker('search.filters.resourceType')
marker('search.filters.standard')
marker('search.filters.topic')
marker('search.filters.contact')
marker('search.filters.producerOrg')
marker('search.filters.publisherOrg')
marker('search.filters.user')
marker('search.filters.changeDate')

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  protected fields = {
    organization: new OrganizationSearchField(this.injector),
    format: new SimpleSearchField('format', this.injector, 'asc'),
    resourceType: new ResourceTypeLegacyField(this.injector), // Deprecated, use `recordKind` instead
    recordKind: new RecordKindField(this.injector),
    representationType: new TranslatedSearchField(
      'cl_spatialRepresentationType.key',
      this.injector,
      'asc'
    ),
    publicationYear: new SimpleSearchField(
      'publicationYearForResource',
      this.injector,
      'desc'
    ),
    topic: new TranslatedSearchField('cl_topic.key', this.injector, 'asc'),
    inspireKeyword: new TranslatedSearchField(
      'th_httpinspireeceuropaeutheme-theme.link',
      this.injector,
      'asc'
    ),
    keyword: new MultilingualSearchField('tag', this.injector, 'desc', 'count'),
    documentStandard: new SimpleSearchField(
      'documentStandard',
      this.injector,
      'asc'
    ),
    isSpatial: new IsSpatialSearchField(this.injector),
    q: new FullTextSearchField(),
    license: new LicenseSearchField(this.injector),
    owner: new OwnerSearchField(this.injector),
    producerOrg: new MultilingualSearchField(
      'originatorOrgForResourceObject',
      this.injector,
      'asc',
      'key'
    ),
    publisherOrg: new MultilingualSearchField(
      'distributorOrgForResourceObject',
      this.injector,
      'asc',
      'key'
    ),
    user: new UserSearchField(this.injector),
    changeDate: new DateRangeSearchField('changeDate', this.injector, 'desc'),
    availableServices: new AvailableServicesField(this.injector),
  } as Record<string, AbstractSearchField>

  get supportedFields() {
    return Object.keys(this.fields)
  }

  constructor(protected injector: Injector) {}

  getAvailableValues(fieldName: string, configFilters: SearchFilters) {
    if (this.supportedFields.indexOf(fieldName) === -1)
      throw new Error(`Unsupported search field: ${fieldName}`)
    return this.fields[fieldName].getAvailableValues(configFilters)
  }

  private getFiltersForValues(
    fieldName: string,
    values: FieldValue[] | DateRange[]
  ) {
    return this.fields[fieldName].getFiltersForValues(values)
  }
  private getValuesForFilters(fieldName: string, filters: FieldFilters) {
    return this.fields[fieldName].getValuesForFilter(filters)
  }

  getFieldType(fieldName: string) {
    return this.fields[fieldName].getType()
  }

  buildFiltersFromFieldValues(
    fieldValues: FieldValues
  ): Observable<FieldFilters> {
    const fieldNames = Object.keys(fieldValues).filter((fieldName) =>
      this.supportedFields.includes(fieldName)
    )
    if (!fieldNames.length) return of({})
    const filtersByField$ = fieldNames.map((fieldName) => {
      const values = Array.isArray(fieldValues[fieldName])
        ? fieldValues[fieldName]
        : [fieldValues[fieldName]]
      return this.getFiltersForValues(
        fieldName,
        values as FieldValue[] | DateRange[]
      )
    })
    return forkJoin(filtersByField$).pipe(
      map((filters) =>
        filters.reduce((prev, curr) => ({ ...prev, ...curr }), {})
      )
    )
  }

  readFieldValuesFromFilters(filters: FieldFilters): Observable<FieldValues> {
    const fieldValues$ = this.supportedFields.map((fieldName) =>
      this.getValuesForFilters(fieldName, filters).pipe(
        map((values) => ({ [fieldName]: values }))
      )
    )
    return forkJoin(fieldValues$).pipe(
      map((fieldValues) =>
        fieldValues.reduce((prev, curr) => ({ ...prev, ...curr }), {})
      )
    )
  }
}
