import { Injectable } from '@angular/core'
import { MetadataUrlService, RecordSummary } from '@geonetwork-ui/util/shared'

type ESResponseSource = any

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchFieldMapper {
  constructor(private metadataUrlService: MetadataUrlService) {}

  mapGenericField(
    output: RecordSummary,
    source: ESResponseSource,
    fieldName: string,
    outputPropName?: string
  ) {
    outputPropName = outputPropName || fieldName
    output[outputPropName] = source[fieldName]
    return output
  }

  mapTranslatedField(
    output: RecordSummary,
    source: ESResponseSource,
    fieldName: string,
    outputPropName?: string,
    defaultValue?: string
  ) {
    outputPropName = outputPropName || fieldName
    output[outputPropName] = source[fieldName]?.default || defaultValue
    return output
  }

  mapUuid(output: RecordSummary, source: ESResponseSource) {
    this.mapGenericField(output, source, 'uuid')
    output.metadataUrl = this.metadataUrlService.getUrl(source.uuid)
  }

  mapResourceTitleObject(output: RecordSummary, source: ESResponseSource) {
    return this.mapTranslatedField(
      output,
      source,
      'resourceTitleObject',
      'title',
      'no title'
    )
  }
  mapResourceAbstractObject(output: RecordSummary, source: ESResponseSource) {
    return this.mapTranslatedField(
      output,
      source,
      'resourceAbstractObject',
      'abstract',
      'no abstract'
    )
  }
  mapOverview(output: RecordSummary, source: ESResponseSource) {
    const overview = this.getFirstValue(source.overview)
    output.thumbnailUrl = overview?.data || overview?.url || ''
    return output
  }
  mapCodelist_status_text(output: RecordSummary, source: ESResponseSource) {
    output.updateFrequency = this.getFirstValue(source.codelist_status_text)
    return output
  }
  mapLogo(output: RecordSummary, source: ESResponseSource) {
    output.logoUrl = `/geonetwork${source.logo}`
    return output
  }
  mapResourceDate(output: RecordSummary, source: ESResponseSource) {
    return output
  }
  mapResourceIdentifier(output: RecordSummary, source: ESResponseSource) {
    return output
  }
  mapResourceLanguage(output: RecordSummary, source: ESResponseSource) {
    return output
  }
  mapResourceTemporalDateRange(
    output: RecordSummary,
    source: ESResponseSource
  ) {
    return output
  }
  mapResourceTemporalExtentDateRange(
    output: RecordSummary,
    source: ESResponseSource
  ) {
    return output
  }
  mapResourceType(output: RecordSummary, source: ESResponseSource) {
    return output
  }

  private getFirstValue(field) {
    return Array.isArray(field) ? field[0] : field
  }
}
