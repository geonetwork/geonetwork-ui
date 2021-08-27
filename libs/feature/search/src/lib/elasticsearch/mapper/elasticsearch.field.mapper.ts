import { Injectable } from '@angular/core'
import {
  MetadataUrlService,
  MetadataRecord,
  MetadataLink,
} from '@geonetwork-ui/util/shared'

type ESResponseSource = any

type EsFieldMapperFn = (
  output: MetadataRecord,
  source: ESResponseSource
) => MetadataRecord
@Injectable({
  providedIn: 'root',
})
export class ElasticsearchFieldMapper {
  constructor(private metadataUrlService: MetadataUrlService) {}

  fields: Record<string, EsFieldMapperFn> = {
    uuid: (output: MetadataRecord, source: ESResponseSource) => {
      this.mapGenericField(output, source, 'uuid')
      output.metadataUrl = this.metadataUrlService.getUrl(source.uuid)
      return output
    },
    resourceTitleObject: (output: MetadataRecord, source: ESResponseSource) =>
      this.mapTranslatedField(
        output,
        source,
        'resourceTitleObject',
        'title',
        'no title'
      ),
    resourceAbstractObject: (
      output: MetadataRecord,
      source: ESResponseSource
    ) =>
      this.mapTranslatedField(
        output,
        source,
        'resourceAbstractObject',
        'abstract',
        'no abstract'
      ),
    overview: (output: MetadataRecord, source: ESResponseSource) => {
      const overview = this.getFirstValue(source.overview)
      output.thumbnailUrl = overview?.data || overview?.url || ''
      return output
    },
    codelist_status_text: (
      output: MetadataRecord,
      source: ESResponseSource
    ) => {
      output.updateFrequency = this.getFirstValue(source.codelist_status_text)
      return output
    },
    logo: (output: MetadataRecord, source: ESResponseSource) => {
      output.logoUrl = `/geonetwork${source.logo}`
      return output
    },
    resourceDate: (output: MetadataRecord, source: ESResponseSource) => {
      return output
    },
    resourceIdentifier: (output: MetadataRecord, source: ESResponseSource) => {
      return output
    },
    resourceLanguage: (output: MetadataRecord, source: ESResponseSource) => {
      return output
    },
    resourceTemporalDateRange: (
      output: MetadataRecord,
      source: ESResponseSource
    ) => {
      return output
    },
    resourceTemporalExtentDateRange: (
      output: MetadataRecord,
      source: ESResponseSource
    ) => {
      return output
    },
    resourceType: (output: MetadataRecord, source: ESResponseSource) => {
      return output
    },
    creationDateForResource: (
      output: MetadataRecord,
      source: ESResponseSource
    ) => {
      this.mapDateField(
        output,
        source,
        'creationDateForResource',
        'dataCreatedOn'
      )
      return output
    },
    createDate: (output: MetadataRecord, source: ESResponseSource) => {
      this.mapDateField(output, source, 'createDate', 'createdOn')
      return output
    },
    changeDate: (output: MetadataRecord, source: ESResponseSource) => {
      this.mapDateField(output, source, 'changeDate', 'updatedOn')
      return output
    },
    link: (output: MetadataRecord, source: ESResponseSource) => {
      this.mapLinks(output, source, true, 'dataLinks')
      this.mapLinks(output, source, false, 'otherLinks')
      return output
    },
  }

  mapGenericField(
    output: MetadataRecord,
    source: ESResponseSource,
    fieldName: string,
    outputPropName?: string
  ) {
    outputPropName = outputPropName || fieldName
    output[outputPropName] = source[fieldName]
    return output
  }

  mapTranslatedField(
    output: MetadataRecord,
    source: ESResponseSource,
    fieldName: string,
    outputPropName?: string,
    defaultValue?: string
  ) {
    outputPropName = outputPropName || fieldName
    output[outputPropName] = source[fieldName]?.default || defaultValue
    return output
  }

  mapDateField(
    output: MetadataRecord,
    source: ESResponseSource,
    fieldName: string,
    outputPropName?: string
  ) {
    outputPropName = outputPropName || fieldName
    output[outputPropName] = new Date(this.getFirstValue(source[fieldName]))
    return output
  }

  mapLinks(
    output: MetadataRecord,
    source: ESResponseSource,
    linksToData: boolean,
    outputPropName?: string
  ) {
    const dataProtocols = ['OGC', 'FILE']
    output[outputPropName] = source.link
      .map((link) => ({
        protocol: link.protocol,
        url: link.url,
        description: link.description,
        name: link.name,
      }))
      .filter(
        (link: MetadataLink) =>
          ('protocol' in link &&
            dataProtocols.some((p) => link.protocol.includes(p))) ===
          linksToData
      )
    return output
  }

  private getFirstValue(field) {
    return Array.isArray(field) ? field[0] : field
  }
}
