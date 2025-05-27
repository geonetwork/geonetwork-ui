import { firstValueFrom, Observable, of, switchMap } from 'rxjs'
import { map } from 'rxjs/operators'
import { Injector } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  AggregationBuckets,
  AggregationsParams,
  FieldFilter,
  FieldFilterByExpression,
  FieldFilters,
  TermBucket,
} from '@geonetwork-ui/common/domain/model/search'
import {
  DateRange,
  ElasticsearchService,
  isDateRange,
  METADATA_LANGUAGE,
} from '@geonetwork-ui/api/repository'
import { formatUserInfo } from '@geonetwork-ui/util/shared'
import { PossibleResourceTypes } from '@geonetwork-ui/api/metadata-converter'

export type FieldType = 'values' | 'dateRange'

export type FieldValue = string | number
export interface FieldAvailableValue {
  value: FieldValue
  label: string
  count?: number
}

export abstract class AbstractSearchField {
  abstract getAvailableValues(): Observable<FieldAvailableValue[] | DateRange[]>
  abstract getFiltersForValues(
    values: FieldValue[] | DateRange[]
  ): Observable<FieldFilters>
  abstract getValuesForFilter(
    filters: FieldFilters
  ): Observable<FieldValue[] | FieldValue | DateRange>
  abstract getType(): FieldType
}

export class SimpleSearchField implements AbstractSearchField {
  protected repository = this.injector.get(RecordsRepositoryInterface)

  // FIXME: this is required to register runtime fields; abstract this as well
  protected esService = this.injector.get(ElasticsearchService)

  constructor(
    protected esFieldName: string,
    protected injector: Injector,
    protected order: 'asc' | 'desc' = 'asc',
    protected orderType: 'key' | 'count' = 'key'
  ) {}

  protected getAggregations(): AggregationsParams {
    return {
      [this.esFieldName]: {
        type: 'terms',
        field: this.esFieldName,
        limit: 1000,
        sort: [this.order, this.orderType],
      },
    }
  }

  protected async getBucketLabel(bucket: TermBucket): Promise<string> {
    return bucket.term.toString()
  }

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    return this.repository.aggregate(this.getAggregations()).pipe(
      map(
        (response) =>
          (response[this.esFieldName] as AggregationBuckets).buckets || []
      ),
      switchMap((buckets: TermBucket[]) => {
        const bucketPromises = buckets.map(async (bucket) => ({
          label: `${await this.getBucketLabel(bucket)} (${bucket.count})`,
          value: bucket.term.toString(),
          count: bucket.count,
        }))
        return Promise.all(bucketPromises)
      })
    )
  }
  getFiltersForValues(
    values: FieldValue[] | DateRange[]
  ): Observable<FieldFilters> {
    // FieldValue[]
    if (this.getType() === 'values') {
      return of({
        [this.esFieldName]: (values as FieldValue[]).reduce((acc, val) => {
          const value = val.toString()
          if (value !== '') {
            return { ...acc, [value]: true }
          }
          return acc
        }, {}),
      })
    }
    // DateRange
    return of({
      [this.esFieldName]: values[0] !== '' ? values[0] : {},
    })
  }
  getValuesForFilter(
    filters: FieldFilters
  ): Observable<FieldValue[] | FieldValue | DateRange> {
    const filter = filters[this.esFieldName]
    if (!filter) return of([])
    // filter by expression
    if (typeof filter === 'string') {
      return of([filter])
    }
    // filter by date range
    if (isDateRange(filter)) {
      return of(filter)
    }
    // filter by values
    const values = Object.keys(filter).filter((v) => filter[v])
    return of(values)
  }

  getType(): FieldType {
    return 'values'
  }
}

export class TranslatedSearchField extends SimpleSearchField {
  protected platformService = this.injector.get(PlatformServiceInterface)

  constructor(
    protected esFieldName: string,
    protected injector: Injector,
    protected order: 'asc' | 'desc' = 'asc',
    protected orderType: 'key' | 'count' = 'key'
  ) {
    super(esFieldName, injector, order, orderType)
  }

  protected async getTranslation(key: string) {
    return firstValueFrom(this.platformService.translateKey(key))
  }

  protected async getBucketLabel(bucket: TermBucket) {
    return (await this.getTranslation(bucket.term)) || bucket.term
  }

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    if (this.orderType === 'count') return super.getAvailableValues()
    // sort values by alphabetical order
    return super
      .getAvailableValues()
      .pipe(
        map((values) =>
          values.sort((a, b) => new Intl.Collator().compare(a.label, b.label))
        )
      )
  }
}

