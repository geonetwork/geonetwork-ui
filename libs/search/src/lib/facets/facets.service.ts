import { Injectable } from '@angular/core'
import { AggregationsTypesEnum, LogService } from '@lib/common'

@Injectable({
  providedIn: 'root',
})
export class FacetsService {
  constructor(private logger: LogService) {}

  createFacetModel(
    requestAggregations,
    responseAggregations,
    isNested: boolean,
    path: string[] = []
  ) {
    if (requestAggregations === undefined) {
      return
    }
    const listModel = []

    interface AggEntry {
      key: string
      meta: object
      doc_count: number
    }

    for (const key in responseAggregations) {
      if (responseAggregations.hasOwnProperty(key)) {
        const requestAgg = requestAggregations[key]
        const responseAgg = responseAggregations[key]

        let blockModel: any = {
          key,
          items: [],
          path: [...path, key],
        }
        if (requestAgg.hasOwnProperty(AggregationsTypesEnum.TERMS)) {
          blockModel = {
            ...blockModel,
            type: AggregationsTypesEnum.TERMS,
            size: requestAgg[AggregationsTypesEnum.TERMS].size,
            more: responseAgg.sum_other_doc_count > 0,
            includeFilter: requestAgg.terms.include !== undefined,
            excludeFilter: requestAgg.terms.exclude !== undefined,
          }

          responseAgg.buckets.forEach((bucket) => {
            if (bucket.key) {
              const value = bucket.key_as_string || bucket.key
              const itemPath = [...blockModel.path, String(value)]
              const itemModel = {
                value,
                meta: bucket.meta,
                count: bucket.doc_count,
                path: itemPath,
              }
              blockModel.items.push(itemModel)
            }
          })
        } else if (requestAgg.hasOwnProperty(AggregationsTypesEnum.HISTOGRAM)) {
          blockModel = {
            ...blockModel,
            type: AggregationsTypesEnum.HISTOGRAM,
            size: requestAgg[AggregationsTypesEnum.HISTOGRAM].size,
          }

          if (requestAgg[AggregationsTypesEnum.HISTOGRAM].keyed) {
            const entries = Object.entries(responseAgg.buckets)
            for (let p = 0; p < entries.length; p++) {
              const entry: [string, AggEntry] = entries[p] as [string, AggEntry]
              const nextEntry: [string, AggEntry] = entries[p + 1] as [
                string,
                AggEntry
              ]
              const lowerBound = entry[1].key
              const onlyOneBucket = entries.length === 1
              const upperBound = onlyOneBucket
                ? lowerBound +
                  Number(requestAgg[AggregationsTypesEnum.HISTOGRAM].interval)
                : nextEntry
                ? nextEntry[1].key
                : '*'
              const value = lowerBound + '-' + upperBound
              const itemPath = [...blockModel.path, lowerBound]
              const itemModel = {
                value,
                meta: entry[1].meta,
                count: entry[1].doc_count,
                query_string: `+${requestAgg.histogram.field}:[${lowerBound} TO ${upperBound}}`,
                path: itemPath,
              }
              blockModel.items.push(itemModel)
            }
          } else {
            this.logger.warn(
              'Facet configuration error. Histogram are only supported with keyed mode.' +
                'eg. creationYearForResource: {histogram: { ' +
                'field: "creationYearForResource",' +
                'interval: 5,' +
                'keyed: true,' +
                'min_doc_count: 1}}'
            )
          }
        } else if (requestAgg.hasOwnProperty(AggregationsTypesEnum.FILTERS)) {
          blockModel = {
            ...blockModel,
            type: AggregationsTypesEnum.FILTERS,
            size: requestAgg[AggregationsTypesEnum.FILTERS].size,
          }

          Object.entries(responseAgg.buckets).forEach((entry) => {
            const bucket = entry[1] as AggEntry
            const itemPath = [...blockModel.path, entry[0]]
            const itemModel = {
              value: entry[0],
              meta: bucket.meta,
              count: bucket.doc_count,
              path: itemPath,
              query_string:
                requestAgg.filters.filters[entry[0]].query_string.query,
            }
            blockModel.items.push(itemModel)
          })
        } else {
          this.logger.warn('Unsupported aggregation config.', requestAgg)
        }
        listModel.push(blockModel)
      }
    }
    return listModel
  }
}
