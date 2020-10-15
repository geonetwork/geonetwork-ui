import { RecordSummary } from '@lib/common'
import { SearchResponse } from 'elasticsearch'

export class ElasticsearchMapper {
  response: SearchResponse<any>

  constructor(response: SearchResponse<any>) {
    this.response = response
  }

  toRecordSummary(): RecordSummary[] {
    return this.response.hits.hits.map((hit) => ({
      uuid: hit._id,
      id: hit._source.id,
      title: hit._source.resourceTitleObject?.default || 'no title',
      abstract: hit._source.resourceAbstractObject?.default || 'no abstract',
      thumbnailUrl: this.getFirstValue(hit._source.overview)?.url || '',
      url: `/geonetwork/srv/eng/catalog.search#/metadata/${hit._source.uuid}`,
    }))
  }

  toRecordBrief() {}

  private getFirstValue(field) {
    return Array.isArray(field) ? field[0] : field
  }
}
