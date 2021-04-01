import { Injectable } from '@angular/core'
import { MetadataUrlService, RecordBrief, RecordSummary } from '@lib/common'
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
      link: hit._source.link,
    }))
  }

  toRecordBrief(
    response: SearchResponse<any>,
    apiPath?: string
  ): RecordBrief[] {
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
      link: hit._source.link,
      organization: hit._source.Org,
      type: hit._source.resourceType[0],
    }))
  }

  private getFirstValue(field) {
    return Array.isArray(field) ? field[0] : field
  }
}
