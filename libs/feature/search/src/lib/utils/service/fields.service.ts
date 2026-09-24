import { Injectable, InjectionToken, Injector, inject } from '@angular/core'
import {
  AbstractSearchField,
  AvailableServicesField,
  BoundingBoxSearchField,
  DateRangeSearchField,
  FieldValue,
  FullTextSearchField,
  IsSpatialSearchField,
  LicenseSearchField,
  MultilingualSearchField,
  OrganizationSearchField,
  OwnerSearchField,
  ResourceCreationRevisionDateSearchField,
  ResourceTypeLegacyField,
  SimpleSearchField,
  TranslatedSearchField,
  RecordKindField,
  UserSearchField,
} from './fields'
import { forkJoin, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DateRange } from '@geonetwork-ui/api/repository'

// key is the field name
export type FieldValues = Record<string, FieldValue[] | FieldValue | DateRange>

/**
 * Fields left out on purpose are:
 * `organization` and `q` (not built on a single ES field),
 * `recordKind` and `availableServices` (they write to other filter keys),
 * `spatialExtent` (only one bounding box is ever applied to a search),
 * `owner` (offers no value to pick from),
 * `changeDate` and `resourceCreationRevisionDate` (date ranges: they offer no
 * list of values, so include/exclude values would have no visible effect),
 * `isSpatial` (a single choice between two mutually exclusive values),
 * and `resourceType` (deprecated).
 */
export const SUPPORTED_CUSTOM_FILTER_BASE_FILTERS = [
  'format',
  'representationType',
  'publicationYear',
  'topic',
  'inspireKeyword',
  'keyword',
  'documentStandard',
  'license',
  'producerOrg',
  'publisherOrg',
  'user',
]

marker('search.filters.format')
marker('search.filters.inspireKeyword')
marker('search.filters.keyword')
marker('search.filters.isSpatial')
marker('search.filters.license')
marker('search.filters.publicationYear')
marker('search.filters.organization')
marker('search.filters.representationType')
marker('search.filters.resourceType')
marker('search.filters.recordKind')
marker('search.filters.standard')
marker('search.filters.topic')
marker('search.filters.contact')
marker('search.filters.producerOrg')
marker('search.filters.publisherOrg')
marker('search.filters.user')
marker('search.filters.changeDate')
marker('search.filters.resourceCreationRevisionDate')
marker('search.filters.spatialExtent')

export interface CustomSearchFieldFilter {
  name: string
  baseFilter: string
  excludeValues?: string[]
  includeValues?: string[]
  labelKey?: string
}

export const CUSTOM_FILTERS = new InjectionToken<CustomSearchFieldFilter[]>(
  'custom-filters'
)
@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  protected injector = inject(Injector)
  private customFilters =
    inject<CustomSearchFieldFilter[]>(CUSTOM_FILTERS, { optional: true }) ?? []

  private baseFields: Record<string, AbstractSearchField> = {
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
    resourceCreationRevisionDate: new ResourceCreationRevisionDateSearchField(
      this.injector,
      'desc'
    ),
    availableServices: new AvailableServicesField(this.injector),
    spatialExtent: new BoundingBoxSearchField('spatialExtent', this.injector),
  }

  protected fields: Record<string, AbstractSearchField>

  constructor() {
    this.fields = { ...this.baseFields }
    for (const filter of this.customFilters) {
      const baseField = this.baseFields[filter.baseFilter]
      if (
        !SUPPORTED_CUSTOM_FILTER_BASE_FILTERS.includes(filter.baseFilter) ||
        !(baseField instanceof SimpleSearchField)
      ) {
        console.warn(
          `WARNING: the custom filter '${filter.name}' uses an unsupported base_filter '${
            filter.baseFilter
          }' (supported values: ${SUPPORTED_CUSTOM_FILTER_BASE_FILTERS.join(
            ', '
          )}). This filter will be ignored.`
        )
        continue
      }
      this.fields[filter.name] = baseField.extend({
        name: filter.name,
        includeValues: filter.includeValues,
        excludeValues: filter.excludeValues,
      })
    }
  }

  get supportedFields() {
    return Object.keys(this.fields)
  }

  getAvailableValues(fieldName: string) {
    if (this.supportedFields.indexOf(fieldName) === -1)
      throw new Error(`Unsupported search field: ${fieldName}`)
    return this.fields[fieldName].getAvailableValues()
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

  getLabelKey(fieldName: string): string {
    const customFilter = this.customFilters.find(
      (filter) => filter.name === fieldName
    )
    if (!customFilter) return `search.filters.${fieldName}`
    return customFilter.labelKey ?? `search.filters.${customFilter.baseFilter}`
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
      map((filters) => {
        if (typeof filters === 'string') {
          return filters
        }
        return (filters as FieldFilters[]).reduce(
          (prev, curr) => ({ ...prev, ...curr }),
          {}
        )
      })
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
