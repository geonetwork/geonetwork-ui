import { Injectable, Injector } from '@angular/core'
import {
  AbstractSearchField,
  FieldValue,
  FullTextSearchField,
  IsSpatialSearchField,
  LicenseSearchField,
  OrganizationSearchField,
  SimpleSearchField,
  TopicSearchField,
} from './fields'
import { forkJoin, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { FieldFilters } from '@geonetwork-ui/common/domain/search'

// key is the field name
export type FieldValues = Record<string, FieldValue[] | FieldValue>

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  private fields = {
    publisher: new OrganizationSearchField(this.injector),
    format: new SimpleSearchField('format', 'asc', this.injector),
    publicationYear: new SimpleSearchField(
      'publicationYearForResource',
      'desc',
      this.injector
    ),
    topic: new TopicSearchField(this.injector),
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
