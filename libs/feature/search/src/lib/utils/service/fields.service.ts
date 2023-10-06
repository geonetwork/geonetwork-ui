import { Injectable, Injector } from '@angular/core'
import {
  AbstractSearchField,
  GnUiTranslationSearchField,
  FieldValue,
  FullTextSearchField,
  IsSpatialSearchField,
  LicenseSearchField,
  OrganizationSearchField,
  SimpleSearchField,
} from './fields'
import { forkJoin, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { FieldFilters } from '@geonetwork-ui/common/domain/search'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

// key is the field name
export type FieldValues = Record<string, FieldValue[] | FieldValue>

marker('search.filters.format')
marker('search.filters.inspireKeyword')
marker('search.filters.isSpatial')
marker('search.filters.license')
marker('search.filters.publicationYear')
marker('search.filters.publisher')
marker('search.filters.representationType')
marker('search.filters.resourceType')
marker('search.filters.standard')
marker('search.filters.topic')

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  private fields = {
    publisher: new OrganizationSearchField(this.injector),
    format: new SimpleSearchField('format', 'asc', this.injector),
    resourceType: new GnUiTranslationSearchField(
      'resourceType',
      'asc',
      this.injector
    ),
    representationType: new GnUiTranslationSearchField(
      'cl_spatialRepresentationType.key',
      'asc',
      this.injector
    ),
    publicationYear: new SimpleSearchField(
      'publicationYearForResource',
      'desc',
      this.injector
    ),
    topic: new GnUiTranslationSearchField('cl_topic.key', 'asc', this.injector),
    inspireKeyword: new SimpleSearchField(
      'th_httpinspireeceuropaeutheme-theme_tree.default',
      'asc',
      this.injector
    ),
    documentStandard: new SimpleSearchField(
      'documentStandard',
      'asc',
      this.injector
    ),
    isSpatial: new IsSpatialSearchField(this.injector),
    q: new FullTextSearchField(),
    license: new LicenseSearchField(this.injector),
  } as Record<string, AbstractSearchField>

  get supportedFields() {
    return Object.keys(this.fields)
  }

  constructor(private injector: Injector) {}

  getAvailableValues(fieldName: string) {
    if (this.supportedFields.indexOf(fieldName) === -1)
      throw new Error(`Unsupported search field: ${fieldName}`)
    return this.fields[fieldName].getAvailableValues()
  }

  private getFiltersForValues(fieldName: string, values: FieldValue[]) {
    return this.fields[fieldName].getFiltersForValues(values)
  }
  private getValuesForFilters(fieldName: string, filters: FieldFilters) {
    return this.fields[fieldName].getValuesForFilter(filters)
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
      return this.getFiltersForValues(fieldName, values as FieldValue[])
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
