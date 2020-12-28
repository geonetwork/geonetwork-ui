import { Injectable } from '@angular/core'
import { AggreationsTypesEnum } from './facets.model'

@Injectable({
  providedIn: 'root',
})
export class FacetsService {
  constructor() {}

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
        if (requestAgg.hasOwnProperty(AggreationsTypesEnum.TERMS)) {
          blockModel = {
            ...blockModel,
            type: AggreationsTypesEnum.TERMS,
            size: requestAgg[AggreationsTypesEnum.TERMS].size,
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
        } else if (requestAgg.hasOwnProperty(AggreationsTypesEnum.HISTOGRAM)) {
          blockModel = {
            ...blockModel,
            type: AggreationsTypesEnum.HISTOGRAM,
            size: requestAgg[AggreationsTypesEnum.HISTOGRAM].size,
          }

          if (requestAgg[AggreationsTypesEnum.HISTOGRAM].keyed) {
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
                  Number(requestAgg[AggreationsTypesEnum.HISTOGRAM].interval)
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
            console.warn(
              'Facet configuration error. Histogram are only supported with keyed mode.' +
                'eg. creationYearForResource: {histogram: { ' +
                'field: "creationYearForResource",' +
                'interval: 5,' +
                'keyed: true,' +
                'min_doc_count: 1}}'
            )
          }
        } else if (requestAgg.hasOwnProperty(AggreationsTypesEnum.FILTERS)) {
          blockModel = {
            ...blockModel,
            type: AggreationsTypesEnum.FILTERS,
            size: requestAgg[AggreationsTypesEnum.FILTERS].size,
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
          console.warn('Unsupported aggregation config.', requestAgg)
        }
        listModel.push(blockModel)
      }
    }
    return listModel
  }
}
