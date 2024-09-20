import {
  Constraint,
  DatasetOnlineResource,
  GraphicOverview,
  Individual,
  Keyword,
  LanguageCode,
  OnlineResource,
  Organization,
  RecordKind,
  RecordStatus,
  Role,
  ServiceOnlineResource,
  SpatialRepresentationType,
  UpdateFrequency,
  UpdateFrequencyCustom,
} from '@geonetwork-ui/common/domain/model/record'
import { ThesaurusModel } from '@geonetwork-ui/common/domain/model/thesaurus'
import { Geometry } from 'geojson'
import { matchMimeType, matchProtocol } from '../common/distribution.mapper'
import {
  ChainableFunction,
  combine,
  fallback,
  filterArray,
  flattenArray,
  getAtIndex,
  map,
  mapArray,
  pipe,
} from '../function-utils'
import {
  findChildElement,
  findChildrenElement,
  findNestedElement,
  findNestedElements,
  findParent,
  firstChildElement,
  readAttribute,
  readText,
  XmlElement,
} from '../xml-utils'
import { readGeometry } from './utils/geometry'
import { fullNameToParts } from './utils/individual-name'
import { getKeywordTypeFromKeywordTypeCode } from './utils/keyword.mapper'
import { getRoleFromRoleCode } from './utils/role.mapper'
import { getStatusFromStatusCode } from './utils/status.mapper'
import { getUpdateFrequencyFromFrequencyCode } from './utils/update-frequency.mapper'
import { LANG_3_TO_2_MAPPER } from '@geonetwork-ui/util/i18n/language-codes'

export function extractCharacterString(): ChainableFunction<
  XmlElement,
  string
> {
  return pipe(
    fallback(
      findChildElement('gco:CharacterString', false),
      findChildElement('gmx:Anchor', false)
    ),
    readText()
  )
}

export function extractDateTime(): ChainableFunction<XmlElement, Date> {
  return pipe(
    fallback(
      findChildElement('gco:DateTime', false),
      findChildElement('gco:Date', false)
    ),
    readText(),
    map((dateStr) => (dateStr ? new Date(dateStr) : null))
  )
}

export function extractDecimal(): ChainableFunction<XmlElement, number> {
  return pipe(
    findChildElement('gco:Decimal', false),
    readText(),
    map((numberStr) => (numberStr ? Number(numberStr) : null))
  )
}

export function extractUrl(): ChainableFunction<XmlElement, URL> {
  const getUrl = pipe(findChildElement('gmd:URL', false), readText())
  const getCharacterString = pipe(
    findChildElement('gco:CharacterString', false),
    readText()
  )
  const getAnchor = pipe(
    findChildElement('gmx:Anchor', false),
    readAttribute('xlink:href')
  )
  return pipe(
    fallback(getUrl, getAnchor, getCharacterString),
    map((urlStr) => {
      try {
        return new URL(urlStr)
      } catch (e) {
        return null
      }
    })
  )
}

export function extractMandatoryUrl() {
  return fallback(extractUrl(), () => new URL('http://missing'))
}

// from gmd:role
export function extractRole(): ChainableFunction<XmlElement, Role> {
  return pipe(
    findChildElement('gmd:CI_RoleCode'),
    readAttribute('codeListValue'),
    map(getRoleFromRoleCode)
  )
}

// from gmd:CI_ResponsibleParty
export function extractOrganization(): ChainableFunction<
  XmlElement,
  Organization
> {
  const getUrl = pipe(
    findNestedElements(
      'gmd:contactInfo',
      'gmd:CI_Contact',
      'gmd:onlineResource',
      'gmd:CI_OnlineResource',
      'gmd:linkage'
    ),
    getAtIndex(0),
    extractUrl()
  )
  return pipe(
    combine(
      pipe(
        findChildElement('gmd:organisationName', false),
        extractCharacterString()
      ),
      getUrl
    ),
    map(([name, website]) => ({
      name,
      ...(website && { website }),
    }))
  )
}

