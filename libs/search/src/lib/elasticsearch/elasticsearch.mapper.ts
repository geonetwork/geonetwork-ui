import { Injectable } from '@angular/core'
import { MetadataUrlService, RecordSummary } from '@lib/common'
import { SearchResponse } from 'elasticsearch'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchMapper {
  constructor(private metadataUrlService: MetadataUrlService) {}

  toRecordSummary(
    response: SearchResponse<any>,
    apiPath?: string
  ): RecordSummary[] {
    return response.hits.hits.map((hit) => ({
      uuid: hit._id,
      id: hit._source.id,
      title: hit._source.resourceTitleObject?.default || 'no title',
      abstract: hit._source.resourceAbstractObject?.default || 'no abstract',
      thumbnailUrl: this.getFirstValue(hit._source.overview)?.url || '',
      metadataUrl: this.metadataUrlService.getUrl(hit._source.uuid, apiPath),
      downloadable: (hit as any).download,
      viewable: (hit as any).view,
      logoUrl: `/geonetwork${hit._source.logo}`,
      updateFrequency: this.getFirstValue(hit._source.codelist_status_text),
    }))
  }

  toRecordBrief() {}

  private getFirstValue(field) {
    return Array.isArray(field) ? field[0] : field
  }
}
