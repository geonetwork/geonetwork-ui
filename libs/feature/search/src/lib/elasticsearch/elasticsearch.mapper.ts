import { Injectable } from '@angular/core'
import {
  EsSearchResponse,
  MetadataUrlService,
  RecordSummary,
} from '@geonetwork-ui/util/shared'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchMapper {
  constructor(private metadataUrlService: MetadataUrlService) {}

  toRecordSummaries(
    response: EsSearchResponse,
    apiPath?: string
  ): RecordSummary[] {
    return response.hits.hits.map((hit) => this.toRecordSummary(hit, apiPath))
  }

  toRecordSummary(hit: any, apiPath?: string) {
    const overview = this.getFirstValue(hit._source.overview)
    const thumbnailUrl = overview?.data || overview?.url || ''
    const metadataUrl = this.metadataUrlService.getUrl(
      hit._source.uuid,
      apiPath
    )
    return {
      uuid: hit._id,
      id: hit._source.id,
      title: hit._source.resourceTitleObject?.default || 'no title',
      abstract: hit._source.resourceAbstractObject?.default || 'no abstract',
      thumbnailUrl,
      metadataUrl,
      downloadable: (hit as any).download,
      viewable: (hit as any).view,
      logoUrl: `/geonetwork${hit._source.logo}`,
      updateFrequency: this.getFirstValue(hit._source.codelist_status_text),
    }
  }

  private getFirstValue(field) {
    return Array.isArray(field) ? field[0] : field
  }
}