/**
 * This search field will either target the `.default` field, or a specific `.langxyz` field according
 * to the defined METADATA_LANGUAGE token
 * The provided ES field name should not include any prefix such as `.langeng`
 */
export class MultilingualSearchField extends SimpleSearchField {
  // we're using a getter in case the token value changes over time
  private get searchLanguage() {
    return this.injector.get(METADATA_LANGUAGE, null)
  }

  constructor(
    protected esFieldName: string,
    protected injector: Injector,
    protected order: 'asc' | 'desc' = 'asc',
    protected orderType: 'key' | 'count' = 'key'
  ) {
    super(esFieldName, injector, order, orderType)
    // note: we're excluding the metadata language "current" value because that would produce
    // permalinks that might not work for different users
    if (this.searchLanguage && this.searchLanguage !== 'current') {
      this.esFieldName += `.lang${this.searchLanguage}`
    } else {
      this.esFieldName += '.default'
    }
  }
}

export class FullTextSearchField implements AbstractSearchField {
  getAvailableValues(): Observable<FieldAvailableValue[]> {
    return of([])
  }
  getFiltersForValues(values: FieldValue[]): Observable<FieldFilters> {
    return of({
      any: values[0] as string,
    })
  }
  getValuesForFilter(filters: FieldFilters): Observable<FieldValue[]> {
    return of(filters.any ? [filters.any as FieldFilterByExpression] : [])
  }
  getType(): FieldType {
    return 'values'
  }
}

marker('search.filters.isSpatial.yes')
marker('search.filters.isSpatial.no')

export class IsSpatialSearchField extends SimpleSearchField {
  private translateService = this.injector.get(TranslateService)

  constructor(injector: Injector) {
    super('isSpatial', injector, 'asc')
    this.esService.registerRuntimeField(
      'isSpatial',
      `String result = 'no';
String formats = doc.format.join('|').toLowerCase();
if (formats.contains('geojson') || formats.contains('arcgis') || formats.contains('ogc') || formats.contains('shp')) result = 'yes';
String protocols = doc.linkProtocol.join('|').toLowerCase();
if (protocols.contains('esri') || protocols.contains('ogc')) result = 'yes';
emit(result);`
    )
  }

  protected getAggregations(): AggregationsParams {
    return {
      isSpatial: {
        type: 'terms',
        limit: 2,
        field: 'isSpatial',
        sort: ['asc', 'key'],
      },
    }
  }

  protected async getBucketLabel(bucket: TermBucket) {
    return firstValueFrom(
      this.translateService.get(`search.filters.isSpatial.${bucket.term}`)
    )
  }

  getFiltersForValues(values: FieldValue[]): Observable<FieldFilters> {
    const isSpatial = {}
    if (values.length > 0) isSpatial[values[values.length - 1]] = true
    return of({
      isSpatial,
    })
  }

  getValuesForFilter(filters: FieldFilters): Observable<FieldValue[]> {
    const filter = filters.isSpatial
    if (!filter) return of([])
    const keys = Object.keys(filter)
    return of(keys.length ? [keys[0]] : [])
  }
}

marker('search.filters.license.pddl')
marker('search.filters.license.odbl')
marker('search.filters.license.odc-by')
marker('search.filters.license.cc-by-sa')
marker('search.filters.license.cc-by')
marker('search.filters.license.cc-zero')
marker('search.filters.license.etalab-v2')
marker('search.filters.license.etalab')
marker('search.filters.license.unknown')

// Note: values are inspired from https://doc.data.gouv.fr/moissonnage/licences/
export class LicenseSearchField extends SimpleSearchField {
  private translateService = this.injector.get(TranslateService)

