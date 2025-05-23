import {
  getArrayItem,
  getAsArray,
  getAsUrl,
  getFirstValue,
  mapContact,
  mapKeywords,
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
import { getStatusFromStatusCode } from '../iso19139/utils/status.mapper'
import { getUpdateFrequencyFromFrequencyCode } from '../iso19139/utils/update-frequency.mapper'
import {
  CatalogRecord,
  Constraint,
  DatasetSpatialExtent,
  OnlineResource,
  OnlineResourceType,
} from '@geonetwork-ui/common/domain/model/record'
import { matchProtocol } from '../common/distribution.mapper'
import { Thesaurus } from './types'
import { getResourceType, getReuseType } from '../common/resource-types'
import { TranslateService } from '@ngx-translate/core'
import {
  getLang2FromLang3,
  getLocalizedIndexKey,
} from '@geonetwork-ui/util/i18n'

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
    private translateService: TranslateService
  ) {}

  private get lang3() {
    return getLocalizedIndexKey(this.translateService.currentLang)
  }

  protected fields: Record<string, EsFieldMapperFn> = {
    id: (output, source) =>
      this.addExtra({ id: selectField(source, 'id') }, output),
    uuid: (output, source) => {
      const uuid = selectField<string>(source, 'uuid')
      const landingPage = getAsUrl(this.metadataUrlService.getUrl(uuid))
      return { ...output, uniqueIdentifier: uuid, landingPage }
    },
    qualityScore: (output, source) =>
      this.addExtra(
        { qualityScore: selectField(source, 'qualityScore') },
        output
      ),
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
    cl_topic: (output, source) => ({
      ...output,
      topics: [
        ...(output.topics || []),
        ...getAsArray(
          selectField<SourceWithUnknownProps[]>(source, 'cl_topic')
        ).map((topic) => selectTranslatedValue<string>(topic, this.lang3)),
      ],
    }),
    cl_status: (output, source) => ({
      ...output,
      status: getStatusFromStatusCode(
        selectField(getFirstValue(selectField(source, 'cl_status')), 'key')
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
      resourceCreated: toDate(
        getFirstValue(selectField<string>(source, 'creationDateForResource'))
      ),
    }),
    revisionDateForResource: (output, source) => ({
      ...output,
      resourceUpdated: toDate(
        getFirstValue(selectField<string>(source, 'revisionDateForResource'))
      ),
    }),
    publicationDateForResource: (output, source) => ({
      ...output,
      resourcePublished: toDate(
        selectField<string>(source, 'publicationDateForResource')
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
    publicationDate: (output, source) => ({
      ...output,
      recordPublished: toDate(selectField<string>(source, 'publicationDate')),
    }),
    resourceLanguage: (output, source) => {
      const langList = getAsArray(
        selectField<string>(source, 'resourceLanguage')
      )
      const languages = langList.map(getLang2FromLang3)
      const defaultLanguage = output.defaultLanguage ?? languages[0] ?? null // set the first language as main one as fallback

      return {
        ...output,
        defaultLanguage,
      }
    },
    otherLanguage: (output, source) => {
      const langList = getAsArray(selectField<string>(source, 'otherLanguage'))
      const languages = langList.map(getLang2FromLang3)
      const defaultLanguage = output.defaultLanguage ?? languages[0] ?? null
      const otherLanguages = languages.filter(
        (lang) => lang !== defaultLanguage
      )

      return {
        ...output,
        otherLanguages,
      }
    },
    mainLanguage: (output, source) => {
      const language = selectField<string>(source, 'mainLanguage')
      return {
        ...output,
        defaultLanguage: language ? getLang2FromLang3(language) : null,
      }
    },
    link: (output, source) => {
      const rawLinks = getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'link')
      )
      const onlineResources = rawLinks
        .map((link) => this.mapLink(link))
        .filter((v) => v !== null)
      return {
        ...output,
        onlineResources,
      } as CatalogRecord
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
    allKeywords: (output, source) => ({
      ...output,
      keywords: mapKeywords(
        selectField<Thesaurus[]>(source, 'allKeywords'),
        this.lang3
      ),
    }),
    inspireTheme: (output, source) => ({
      ...output,
      topics: [
        ...(output.topics || []),
        ...getAsArray(selectField(source, 'inspireTheme_syn')),
      ],
    }),
    MD_ConstraintsUseLimitationObject: (output, source) =>
      this.constraintField(
        'other',
        output,
        getAsArray(selectField(source, 'MD_ConstraintsUseLimitationObject'))
      ),
    MD_LegalConstraintsUseLimitationObject: (output, source) =>
      this.constraintField(
        'legal',
        output,
        getAsArray(
          selectField(source, 'MD_LegalConstraintsUseLimitationObject')
        )
      ),
    MD_LegalConstraintsOtherConstraintsObject: (output, source) =>
      this.constraintField(
        'legal',
        output,
        getAsArray(
          selectField(source, 'MD_LegalConstraintsOtherConstraintsObject')
        )
      ),
    MD_SecurityConstraintsUseLimitationObject: (output, source) =>
      this.constraintField(
        'security',
        output,
        getAsArray(
          selectField(source, 'MD_SecurityConstraintsUseLimitationObject')
        )
      ),
    licenseObject: (output, source) =>
      this.constraintField(
        'license',
        output,
        getAsArray(selectField(source, 'licenseObject'))
      ),
    lineageObject: (output, source) => ({
      ...output,
      lineage: selectTranslatedField(source, 'lineageObject', this.lang3),
    }),
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
    featureTypes: (output, source) =>
      this.addExtra(
        {
          featureTypes: selectField(source, 'featureTypes'),
        },
        output
      ),
    related: (output, source) => {
      const fcatSource = selectField(
        getFirstValue(
          selectField(
            <SourceWithUnknownProps>selectField(source, 'related'),
            'fcats'
          )
        ) ?? {},
        '_source'
      )
      const featureCatalogIdentifier: string = selectField(
        <SourceWithUnknownProps>fcatSource,
        'uuid'
      )
      const sourceOfLinks = getAsArray(
        selectField(
          <SourceWithUnknownProps>selectField(source, 'related'),
          'hassources'
        )
      )
      const sourceOfIdentifiers: string[] = sourceOfLinks
        .filter((link) => link['origin'] === 'catalog')
        .map((link) => {
          return selectField(
            selectField(<SourceWithUnknownProps>link, '_source'),
            'uuid'
          )
        })
      const extraValues: Record<string, string | string[]> = {}
      if (featureCatalogIdentifier) {
        extraValues.featureCatalogIdentifier = featureCatalogIdentifier
      }
      if (sourceOfIdentifiers && sourceOfIdentifiers.length > 0) {
        extraValues.sourceOfIdentifiers = sourceOfIdentifiers
      }
      return Object.keys(extraValues).length > 0
        ? this.addExtra(extraValues, output)
        : output
    },
    recordLink: (output, source) => {
      const recordLinks = getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'recordLink')
      )
      const sourcesIdentifiers: string[] = recordLinks
        .filter(
          (link) => link['origin'] === 'catalog' && link['type'] === 'sources'
        )
        .map((link) => selectField(<SourceWithUnknownProps>link, 'to'))

      return sourcesIdentifiers && sourcesIdentifiers.length > 0
        ? this.addExtra(
            {
              sourcesIdentifiers,
            },
            output
          )
        : output
    },
    isPublishedToAll: (output, source) =>
      this.addExtra(
        {
          isPublishedToAll: selectField(source, 'isPublishedToAll'),
        },
        output
      ),
    isHarvested: (output, source) =>
      this.addExtra(
        {
          isHarvested: selectField(source, 'isHarvested') !== 'false',
        },
        output
      ),
    edit: (output, source) =>
      this.addExtra(
        {
          edit: selectField(source, 'edit'),
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
    resourceType: (output, source) => {
      const resourceType = getFirstValue(selectField(source, 'resourceType'))
      const kind = getResourceType(resourceType)
      const reuseType = getReuseType(resourceType)
      return {
        ...output,
        kind,
        ...(reuseType && { reuseType }),
      } as CatalogRecord
    },
    geom: (output, source) => {
      const geoms = getAsArray(selectField(source, 'geom'))
      const shapes = getAsArray(selectField(source, 'shape'))
      const extentDescriptions = getAsArray(
        selectField(source, 'extentDescriptionObject')
      )
      const spatialExtents = getAsArray(selectField(source, 'spatialExtents'))
      return {
        ...output,
        spatialExtents: [
          ...spatialExtents,
          ...geoms.map((geom, index) => {
            const description = selectTranslatedValue(
              getArrayItem(extentDescriptions, index),
              this.lang3
            )
            const geometry = shapes[index] ?? geom
            return {
              ...(description !== null ? { description } : null),
              geometry,
            } as DatasetSpatialExtent
          }),
        ],
      }
    },
    resourceTemporalExtentDateRange: (output, source) => {
      const ranges = getAsArray(
        selectField(source, 'resourceTemporalExtentDateRange')
      )
      return {
        ...output,
        temporalExtents: ranges.map((range) => {
          const start = selectField(range, 'gte')
          const end = selectField(range, 'lte')
          return {
            ...(start !== null ? { start: toDate(start) } : null),
            ...(end !== null ? { end: toDate(end) } : null),
          }
        }),
      }
    },
  }

  private genericField = (output) => output

  private constraintField = (
    type: 'license' | 'legal' | 'security' | 'other',
    output: Partial<CatalogRecord>,
    constraintArray: SourceWithUnknownProps[]
  ) => {
    let outputField: string
    switch (type) {
      case 'license':
        outputField = 'licenses'
        break
      case 'legal':
        outputField = 'legalConstraints'
        break
      case 'security':
        outputField = 'securityConstraints'
        break
      case 'other':
        outputField = 'otherConstraints'
        break
    }
    const outputArray: Constraint[] =
      outputField in output ? output[outputField] : []
    outputArray.push(
      ...constraintArray.map((item) => {
        const text = selectTranslatedValue(item, this.lang3) as string
        const url = getAsUrl(selectField(item, 'link'))
        return {
          text,
          ...(url ? { url } : {}),
        }
      })
    )
    const result = {
      ...output,
      [outputField]: outputArray,
    }
    return result
  }

  getMappingFn(fieldName: string) {
    return fieldName in this.fields ? this.fields[fieldName] : this.genericField
  }

  getLinkType(url: string, protocol?: string): OnlineResourceType {
    if (!protocol) {
      return 'link'
    }
    if (
      (/^ESRI:REST/.test(protocol) && /FeatureServer/.test(url)) ||
      /^OGC:WMS/.test(protocol) ||
      /^OGC:WFS/.test(protocol) ||
      /^OGC:WMTS/.test(protocol) ||
      /TMS/i.test(protocol) ||
      /ogc\W*api\W*features/i.test(protocol) ||
      (/^WWW:DOWNLOAD-/.test(protocol) && /data.geopf.fr/.test(url)) // TO DO : change with the good protocol when decided
    ) {
      return 'service'
    }
    if (/^WWW:DOWNLOAD/.test(protocol)) {
      return 'download'
    }
    return 'link'
  }

  mapLink = (sourceLink: SourceWithUnknownProps): OnlineResource | null => {
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
    const descriptionLink = selectField<object>(sourceLink, 'descriptionObject')
    const accessRestricted =
      descriptionLink &&
      'link' in descriptionLink &&
      descriptionLink.link.toString().includes('#MD_RestrictionCode_restricted')
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
          accessRestricted: accessRestricted,
        }
      case 'link':
        return {
          ...distribution,
          type,
          url: url,
        }
      case 'download':
        return {
          ...distribution,
          type,
          url: url,
          ...(mimeType && { mimeType }),
        }
      case 'endpoint':
        return {
          ...distribution,
          type,
          url: url,
          accessServiceProtocol: accessServiceProtocol,
        }
    }
  }

  private addExtra = (value: object, output: Partial<CatalogRecord>) => ({
    ...output,
    extras: { ...(output.extras || {}), ...value },
  })
}
