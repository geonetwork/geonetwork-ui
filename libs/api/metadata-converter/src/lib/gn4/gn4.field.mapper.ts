import {
  getAsArray,
  getAsUrl,
  getFirstValue,
  mapContact,
  selectFallback,
  selectFallbackFields,
  selectField,
  selectTranslatedField,
  selectTranslatedValue,
  SourceWithUnknownProps,
  toDate,
} from './atomic-operations'
import { MetadataUrlService } from './metadata-url.service'
import { Injectable } from '@angular/core'
import { getStatusFromStatusCode } from '../iso19139/codelists/status.mapper'
import { getUpdateFrequencyFromFrequencyCode } from '../iso19139/codelists/update-frequency.mapper'
import {
  AccessConstraintType,
  CatalogRecord,
  DatasetDistribution,
  DatasetDistributionType,
  DatasetDownloadDistribution,
  DatasetServiceDistribution,
  OnlineLinkResource,
} from '@geonetwork-ui/common/domain/record'
import { matchProtocol } from '../common/distribution.mapper'
import { LangService } from '@geonetwork-ui/util/i18n'

type ESResponseSource = SourceWithUnknownProps

type EsFieldMapperFn = (
  output: Partial<CatalogRecord>,
  source: ESResponseSource
) => Partial<CatalogRecord>

@Injectable({
  providedIn: 'root',
})
export class Gn4FieldMapper {
  constructor(
    private metadataUrlService: MetadataUrlService,
    private langService: LangService
  ) {}

  private lang3 = this.langService.gnLang

