import { Injectable } from '@angular/core'
import {
  getAsArray,
  getAsUrl,
  getFirstValue,
  LinkClassifierService,
  LinkUsage,
  MetadataLink,
  MetadataLinkType,
  MetadataRecord,
  selectFallback,
  selectFallbackFields,
  selectField,
  selectTranslatedField,
  selectTranslatedValue,
  SourceWithUnknownProps,
  toDate,
} from '@geonetwork-ui/util/shared'
import { MetadataUrlService } from '../service/metadata-url.service'

type ESResponseSource = SourceWithUnknownProps

type EsFieldMapperFn = (
  output: Partial<MetadataRecord>,
  source: ESResponseSource
) => Partial<MetadataRecord>

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchFieldMapper {
  constructor(
    private metadataUrlService: MetadataUrlService,
    private linkClassifier: LinkClassifierService
  ) {}

  protected fields: Record<string, EsFieldMapperFn> = {
    id: (output, source) => ({
      ...output,
      id: selectField(source, 'id'),
    }),
    uuid: (output, source) => {
      const uuid = selectField<string>(source, 'uuid')
      const metadataUrl = this.metadataUrlService.getUrl(uuid)
      return { ...output, uuid, metadataUrl }
    },
    resourceTitleObject: (output, source) => ({
      ...output,
      title: selectFallback(
        selectTranslatedField(source, 'resourceTitleObject'),
        'no title'
      ),
    }),
    resourceAbstractObject: (output, source) => ({
      ...output,
      abstract: selectFallback(
        selectTranslatedField(source, 'resourceAbstractObject'),
        'no title'
      ),
    }),
    overview: (output, source) => ({
      ...output,
      thumbnailUrl: getAsUrl(
        selectFallback(
          selectFallbackFields(
            getFirstValue(selectField(source, 'overview')),
            'data',
            'url'
          ),
          ''
        )
      ),
    }),
    cl_status: (output, source) => ({
      ...output,
      updateStatus: selectTranslatedValue(
        getFirstValue(selectField(source, 'cl_status'))
      ),
    }),
    cl_maintenanceAndUpdateFrequency: (output, source) => ({
      ...output,
      updateFrequency: selectTranslatedValue(
        getFirstValue(selectField(source, 'cl_maintenanceAndUpdateFrequency'))
      ),
    }),
    creationDateForResource: (output, source) => ({
      ...output,
      dataCreatedOn: toDate(
        getFirstValue(selectField<string>(source, 'creationDateForResource'))
      ),
    }),
    createDate: (output, source) => ({
      ...output,
      createdOn: toDate(selectField<string>(source, 'createDate')),
    }),
    changeDate: (output, source) => ({
      ...output,
      updatedOn: toDate(selectField<string>(source, 'changeDate')),
    }),
    link: (output, source) => {
      const rawLinks = getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'link')
      )
      const links = rawLinks
        .map((link) => this.mapLink(link))
        .filter((v) => v !== null)
      return {
        ...output,
        links,
        hasDownloads: links.some((link) =>
          this.linkClassifier.hasUsage(link, LinkUsage.DOWNLOAD)
        ),
        hasMaps: links.some((link) =>
          this.linkClassifier.hasUsage(link, LinkUsage.MAP_API)
        ),
      }
    },
    sourceCatalogue: (output, source) => ({
      ...output,
      catalogUuid: selectFallback(
        selectField(source, 'sourceCatalogue'),
        'no title'
      ),
    }),
    tag: (output, source) => ({
      ...output,
      keywords: getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'tag')
      ).map((tag) => selectTranslatedValue<string>(tag)),
    }),
    MD_ConstraintsUseLimitationObject: (output, source) =>
      this.constraintField('MD_ConstraintsUseLimitationObject', output, source),
    MD_LegalConstraintsUseLimitationObject: (output, source) =>
      this.constraintField(
        'MD_LegalConstraintsUseLimitationObject',
        output,
        source
      ),
    MD_LegalConstraintsOtherConstraintsObject: (output, source) =>
      this.constraintField(
        'MD_LegalConstraintsOtherConstraintsObject',
        output,
        source
      ),
    MD_SecurityConstraintsUseLimitationObject: (output, source) =>
      this.constraintField(
        'MD_SecurityConstraintsUseLimitationObject',
        output,
        source
      ),
    lineageObject: (output, source) => ({
      ...output,
      lineage: selectTranslatedField(source, 'lineageObject'),
    }),
    mainLanguage: (output) => output,
    userSavedCount: (output, source) => ({
      ...output,
      favoriteCount: parseInt(selectField(source, 'userSavedCount')),
    }),
    userinfo: (output, source) => ({
      ...output,
      ownerInfo: selectField(source, 'userinfo'),
    }),
    isOpenData: (output, source) => ({
      ...output,
      isOpenData: selectField(source, 'isOpenData') !== 'false',
    }),
    isPublishedToAll: (output, source) => ({
      ...output,
      isPublishedToAll: selectField(source, 'isPublishedToAll') !== 'false',
    }),
  }

  private genericField = (output) => output

  private constraintField = (fieldName: string, output, source) => ({
    ...output,
    constraints: [
      ...(output.constraints || []),
      ...selectField<unknown[]>(source, fieldName).map(selectTranslatedValue),
    ],
  })

  getMappingFn(fieldName: string) {
    return fieldName in this.fields ? this.fields[fieldName] : this.genericField
  }

  getLinkType(url: string, protocol?: string): MetadataLinkType {
    if (!protocol) return MetadataLinkType.OTHER
    if (/^ESRI:REST/.test(protocol) && /FeatureServer/.test(url))
      return MetadataLinkType.ESRI_REST
    if (/^OGC:WMS/.test(protocol)) return MetadataLinkType.WMS
    if (/^OGC:WFS/.test(protocol)) return MetadataLinkType.WFS
    if (/^OGC:WMTS/.test(protocol)) return MetadataLinkType.WMTS
    if (/^WWW:DOWNLOAD/.test(protocol)) return MetadataLinkType.DOWNLOAD
    if (protocol === 'WWW:LINK:LANDING_PAGE')
      return MetadataLinkType.LANDING_PAGE
    return MetadataLinkType.OTHER
  }

  mapLink(sourceLink: SourceWithUnknownProps): MetadataLink | null {
    const url = getAsUrl(selectField<string>(sourceLink, 'url'))
    // no url: fail early
    if (url === null) {
      // TODO: collect errors at the record level?
      console.warn('A link without valid URL was found', sourceLink)
      return null
    }

    const protocolMatch = /^(https?|ftp):/.test(url)
    if (!protocolMatch) {
      // TODO: collect errors at the record level?
      console.warn(
        'A link with an unsupported protocol URL was found; supported protocols are HTTP, HTTPS and FTP',
        sourceLink
      )
      return null
    }

    const name = selectField<string>(sourceLink, 'name')
    const description = selectField<string>(sourceLink, 'description')
    const label = description || name
    const protocol = selectField<string>(sourceLink, 'protocol')

    const mimeTypeMatches =
      protocol && protocol.match(/^WWW:DOWNLOAD:(.+\/.+)$/)
    const mimeType = mimeTypeMatches && mimeTypeMatches[1]

    const type = this.getLinkType(url, protocol)

    return {
      url,
      type,
      ...(name && { name }),
      ...(description && { description }),
      ...(label && { label }),
      ...(protocol && { protocol }),
      ...(mimeType && { mimeType }),
    }
  }
}