// from gmd:CI_ResponsibleParty
export function extractIndividual(): ChainableFunction<XmlElement, Individual> {
  const getRole = pipe(findChildElement('gmd:role'), extractRole())
  const getPosition = pipe(
    findChildElement('gmd:positionName'),
    extractCharacterString()
  )
  const getNameParts = pipe(
    findChildElement('gmd:individualName'),
    extractCharacterString(),
    map((fullName) => {
      if (!fullName) return []
      return fullNameToParts(fullName)
    })
  )
  const getOrganization = extractOrganization()
  const getContactRoot = findNestedElement('gmd:contactInfo', 'gmd:CI_Contact')
  const getEmail = pipe(
    getContactRoot,
    findChildElement('gmd:electronicMailAddress'),
    extractCharacterString(),
    map((email) => (email === null ? 'missing@missing.com' : email))
  )
  const getAddress = pipe(
    getContactRoot,
    findNestedElement('gmd:address', 'gmd:CI_Address'),
    combine(
      pipe(
        findChildElement('gmd:deliveryPoint', false),
        extractCharacterString()
      ),
      pipe(findChildElement('gmd:city', false), extractCharacterString()),
      pipe(findChildElement('gmd:postalCode', false), extractCharacterString()),
      pipe(findChildElement('gmd:country', false), extractCharacterString())
    ),
    map((parts) => parts.filter((p) => !!p).join(', '))
  )
  const getPhone = pipe(
    getContactRoot,
    findNestedElement('gmd:phone', 'gmd:CI_Telephone', 'gmd:voice'),
    extractCharacterString()
  )
  return pipe(
    combine(
      getRole,
      getPosition,
      getNameParts,
      getOrganization,
      getEmail,
      getAddress,
      getPhone
    ),
    map(
      ([
        role,
        position,
        [firstName, lastName],
        organization,
        email,
        address,
        phone,
      ]) => ({
        email,
        role,
        organization,
        ...(position && { position }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(address && { address }),
        ...(phone && { phone }),
      })
    )
  )
}

export function extractStatus(): ChainableFunction<XmlElement, RecordStatus> {
  return pipe(
    findChildElement('gmd:MD_ProgressCode'),
    readAttribute('codeListValue'),
    map(getStatusFromStatusCode)
  )
}

// from gmd:resourceConstraints
export function extractLegalConstraints(): ChainableFunction<
  XmlElement,
  Array<Constraint>
> {
  return pipe(
    findChildrenElement('gmd:MD_LegalConstraints', false),
    filterArray(
      pipe(
        findChildrenElement('gmd:MD_RestrictionCode'),
        mapArray(readAttribute('codeListValue')),
        map((values) => values.indexOf('license') === -1)
      )
    ),
    mapArray(
      combine(
        findChildrenElement('gmd:otherConstraints'),
        findChildrenElement('gmd:useLimitation')
      )
    ),
    flattenArray(),
    flattenArray(),
    mapArray(combine(extractCharacterString(), extractUrl())),
    mapArray(([text, url]) => ({
      ...(url && { url }),
      text,
    }))
  )
}

// from gmd:resourceConstraints
export function extractSecurityConstraints(): ChainableFunction<
  XmlElement,
  Array<Constraint>
> {
  return pipe(
    findNestedElements('gmd:MD_SecurityConstraints', 'gmd:useLimitation'),
    flattenArray(),
    mapArray(combine(extractCharacterString(), extractUrl())),
    mapArray(([text, url]) => ({
      ...(url && { url }),
      text,
    }))
  )
}

// from gmd:resourceConstraints
export function extractOtherConstraints(): ChainableFunction<
  XmlElement,
  Array<Constraint>
> {
  return pipe(
    findNestedElements('gmd:MD_Constraints', 'gmd:useLimitation'),
    flattenArray(),
    mapArray(combine(extractCharacterString(), extractUrl())),
    mapArray(([text, url]) => ({
      ...(url && { url }),
      text,
    }))
  )
}

// from gmd:resourceConstraints
export function extractLicenses(): ChainableFunction<
  XmlElement,
  Array<Constraint>
> {
  return pipe(
    findChildrenElement('gmd:MD_LegalConstraints', false),
    filterArray(
      pipe(
        findChildrenElement('gmd:MD_RestrictionCode'),
        mapArray(readAttribute('codeListValue')),
        map((values) => values.indexOf('license') > -1)
      )
    ),
    mapArray(
      combine(
        findChildrenElement('gmd:otherConstraints'),
        findChildrenElement('gmd:useLimitation')
      )
    ),
    flattenArray(),
    flattenArray(),
    mapArray(combine(extractCharacterString(), extractUrl())),
    mapArray(([text, url]) => ({
      ...(url && { url }),
      text,
    }))
  )
}

const getMimeType = pipe(
  findParent('gmd:MD_Distribution'),
  findNestedElement('gmd:distributionFormat', 'gmd:MD_Format', 'gmd:name'),
  extractCharacterString(),
  map(matchMimeType)
)

/**
 * Extract online resources from an MD_Distribution element
 * @param getMimeTypeFn This function starts from a gmd:transferOptions element
 */
export function extractDatasetOnlineResources(
  getMimeTypeFn: ChainableFunction<XmlElement, string>
): ChainableFunction<XmlElement, DatasetOnlineResource[]> {
  const getUrl = pipe(findChildElement('gmd:linkage'), extractMandatoryUrl())
  const getProtocolStr = pipe(
    findChildElement('gmd:protocol'),
    extractCharacterString()
  )
  const getProtocol = pipe(getProtocolStr, map(matchProtocol))
  const getOnlineFunction = pipe(
    findNestedElement('gmd:function', 'gmd:CI_OnLineFunctionCode'),
    readAttribute('codeListValue')
  )
  const getIsService = pipe(
    getProtocol,
    map((protocol) => protocol !== 'other')
  )
  const getIsDownload = pipe(
    combine(getIsService, getOnlineFunction, getProtocolStr),
    map(
      ([isService, onlineFunction, protocolStr]) =>
        (!isService && onlineFunction === 'download') ||
        /download/i.test(protocolStr)
    )
  )
  const getName = pipe(findChildElement('gmd:name'), extractCharacterString())
  const getDescription = pipe(
    findChildElement('gmd:description'),
    extractCharacterString()
  )
  return pipe(
    findNestedElements(
      'gmd:transferOptions',
      'gmd:MD_DigitalTransferOptions',
      'gmd:onLine',
      'gmd:CI_OnlineResource'
    ),
    mapArray(
      combine(
        getIsService,
        getIsDownload,
        getProtocol,
        getUrl,
        getName,
        getDescription,
        getMimeTypeFn
      )
    ),
    mapArray(
      ([isService, isDownload, protocol, url, name, description, mimeType]) => {
        if (isService) {
          const hasIdentifier = protocol === 'wms' || protocol === 'wfs'
          return {
            type: 'service',
            url: url,
            accessServiceProtocol: protocol,
            ...(name && hasIdentifier && { identifierInService: name }),
            ...(name && { name }),
            ...(description && { description }),
          }
        } else if (isDownload) {
          return {
            type: 'download',
            url: url,
            ...(name && { name }),
            ...(description && { description }),
            ...(mimeType && { mimeType }),
          }
        } else {
          return {
            type: 'link',
            url: url,
            ...(name && { name }),
            ...(description && { description }),
          }
        }
      }
    )
  )
}

export function getUpdateFrequencyFromCustomPeriod(
  isoPeriod: string
): UpdateFrequencyCustom {
  if (!isoPeriod) return null
  const matches = isoPeriod.match(
    /^-?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?T?(?:([0-9]+)H)?/
  )
  if (!matches) return null
  const years = parseInt(matches[1], 10) || 0
  const months = parseInt(matches[2], 10) || 0
  const days = parseInt(matches[3], 10) || 0
  const hours = parseInt(matches[4], 10) || 0
  if (years) {
    return {
      per: 'year',
      updatedTimes: 1,
    }
  } else if (months === 1) {
    return {
      per: 'month',
      updatedTimes: 1,
    }
  } else if (months) {
    return {
      per: 'year',
      updatedTimes: Math.round(12 / months),
    }
  } else if (days === 1) {
    return {
      per: 'day',
      updatedTimes: 1,
    }
  } else if (days <= 7) {
    return {
      per: 'week',
      updatedTimes: Math.round(7 / days - 0.0001), // this is to make sure that 'every 2 days' = '3 times per week'
    }
  } else if (days) {
    return {
      per: 'month',
      updatedTimes: Math.round(30 / days),
    }
  } else if (hours) {
    return {
      per: 'day',
      updatedTimes: Math.round(24 / days),
    }
  }
  return null
}

// from gmd:MD_MaintenanceInformation
export function extractUpdateFrequency(): ChainableFunction<
  XmlElement,
  UpdateFrequency
> {
  return fallback(
    pipe(
      findChildElement('gmd:MD_MaintenanceFrequencyCode'),
      readAttribute('codeListValue'),
      map(getUpdateFrequencyFromFrequencyCode)
    ),
    pipe(
      findNestedElement(
        'gmd:userDefinedMaintenanceFrequency',
        'gts:TM_PeriodDuration'
      ),
      readText(),
      map(getUpdateFrequencyFromCustomPeriod)
    ),
    map(() => 'unknown')
  )
}

/**
 * Looks for srv:SV_ServiceIdentification or gmd:MD_DataIdentification element
 * Will find the first one that exists, not reading the type of the record
 * (this allows using this function in other similar schemas)
 */
export function findIdentification() {
  return pipe(
    findChildElement('gmd:identificationInfo', false),
    combine(
      findChildElement('gmd:MD_DataIdentification', false),
      findChildElement('srv:SV_ServiceIdentification', false)
    ),
    filterArray((el) => el !== null),
    getAtIndex(0)
  )
}

export function extractIdentificationDate(
  type: 'creation' | 'revision' | 'publication'
) {
  return pipe(
    findIdentification(),
    findNestedElements('gmd:citation', 'gmd:CI_Citation', 'gmd:date'),
    filterArray(
      pipe(
        findNestedElements(
          'gmd:CI_Date',
          'gmd:dateType',
          'gmd:CI_DateTypeCode'
        ),
        getAtIndex(0),
        readAttribute('codeListValue'),
        map((value) => value === type)
      )
    ),
    getAtIndex(0),
    findNestedElements('gmd:CI_Date', 'gmd:date'),
    getAtIndex(0),
    extractDateTime()
  )
}

export function getSpatialRepresentationFromCode(
  spatialRepresentationCode: string
): SpatialRepresentationType | null {
  switch (spatialRepresentationCode) {
    case 'grid':
    case 'vector':
    case 'tin':
    case 'table':
    case 'point':
      return spatialRepresentationCode
    default:
      return null
  }
}

export function readUniqueIdentifier(rootEl: XmlElement): string {
  return pipe(
    findChildElement('gmd:fileIdentifier', false),
    extractCharacterString()
  )(rootEl)
}

export function readKind(rootEl: XmlElement): RecordKind {
  return pipe(
    findNestedElement('gmd:hierarchyLevel', 'gmd:MD_ScopeCode'),
    readAttribute('codeListValue'),
    map(
      (scopeCode): RecordKind =>
        scopeCode === 'service' ? 'service' : 'dataset'
    )
  )(rootEl)
}

export function readOwnerOrganization(rootEl: XmlElement): Organization {
  return pipe(
    findNestedElement('gmd:contact', 'gmd:CI_ResponsibleParty'),
    extractOrganization()
  )(rootEl)
}

export function readResourceUpdated(rootEl: XmlElement): Date {
  return extractIdentificationDate('revision')(rootEl)
}

export function readResourceCreated(rootEl: XmlElement): Date {
  return extractIdentificationDate('creation')(rootEl)
}

export function readResourcePublished(rootEl: XmlElement): Date {
  return extractIdentificationDate('publication')(rootEl)
}

export function readRecordUpdated(rootEl: XmlElement): Date {
  return pipe(findChildElement('gmd:dateStamp'), extractDateTime())(rootEl)
}

export function readTitle(rootEl: XmlElement): string {
  return pipe(
    findIdentification(),
    findNestedElement('gmd:citation', 'gmd:CI_Citation', 'gmd:title'),
    extractCharacterString()
  )(rootEl)
}

export function readAbstract(rootEl: XmlElement): string {
  return pipe(
    findIdentification(),
    findChildElement('gmd:abstract', false),
    extractCharacterString()
  )(rootEl)
}

export function readContacts(rootEl: XmlElement): Individual[] {
  return pipe(
    findChildrenElement('gmd:contact', false),
    mapArray(findChildElement('gmd:CI_ResponsibleParty', false)),
    mapArray(extractIndividual())
  )(rootEl)
}

export function readContactsForResource(rootEl: XmlElement): Individual[] {
  return pipe(
    findIdentification(),
    combine(
      findChildrenElement('gmd:contact', false),
      findChildrenElement('gmd:pointOfContact', false)
    ),
    flattenArray(),
    mapArray(findChildElement('gmd:CI_ResponsibleParty', false)),
    mapArray(extractIndividual())
  )(rootEl)
}

// from gmd:thesaurusName
export function readThesaurus(rootEl: XmlElement): ThesaurusModel {
  if (!rootEl) return null

  const findIdentifier = findNestedElement(
    'gmd:CI_Citation',
    'gmd:identifier',
    'gmd:MD_Identifier',
    'gmd:code'
  )
  const id = pipe(findIdentifier, extractCharacterString())(rootEl)
  const url = pipe(findIdentifier, extractUrl())(rootEl)
  const name = pipe(
    findNestedElement('gmd:CI_Citation', 'gmd:title'),
    extractCharacterString()
  )(rootEl)
  return {
    id,
    ...(name && { name }),
    ...(url && { url }),
  }
}

// from gmd:MD_Keywords
export function readKeywordGroup(rootEl: XmlElement): Keyword[] {
  const type = pipe(
    findChildrenElement('gmd:MD_KeywordTypeCode'),
    mapArray(readAttribute('codeListValue')),
    map((values) => getKeywordTypeFromKeywordTypeCode(values[0]))
  )(rootEl)
  const thesaurus = pipe(
    findNestedElement('gmd:thesaurusName'),
    readThesaurus
  )(rootEl)
  return pipe(
    findChildrenElement('gmd:keyword'),
    mapArray((el) => {
      const label = extractCharacterString()(el)
      return {
        ...(thesaurus ? { thesaurus } : {}),
        label,
        type,
      } as Keyword
    })
  )(rootEl)
}

export function readKeywords(rootEl: XmlElement): Keyword[] {
  return pipe(
    findIdentification(),
    findNestedElements('gmd:descriptiveKeywords', 'gmd:MD_Keywords'),
    mapArray(readKeywordGroup),
    flattenArray()
  )(rootEl)
}

export function readStatus(rootEl: XmlElement): RecordStatus {
  return pipe(
    findIdentification(),
    findChildElement('gmd:status', false),
    extractStatus()
  )(rootEl)
}

const getConstraints = pipe(
  findIdentification(),
  findChildrenElement('gmd:resourceConstraints', false)
)

export function readLegalConstraints(rootEl: XmlElement): Constraint[] {
  return pipe(
    getConstraints,
    mapArray(extractLegalConstraints()),
    flattenArray(),
    flattenArray()
  )(rootEl)
}

export function readSecurityConstraints(rootEl: XmlElement): Constraint[] {
  return pipe(
    getConstraints,
    mapArray(extractSecurityConstraints()),
    flattenArray()
  )(rootEl)
}

export function readOtherConstraints(rootEl: XmlElement): Constraint[] {
  return pipe(
    getConstraints,
    mapArray(extractOtherConstraints()),
    flattenArray()
  )(rootEl)
}

export function readLicenses(rootEl: XmlElement): Constraint[] {
  return pipe(
    getConstraints,
    mapArray(extractLicenses()),
    flattenArray()
  )(rootEl)
}

// not used yet
export function readIsoTopics(rootEl: XmlElement): string[] {
  return pipe(
    findIdentification(),
    findChildrenElement('gmd:MD_TopicCategoryCode', true),
    mapArray(readText())
  )(rootEl)
}

export function readSpatialRepresentation(
  rootEl: XmlElement
): SpatialRepresentationType | null {
  return pipe(
    findIdentification(),
    findNestedElement(
      'gmd:spatialRepresentationType',
      'gmd:MD_SpatialRepresentationTypeCode'
    ),
    readAttribute('codeListValue'),
    map(getSpatialRepresentationFromCode)
  )(rootEl)
}

export function readOverviews(rootEl: XmlElement): GraphicOverview[] {
  return pipe(
    findIdentification(),
    findChildrenElement('gmd:graphicOverview', false),
    mapArray(
      combine(
        pipe(findChildElement('gmd:fileName'), extractMandatoryUrl()),
        pipe(findChildElement('gmd:fileDescription'), extractCharacterString())
      )
    ),
    mapArray(([url, description]) => ({
      url,
      ...(description && { description }),
    }))
  )(rootEl)
}

export function readLineage(rootEl: XmlElement): string {
  return pipe(
    findNestedElement(
      'gmd:dataQualityInfo',
      'gmd:DQ_DataQuality',
      'gmd:lineage',
      'gmd:LI_Lineage',
      'gmd:statement'
    ),
    extractCharacterString()
  )(rootEl)
}

export function readUpdateFrequency(rootEl: XmlElement): UpdateFrequency {
  return pipe(
    findIdentification(),
    findNestedElement(
      'gmd:resourceMaintenance',
      'gmd:MD_MaintenanceInformation'
    ),
    extractUpdateFrequency(),
    map((updateFrequency) => updateFrequency || 'unknown')
  )(rootEl)
}

export function extractServiceOnlineResources(): ChainableFunction<
  XmlElement,
  ServiceOnlineResource[]
> {
  const getUrl = pipe(findChildElement('gmd:linkage'), extractMandatoryUrl())
  const getProtocolStr = pipe(
    findChildElement('gmd:protocol'),
    extractCharacterString()
  )
  const getProtocol = pipe(getProtocolStr, map(matchProtocol))
  const getOnlineFunction = pipe(
    findNestedElement('gmd:function', 'gmd:CI_OnLineFunctionCode'),
    readAttribute('codeListValue')
  )
  const getIsLink = pipe(
    getOnlineFunction,
    map((onlineFunction) => onlineFunction === 'information')
  )
  const getName = pipe(findChildElement('gmd:name'), extractCharacterString())
  const getDescription = pipe(
    findChildElement('gmd:description'),
    extractCharacterString()
  )
  return pipe(
    findNestedElements(
      'gmd:transferOptions',
      'gmd:MD_DigitalTransferOptions',
      'gmd:onLine',
      'gmd:CI_OnlineResource'
    ),
    mapArray(combine(getIsLink, getProtocol, getUrl, getName, getDescription)),
    mapArray(([isLink, protocol, url, name, description]) => {
      if (isLink) {
        return {
          type: 'link',
          url: url,
          ...(name && { name }),
          ...(description && { description }),
        }
      } else {
        return {
          type: 'endpoint',
          endpointUrl: url,
          protocol,
          ...(description && { description }),
        }
      }
    })
  )
}

export function readOnlineResources(rootEl: XmlElement): OnlineResource[] {
  if (readKind(rootEl) === 'dataset') {
    return pipe(
      findNestedElements('gmd:distributionInfo', 'gmd:MD_Distribution'),
      mapArray(extractDatasetOnlineResources(getMimeType)),
      flattenArray()
    )(rootEl)
  }
  return pipe(
    findNestedElements('gmd:distributionInfo', 'gmd:MD_Distribution'),
    mapArray(extractServiceOnlineResources()),
    flattenArray()
  )(rootEl)
}

export function readTemporalExtents(rootEl: XmlElement) {
  return pipe(
    findIdentification(),
    findNestedElements('gmd:extent', 'gmd:EX_Extent', 'gmd:temporalElement'),
    mapArray(
      combine(
        findNestedElement(
          'gmd:EX_TemporalExtent',
          'gmd:extent',
          'gml:TimePeriod'
        ),
        findNestedElement(
          'gmd:EX_TemporalExtent',
          'gmd:extent',
          'gml:TimeInstant'
        )
      )
    ),
    mapArray(([periodEl, instantEl]) => {
      if (periodEl) {
        return pipe(
          combine(
            pipe(
              findChildElement('gml:beginPosition', false),
              readText(),
              map((dateStr) => (dateStr ? new Date(dateStr) : null))
            ),
            pipe(
              findChildElement('gml:endPosition', false),
              readText(),
              map((dateStr) => (dateStr ? new Date(dateStr) : null))
            )
          ),
          map(([start, end]) => ({
            start,
            end,
          }))
        )(periodEl)
      } else {
        return pipe(
          findChildElement('gml:timePosition', false),
          readText(),
          map((dateStr) => (dateStr ? new Date(dateStr) : null)),
          map((date) => ({
            start: date,
          }))
        )(instantEl)
      }
    })
  )(rootEl)
}

export function readSpatialExtents(rootEl: XmlElement) {
  const extractGeometry = (rootEl: XmlElement): Geometry => {
    if (!rootEl) return null
    return pipe(
      findChildElement('gmd:polygon', false),
      firstChildElement,
      map((el) => readGeometry(el))
    )(rootEl)
  }

  const extractBBox = (
    rootEl: XmlElement
  ): [number, number, number, number] => {
    if (!rootEl) return null
    return pipe(
      combine(
        pipe(findChildElement('gmd:westBoundLongitude'), extractDecimal()),
        pipe(findChildElement('gmd:southBoundLatitude'), extractDecimal()),
        pipe(findChildElement('gmd:eastBoundLongitude'), extractDecimal()),
        pipe(findChildElement('gmd:northBoundLatitude'), extractDecimal())
      )
    )(rootEl)
  }

  const extractDescription = (rootEl: XmlElement): string => {
    if (!rootEl) return null
    return pipe(
      findNestedElement(
        'gmd:geographicIdentifier',
        'gmd:MD_Identifier',
        'gmd:code'
      ),
      extractCharacterString()
    )(rootEl)
  }

  return pipe(
    findIdentification(),
    findNestedElements('gmd:extent', 'gmd:EX_Extent', 'gmd:geographicElement'),
    mapArray(
      combine(
        pipe(findChildElement('gmd:EX_BoundingPolygon'), extractGeometry),
        pipe(findChildElement('gmd:EX_GeographicBoundingBox'), extractBBox),
        pipe(
          findChildElement('gmd:EX_GeographicDescription'),
          extractDescription
        )
      )
    ),
    mapArray(([geometry, bbox, description]) => {
      return {
        ...(geometry && { geometry }),
        ...(bbox && { bbox }),
        ...(description && { description }),
      }
    })
  )(rootEl)
}

export function readLanguages(rootEl: XmlElement): LanguageCode[] {
  const defaultLanguage = readDefaultLanguage(rootEl)
  return pipe(
    findChildrenElement('gmd:locale', false),
    mapArray(
      pipe(
        findChildElement('gmd:LanguageCode'),
        readAttribute('codeListValue'),
        map((lang) => LANG_3_TO_2_MAPPER[lang.toLowerCase()])
      )
    ),
    map((languages) => (languages.length ? languages : [defaultLanguage]))
  )(rootEl)
}

export function readDefaultLanguage(rootEl: XmlElement): LanguageCode {
  return pipe(
    findChildElement('gmd:language', false),
    findChildElement('gmd:LanguageCode'),
    readAttribute('codeListValue'),
    map((lang) => LANG_3_TO_2_MAPPER[lang.toLowerCase()])
  )(rootEl)
}