  protected fields: Record<string, EsFieldMapperFn> = {
    id: (output, source) =>
      this.addExtra({ id: selectField(source, 'id') }, output),
    uuid: (output, source) => {
      const uuid = selectField<string>(source, 'uuid')
      const landingPage = getAsUrl(this.metadataUrlService.getUrl(uuid))
      return { ...output, uniqueIdentifier: uuid, landingPage }
    },
    resourceTitleObject: (output, source) => ({
      ...output,
      title: selectFallback(
        selectTranslatedField(source, 'resourceTitleObject', this.lang3),
        'no title'
      ),
    }),
    resourceAbstractObject: (output, source) => ({
      ...output,
      abstract: selectFallback(
        selectTranslatedField(source, 'resourceAbstractObject', this.lang3),
        'no title'
      ),
    }),
    overview: (output, source) => {
      const firstOverview = getFirstValue(selectField(source, 'overview'))
      const description = selectTranslatedValue<string>(
        selectField(firstOverview, 'text'),
        this.lang3
      )
      return {
        ...output,
        overviews: [
          {
            url: getAsUrl(selectFallbackFields(firstOverview, 'url', 'data')),
            ...(description ? { description } : {}),
          },
        ],
      }
    },
    cl_status: (output, source) => ({
      ...output,
      status: getStatusFromStatusCode(
        getFirstValue(selectField(source, 'cl_status'))
      ),
    }),
    cl_maintenanceAndUpdateFrequency: (output, source) => ({
      ...output,
      updateFrequency: getUpdateFrequencyFromFrequencyCode(
        selectField(
          getFirstValue(
            selectField(source, 'cl_maintenanceAndUpdateFrequency')
          ),
          'key'
        )
      ),
    }),
    creationDateForResource: (output, source) => ({
      ...output,
      datasetCreated: toDate(
        getFirstValue(selectField<string>(source, 'creationDateForResource'))
      ),
    }),
    createDate: (output, source) => ({
      ...output,
      recordCreated: toDate(selectField<string>(source, 'createDate')),
    }),
    changeDate: (output, source) => ({
      ...output,
      recordUpdated: toDate(selectField<string>(source, 'changeDate')),
    }),
    link: (output, source) => {
      const rawLinks = getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'link')
      )
      const distributions = rawLinks
        .map((link) => this.mapLink(link))
        .filter((v) => v !== null)
      return {
        ...output,
        distributions,
      }
    },
    contact: (output, source) => ({
      ...output,
      contacts: [
        mapContact(getFirstValue(selectField(source, 'contact')), this.lang3),
      ],
    }),
    contactForResource: (output, source) => ({
      ...output,
      contactsForResource: [
        ...('contactsForResource' in output &&
        Array.isArray(output.contactsForResource)
          ? output.contactsForResource
          : []),
        ...getAsArray(selectField(source, 'contactForResource')).map(
          (contact) => mapContact(contact, this.lang3)
        ),
      ],
    }),
    sourceCatalogue: (output, source) => {
      return this.addExtra(
        {
          catalogUuid: selectFallback(
            selectField(source, 'sourceCatalogue'),
            'no title'
          ),
        },
        output
      )
    },
    tag: (output, source) => ({
      ...output,
      keywords: getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'tag')
      ).map((tag) => selectTranslatedValue<string>(tag, this.lang3)),
    }),
    inspireTheme: (output, source) => ({
      ...output,
      themes: getAsArray(selectField(source, 'inspireTheme_syn')),
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
    licenseObject: (output, source) => ({
      ...output,
      licenses: getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'licenseObject')
      ).map((license) => {
        const link = getAsUrl(selectField(license, 'link'))
        return {
          text: selectTranslatedValue<string>(license, this.lang3),
          ...(link ? { link } : {}),
        }
      }),
    }),
    lineageObject: (output, source) => ({
      ...output,
      lineage: selectTranslatedField(source, 'lineageObject', this.lang3),
    }),
    mainLanguage: (output) => output,
    userSavedCount: (output, source) =>
      this.addExtra(
        {
          favoriteCount: parseInt(selectField(source, 'userSavedCount')),
        },
        output
      ),
    isOpenData: (output, source) =>
      this.addExtra(
        {
          isOpenData: selectField(source, 'isOpenData') !== 'false',
        },
        output
      ),
    isPublishedToAll: (output, source) =>
      this.addExtra(
        {
          isPublishedToAll: selectField(source, 'isPublishedToAll') !== 'false',
        },
        output
      ),
    userinfo: (output, source) =>
      this.addExtra(
        {
          ownerInfo: selectField(source, 'userinfo'),
        },
        output
      ),
    cl_hierarchyLevel: (output, source) => {
      const hierarchyLevel = selectField(
        getFirstValue(selectField(source, 'cl_hierarchyLevel')),
        'key'
      )
      const kind = hierarchyLevel === 'service' ? 'service' : 'dataset'
      return {
        ...output,
        kind,
      }
    },
  }

  private genericField = (output) => output

  private constraintField = (fieldName: string, output, source) => ({
    ...output,
    ...(fieldName.endsWith('UseLimitationObject')
      ? {
          useLimitations: [
            ...(output.useLimitations || []),
            ...selectField<SourceWithUnknownProps[]>(source, fieldName).map(
              (source: SourceWithUnknownProps) =>
                selectTranslatedValue(source, this.lang3)
            ),
          ],
        }
      : {
          accessConstraints: [
            ...(output.accessConstraints || []),
            ...selectField<SourceWithUnknownProps[]>(source, fieldName).map(
              (field) => ({
                text: selectTranslatedValue(field, this.lang3),
                type: this.getConstraintsType(fieldName),
              })
            ),
          ],
        }),
  })

  private getConstraintsType(indexField: string): AccessConstraintType {
    switch (indexField) {
      case 'MD_LegalConstraintsUseLimitationObject':
        return 'legal'
      case 'MD_SecurityConstraintsUseLimitationObject':
        return 'security'
      case 'MD_ConstraintsUseLimitationObject':
      default:
        return 'other'
    }
  }

  getMappingFn(fieldName: string) {
    return fieldName in this.fields ? this.fields[fieldName] : this.genericField
  }

  getLinkType(url: string, protocol?: string): DatasetDistributionType {
    if (!protocol) {
      return 'link'
    }
    if (
      (/^ESRI:REST/.test(protocol) && /FeatureServer/.test(url)) ||
      /^OGC:WMS/.test(protocol) ||
      /^OGC:WFS/.test(protocol) ||
      /^OGC:WMTS/.test(protocol)
    ) {
      return 'service'
    }
    if (/^WWW:DOWNLOAD/.test(protocol)) {
      return 'download'
    }
    return 'link'
  }

  mapLink = (
    sourceLink: SourceWithUnknownProps
  ): DatasetDistribution | null => {
    const url = getAsUrl(
      selectFallback(
        selectTranslatedField<string>(sourceLink, 'urlObject', this.lang3),
        selectField<string>(sourceLink, 'url')
      )
    )
    const name = selectFallback(
      selectTranslatedField<string>(sourceLink, 'nameObject', this.lang3),
      selectField<string>(sourceLink, 'name')
    )
    const description = selectFallback(
      selectTranslatedField<string>(
        sourceLink,
        'descriptionObject',
        this.lang3
      ),
      selectField<string>(sourceLink, 'description')
    )
    // no url: fail early
    if (url === null) {
      // TODO: collect errors at the record level?
      console.warn('A link without valid URL was found', sourceLink)
      return null
    }

    const protocol = selectField<string>(sourceLink, 'protocol')
    const type = this.getLinkType(url.toString(), protocol)
    const accessServiceProtocol = matchProtocol(protocol)
    const mimeTypeMatches =
      protocol && protocol.match(/^WWW:DOWNLOAD:(.+\/.+)$/)
    const mimeType = mimeTypeMatches && mimeTypeMatches[1]

    const distribution = {
      ...(name && { name }),
      ...(description && { description }),
    }
    switch (type) {
      case 'service':
        return {
          ...distribution,
          type,
          url: url,
          accessServiceProtocol,
        } as DatasetServiceDistribution
      case 'link':
        return {
          ...distribution,
          type,
          url: url,
        } as OnlineLinkResource
      case 'download':
        return {
          ...distribution,
          type,
          url: url,
          ...(mimeType && { mimeType }),
        } as DatasetDownloadDistribution
    }
  }

  private addExtra = (value: object, output: Partial<CatalogRecord>) => ({
    ...output,
    extras: { ...(output.extras || {}), ...value },
  })
}