  constructor(injector: Injector) {
    super('license', injector, 'asc')
    this.esService.registerRuntimeField(
      'license',
      `String raw = '';
if (doc.containsKey('licenseObject.default.keyword') && doc['licenseObject.default.keyword'].length > 0)
  raw += doc['licenseObject.default.keyword'].join('|').toLowerCase();
if (doc.containsKey('MD_LegalConstraintsUseLimitationObject.default.keyword') && doc['MD_LegalConstraintsUseLimitationObject.default.keyword'].length > 0)
  raw += doc['MD_LegalConstraintsUseLimitationObject.default.keyword'].join('|').toLowerCase();

boolean unknown = true;
if (raw.contains('pddl') || raw.contains('public domain dedication and licence')) {
  unknown = false;
  emit('pddl');
}
if (raw.contains('odbl') || raw.contains('open database license')) {
  unknown = false;
  emit('odbl');
}
if (raw.contains('odc-by') || raw.contains('opendatacommons.org/licenses/by/summary/"')) {
  unknown = false;
  emit('odc-by');
}

if (raw.contains('cc-by-sa') || raw.contains('creative commons attribution share-alike')) {
  unknown = false;
  emit('cc-by-sa');
} else if (raw.contains('cc-by') || raw.contains('cc by') || raw.contains('creative commons attribution')) {
  unknown = false;
  emit('cc-by');
} else if (raw.contains('cc0') || raw.contains('cc-0') || raw.contains('cczero') || raw.contains('cc-zero')) {
  unknown = false;
  emit('cc-zero');
}

if (raw.contains('etalab') && (raw.contains('v2') || raw.contains('2.0'))) {
  unknown = false;
  emit('etalab-v2');
} else if (raw.contains('open licence') || raw.contains('licence ouverte') || raw.contains('licence_ouverte')) {
  unknown = false;
  emit('etalab');
}

if(unknown) emit('unknown');`
    )
  }

  protected getAggregations(): AggregationsParams {
    return {
      license: {
        type: 'terms',
        limit: 10,
        field: 'license',
        sort: ['desc', 'count'],
      },
    }
  }

  protected async getBucketLabel(bucket: TermBucket) {
    return firstValueFrom(
      this.translateService.get(`search.filters.license.${bucket.term}`)
    )
  }
}

// This will use the OrganizationsServiceInterface
// Field values are the organization names
export class OrganizationSearchField implements AbstractSearchField {
  private orgsService = this.injector.get(OrganizationsServiceInterface)

  constructor(private injector: Injector) {}

  getFiltersForValues(values: FieldValue[]): Observable<FieldFilters> {
    return this.orgsService.organisations$.pipe(
      map((orgs) =>
        values
          .map((name) => orgs.find((org) => org.name === name))
          .filter((org) => org !== undefined)
      ),
      switchMap((selectedOrgs) =>
        this.orgsService.getFiltersForOrgs(selectedOrgs)
      )
    )
  }

  getValuesForFilter(filters: FieldFilters): Observable<FieldValue[]> {
    return this.orgsService
      .getOrgsFromFilters(filters)
      .pipe(map((orgs) => orgs.map((org) => org.name)))
  }

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    // sort values by alphabetical order
    return this.orgsService.organisations$.pipe(
      map((organisations) =>
        organisations.map((org) => ({
          label: `${org.name} (${org.recordCount})`,
          value: org.name,
        }))
      ),
      map((values) =>
        values.sort((a, b) => new Intl.Collator().compare(a.label, b.label))
      )
    )
  }

  getType(): FieldType {
    return 'values'
  }
}
export class OwnerSearchField extends SimpleSearchField {
  constructor(injector: Injector) {
    super('owner', injector, 'asc')
  }

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    return of([])
  }
}

export class UserSearchField extends SimpleSearchField {
  constructor(injector: Injector) {
    super('userinfo.keyword', injector, 'asc')
  }

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    return super.getAvailableValues().pipe(
      map((values) =>
        values.map((v) => ({
          ...v,
          label: formatUserInfo(v.label, true),
        }))
      )
    )
  }
}

export class DateRangeSearchField extends SimpleSearchField {
  constructor(
    protected esFieldName: string,
    protected injector: Injector,
    protected order: 'asc' | 'desc' = 'asc',
    protected orderType: 'key' | 'count' = 'key'
  ) {
    super(esFieldName, injector, order, orderType)
  }

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    // TODO: return an array of dates to show which one are available in the date picker
    return of([])
  }

  getType(): FieldType {
    return 'dateRange'
  }
}

marker('search.filters.availableServices.view')
marker('search.filters.availableServices.download')

export class AvailableServicesField extends SimpleSearchField {
  private translateService = this.injector.get(TranslateService)

  constructor(injector: Injector) {
    super('availableServices', injector, 'asc')
  }

  linkProtocolViewFilter = '/OGC:WMT?S.*/'
  linkProtocolDownloadFilter = '/OGC:WFS.*/'

