import { Injectable, Injector } from '@angular/core'
import { SearchFilters } from '@geonetwork-ui/util/shared'
import {
  AbstractSearchField,
  FieldValue,
  FullTextSearchField,
  SimpleSearchField,
  TopicSearchField,
} from './fields'

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  private fields = {
    publisher: new SimpleSearchField('OrgForResource', 'asc', this.injector),
    format: new SimpleSearchField('format', 'asc', this.injector),
    publicationYear: new SimpleSearchField(
      'publicationYearForResource',
      'desc',
      this.injector
    ),
    topic: new TopicSearchField(this.injector),
    q: new FullTextSearchField(),
  } as Record<string, AbstractSearchField>

  get supportedFields() {
    return Object.keys(this.fields)
  }

  constructor(private injector: Injector) {}

  private getField(fieldName: string) {
    if (this.supportedFields.indexOf(fieldName) === -1)
      throw new Error(`Unsupported search field: ${fieldName}`)
    return this.fields[fieldName]
  }

  getAvailableValues(fieldName: string) {
    return this.getField(fieldName).getAvailableValues()
  }
  getFiltersForValues(fieldName: string, values: FieldValue[]) {
    return this.getField(fieldName).getFiltersForValues(values)
  }
  getValuesForFilters(fieldName: string, filters: SearchFilters) {
    return this.getField(fieldName).getValuesForFilter(filters)
  }
}