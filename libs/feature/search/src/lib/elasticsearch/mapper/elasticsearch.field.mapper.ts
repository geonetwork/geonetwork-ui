import { Injectable } from '@angular/core'
import { MetadataUrlService, RecordSummary } from '@geonetwork-ui/util/shared'

type ESResponseSource = any

type EsFieldMapperFn = (
  output: RecordSummary,
  source: ESResponseSource
) => RecordSummary
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

  fields: Record<string, EsFieldMapperFn> = {
    uuid: (output: RecordSummary, source: ESResponseSource) => {
      this.mapGenericField(output, source, 'uuid')
      output.metadataUrl = this.metadataUrlService.getUrl(source.uuid)
      return output
    },
    resourceTitleObject: (output: RecordSummary, source: ESResponseSource) =>
      this.mapTranslatedField(
        output,
        source,
        'resourceTitleObject',
        'title',
        'no title'
      ),
    resourceAbstractObject: (output: RecordSummary, source: ESResponseSource) =>
      this.mapTranslatedField(
        output,
        source,
        'resourceAbstractObject',
        'abstract',
        'no abstract'
      ),
    overview: (output: RecordSummary, source: ESResponseSource) => {
      const overview = this.getFirstValue(source.overview)
      output.thumbnailUrl = overview?.data || overview?.url || ''
      return output
    },
    codelist_status_text: (output: RecordSummary, source: ESResponseSource) => {
      output.updateFrequency = this.getFirstValue(source.codelist_status_text)
      return output
    },
    logo: (output: RecordSummary, source: ESResponseSource) => {
      output.logoUrl = `/geonetwork${source.logo}`
      return output
    },
    resourceDate: (output: RecordSummary, source: ESResponseSource) => {
      return output
    },
    resourceIdentifier: (output: RecordSummary, source: ESResponseSource) => {
      return output
    },
    resourceLanguage: (output: RecordSummary, source: ESResponseSource) => {
      return output
    },
    resourceTemporalDateRange: (
      output: RecordSummary,
      source: ESResponseSource
    ) => {
      return output
    },
    resourceTemporalExtentDateRange: (
      output: RecordSummary,
      source: ESResponseSource
    ) => {
      return output
    },
    resourceType: (output: RecordSummary, source: ESResponseSource) => {
      return output
    },
  }

  private getFirstValue(field) {
    return Array.isArray(field) ? field[0] : field
  }
}
