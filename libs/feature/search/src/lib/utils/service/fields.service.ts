import { Injectable, Injector } from '@angular/core'
import { SearchFilters } from '@geonetwork-ui/util/shared'
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
import { combineLatest, Observable, of, takeLast } from 'rxjs'
import { map, mergeScan } from 'rxjs/operators'

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
  private getValuesForFilters(fieldName: string, filters: SearchFilters) {
    return this.fields[fieldName].getValuesForFilter(filters)
  }

  getFiltersForFieldValues(
    fieldValues: FieldValues
  ): Observable<SearchFilters> {
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
    return combineLatest(filtersByField$).pipe(
      map((filters) =>
        filters.reduce((prev, curr) => ({ ...prev, ...curr }), {})
      )
    )
  }

  getFieldValuesForFilters(filters: SearchFilters): Observable<FieldValues> {
    return of(...this.supportedFields).pipe(
      mergeScan(
        (prev, curr) =>
          this.getValuesForFilters(curr, filters).pipe(
            map((values) => ({
              ...prev,
              [curr]: values,
            }))
          ),
        {} as FieldValues
      ),
      takeLast(1)
    )
  }
}
