import { Injectable } from '@angular/core'
import { AggreationsTypesEnum } from './facets.model'

@Injectable({
  providedIn: 'root',
})
export class FacetsService {
  constructor() {}

  getUidModel(request, response) {}

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
        }
        listModel.push(blockModel)
      }
    }
    return listModel
  }
}
