import { firstValueFrom, Observable, of, switchMap } from 'rxjs'
import { ToolsApiService } from '@geonetwork-ui/data-access/gn4'
import { map, shareReplay } from 'rxjs/operators'
import { Injector } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import {
  AggregationBuckets,
  AggregationsParams,
  FieldFilterByExpression,
  FieldFilters,
  TermBucket,
} from '@geonetwork-ui/common/domain/search'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'
import { ElasticsearchService } from '@geonetwork-ui/api/repository/gn4'

export type FieldValue = string | number
export interface FieldAvailableValue {
  value: FieldValue
  label: string
}

export abstract class AbstractSearchField {
  abstract getAvailableValues(): Observable<FieldAvailableValue[]>
  abstract getFiltersForValues(values: FieldValue[]): Observable<FieldFilters>
  abstract getValuesForFilter(filters: FieldFilters): Observable<FieldValue[]>
}

export class SimpleSearchField implements AbstractSearchField {
  protected repository = this.injector.get(RecordsRepositoryInterface)

  // FIXME: this is required to register runtime fields; abstract this as well
  protected esService = this.injector.get(ElasticsearchService)

  constructor(
    protected esFieldName: string,
    private order: 'asc' | 'desc' = 'asc',
    protected injector: Injector
  ) {}

  protected getAggregations(): AggregationsParams {
    return {
      [this.esFieldName]: {
        type: 'terms',
        field: this.esFieldName,
        limit: 1000,
        sort: [this.order, 'key'],
      },
    }
  }

  protected async getBucketLabel(bucket: TermBucket): Promise<string> {
    return bucket.term as string
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
        }))
        return Promise.all(bucketPromises)
      })
    )
  }
  getFiltersForValues(values: FieldValue[]): Observable<FieldFilters> {
    return of({
      [this.esFieldName]: values.reduce((acc, val) => {
        return { ...acc, [val.toString()]: true }
      }, {}),
    })
  }
  getValuesForFilter(filters: FieldFilters): Observable<FieldValue[]> {
    const filter = filters[this.esFieldName]
    if (!filter) return of([])
    const values =
      typeof filter === 'string'
        ? [filter]
        : Object.keys(filter).filter((v) => filter[v])
    return of(values)
  }
}

export class TopicSearchField extends SimpleSearchField {
  private toolsApiService = this.injector.get(ToolsApiService)
  allTranslations = this.toolsApiService
    .getTranslationsPackage1('gnui')
    .pipe(shareReplay(1))

  constructor(injector: Injector) {
    super('cl_topic.key', 'asc', injector)
  }

  private async getTopicTranslation(topicKey: string) {
    return firstValueFrom(
      this.allTranslations.pipe(map((translations) => translations[topicKey]))
    )
  }

  protected async getBucketLabel(bucket: TermBucket) {
    return (await this.getTopicTranslation(bucket.term)) || bucket.term
  }

  getAvailableValues(): Observable<FieldAvailableValue[]> {
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
}

marker('search.filters.isSpatial.yes')
marker('search.filters.isSpatial.no')

export class IsSpatialSearchField extends SimpleSearchField {
  private translateService = this.injector.get(TranslateService)

  constructor(injector: Injector) {
    super('isSpatial', 'asc', injector)
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
    super('license', 'asc', injector)
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
}