  protected async getBucketLabel(bucket: TermBucket) {
    return firstValueFrom(
      this.translateService.get(
        `search.filters.availableServices.${bucket.term}`
      )
    )
  }

  protected getAggregations(): AggregationsParams {
    return {
      availableServices: {
        type: 'filters',
        filters: {
          view: `+linkProtocol:${this.linkProtocolViewFilter}`,
          download: `+linkProtocol:${this.linkProtocolDownloadFilter}`,
        },
      },
    }
  }

  getFiltersForValues(values: FieldValue[]): Observable<FieldFilters> {
    const filters: FieldFilter = {}
    if (values.includes('view')) filters[this.linkProtocolViewFilter] = true
    if (values.includes('download'))
      filters[this.linkProtocolDownloadFilter] = true

    return of({
      linkProtocol: filters,
    })
  }

  getValuesForFilter(filters: FieldFilters): Observable<FieldValue[]> {
    const linkFilter = filters.linkProtocol
    if (!linkFilter) return of([])
    const values = []
    if (linkFilter[this.linkProtocolViewFilter]) values.push('view')
    if (linkFilter[this.linkProtocolDownloadFilter]) values.push('download')
    return of(values)
  }
}

/**
 * This class is meant to be used with the legacy filter on `resourceType` (now deprecated, the use of `recordKind` field is recommended).
 * Since creating filters on the same ES field is not possible, in order to make the resource type filter still working,
 * we create an ES on the fly: `resourceTypeLegacy` that references the `resourceType` under the hood.
 * @deprecated Use `recordKind` field instead.
 */
export class ResourceTypeLegacyField extends TranslatedSearchField {
  constructor(injector: Injector) {
    super('resourceTypeLegacy', injector, 'asc')

    // Ask ES to create a field on the fly: 'resourceTypeLegacy' that is in fact, 'resourceType'
    this.esService.registerRuntimeField(
      'resourceTypeLegacy',
      `for (resourceType in doc.resourceType) { emit(resourceType) }`
    )
  }
}

export class RecordKindField extends SimpleSearchField {
  TYPE_MAPPING = {
    dataset: ['dataset', 'series', 'featureCatalog'],
    service: ['service'],
    reuse: Object.entries(PossibleResourceTypes)
      .filter(([_, v]) => v === 'reuse')
      .map(([k]) => k), // = ['application', 'map', 'staticMap', 'interactiveMap', ...]
  }

  constructor(injector: Injector) {
    super('resourceType', injector, 'asc')
  }

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    return this.repository.aggregate(this.getAggregations()).pipe(
      map(
        (response) =>
          (response[this.esFieldName] as AggregationBuckets).buckets || []
      ),
      map((buckets: TermBucket[]) => {
        const counts = buckets.reduce(
          (acc, { term, count }) => {
            const value = term.toString()
            const key = this.TYPE_MAPPING.reuse.includes(value)
              ? 'reuse'
              : this.TYPE_MAPPING.dataset.includes(value)
                ? 'dataset'
                : value

            acc[key] = (acc[key] || 0) + count
            return acc
          },
          {} as Record<string, number>
        )

        return Object.keys(this.TYPE_MAPPING).map((type) => ({
          label: type,
          value: type,
          count: counts[type] ?? 0,
        }))
      })
    )
  }

  getFiltersForValues(values: FieldValue[]): Observable<FieldFilters> {
    const filters = {
      [this.esFieldName]: values.reduce((acc, value) => {
        if (value === '') return { ...acc, [value]: true }

        const keysToAdd = this.TYPE_MAPPING[value] || [value]
        keysToAdd.forEach((key: string) => (acc[key] = true))

        return acc
      }, {}),
    }

    return of(filters)
  }

  getValuesForFilter(filters: FieldFilters): Observable<FieldValue[]> {
    const filter = filters[this.esFieldName]
    if (!filter) return of([])

    const activeValues = Object.keys(filter).filter((v) => filter[v])
    const activeTypes = Object.keys(this.TYPE_MAPPING).filter((type) =>
      this.TYPE_MAPPING[type].every((t: string) => activeValues.includes(t))
    )

    // Allow unknown values eg. 'type=somethingnotexist' (for UI to select none)
    const allTypes = [].concat(...Object.values(this.TYPE_MAPPING))
    const unknownValues = activeValues.filter(
      (value) => !allTypes.includes(value)
    )

    return of([...activeTypes, ...unknownValues])
  }
}
