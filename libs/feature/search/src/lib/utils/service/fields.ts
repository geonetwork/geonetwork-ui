import { firstValueFrom, Observable, of, switchMap } from 'rxjs'
import { ElasticsearchService, SearchFilters } from '@geonetwork-ui/util/shared'
import {
  SearchApiService,
  ToolsApiService,
} from '@geonetwork-ui/data-access/gn4'
import { map, shareReplay } from 'rxjs/operators'
import { Injector } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

export type FieldValue = string | number
export interface FieldAvailableValue {
  value: FieldValue
  label: string
}

export abstract class AbstractSearchField {
  abstract getAvailableValues(): Observable<FieldAvailableValue[]>
  abstract getFiltersForValues(values: FieldValue[]): SearchFilters
  abstract getValuesForFilter(filters: SearchFilters): FieldValue[]
}

export class SimpleSearchField implements AbstractSearchField {
  protected esService = this.injector.get(ElasticsearchService)
  protected searchApiService = this.injector.get(SearchApiService)

  constructor(
    private esFieldName: string,
    private order: 'asc' | 'desc' = 'asc',
    protected injector: Injector
  ) {}

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    return this.searchApiService
      .search(
        'bucket',
        JSON.stringify(
          this.esService.getSearchRequestBody({
            [this.esFieldName]: {
              terms: {
                size: 1000,
                field: this.esFieldName,
                order: {
                  _key: this.order,
                },
              },
            },
          })
        )
      )
      .pipe(
        map(
          (response) => response.aggregations[this.esFieldName]?.buckets || []
        ),
        map((buckets) =>
          buckets.map((bucket) => ({
            label: `${bucket.key} (${bucket.doc_count})`,
            value: bucket.key.toString(),
          }))
        )
      )
  }
  getFiltersForValues(values: FieldValue[]): SearchFilters {
    return {
      [this.esFieldName]: values.reduce((acc, val) => {
        return { ...acc, [val.toString()]: true }
      }, {}),
    }
  }
  getValuesForFilter(filters: SearchFilters): FieldValue[] {
    const filter = filters[this.esFieldName]
    if (!filter) return []
    return typeof filter === 'string'
      ? [filter]
      : Object.keys(filter).filter((v) => filter[v])
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

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    return this.searchApiService
      .search(
        'bucket',
        JSON.stringify(
          this.esService.getSearchRequestBody({
            topic: {
              terms: {
                size: 1000,
                field: 'cl_topic.key',
              },
            },
          })
        )
      )
      .pipe(
        map((response) => response.aggregations.topic?.buckets || []),
        switchMap((buckets) =>
          Promise.all(
            buckets.map(async (bucket) => ({
              label: `${
                (await this.getTopicTranslation(bucket.key)) || bucket.key
              } (${bucket.doc_count})`,
              value: bucket.key.toString(),
            }))
          )
        ),
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
  getFiltersForValues(values: FieldValue[]): SearchFilters {
    return {
      any: values[0] as string,
    }
  }
  getValuesForFilter(filters: SearchFilters): FieldValue[] {
    return filters.any ? [filters.any] : []
  }
}

marker('search.filters.isSpatial.yes')
marker('search.filters.isSpatial.no')

export class IsSpatialSearchField implements AbstractSearchField {
  private esService = this.injector.get(ElasticsearchService)
  private searchApiService = this.injector.get(SearchApiService)
  private translateService = this.injector.get(TranslateService)

  constructor(protected injector: Injector) {
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

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    return this.searchApiService
      .search(
        'bucket',
        JSON.stringify(
          this.esService.getSearchRequestBody({
            isSpatial: {
              terms: {
                size: 2,
                field: 'isSpatial',
              },
            },
          })
        )
      )
      .pipe(
        map((response) => response.aggregations.isSpatial?.buckets || []),
        switchMap((buckets) =>
          Promise.all(
            buckets.map(async (bucket) => {
              const label = await firstValueFrom(
                this.translateService.get(
                  `search.filters.isSpatial.${bucket.key}`
                )
              )
              return {
                label: `${label} (${bucket.doc_count})`,
                value: bucket.key.toString(),
              }
            })
          )
        )
      )
  }
  getFiltersForValues(values: FieldValue[]): SearchFilters {
    const isSpatial = {}
    if (values.length > 0) isSpatial[values[values.length - 1]] = true
    return {
      isSpatial,
    }
  }
  getValuesForFilter(filters: SearchFilters): FieldValue[] {
    const filter = filters.isSpatial
    if (!filter) return []
    const keys = Object.keys(filter)
    return keys.length ? [keys[0]] : []
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

  getAvailableValues(): Observable<FieldAvailableValue[]> {
    return this.searchApiService
      .search(
        'bucket',
        JSON.stringify(
          this.esService.getSearchRequestBody({
            license: {
              terms: {
                size: 10,
                field: 'license',
                order: {
                  _count: 'desc',
                },
              },
            },
          })
        )
      )
      .pipe(
        map((response) => response.aggregations.license?.buckets || []),
        switchMap((buckets) =>
          Promise.all(
            buckets.map(async (bucket) => {
              const label = await firstValueFrom(
                this.translateService.get(
                  `search.filters.license.${bucket.key}`
                )
              )
              return {
                label: `${label} (${bucket.doc_count})`,
                value: bucket.key.toString(),
              }
            })
          )
        )
      )
  }
}
