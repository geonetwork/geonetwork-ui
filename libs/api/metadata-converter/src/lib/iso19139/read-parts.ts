import {
  AccessConstraint,
  AccessConstraintType,
  DatasetDistribution,
  DatasetSpatialExtent,
  DatasetTemporalExtent,
  GraphicOverview,
  Individual,
  License,
  Organization,
  RecordKind,
  RecordStatus,
  Role,
  ServiceOnlineResource,
  SpatialRepresentationType,
  UpdateFrequency,
  UpdateFrequencyCustom,
} from '@geonetwork-ui/common/domain/record'
import { getStatusFromStatusCode } from './codelists/status.mapper'
import { getUpdateFrequencyFromFrequencyCode } from './codelists/update-frequency.mapper'
import {
  findChildElement,
  findChildrenElement,
  findNestedElement,
  findNestedElements,
  findParent,
  readAttribute,
  readText,
  XmlElement,
} from '../xml-utils'
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
import { getRoleFromRoleCode } from './codelists/role.mapper'
import { matchMimeType, matchProtocol } from '../common/distribution.mapper'

function extractCharacterString(): ChainableFunction<XmlElement, string> {
  return pipe(
    fallback(
      findChildElement('gco:CharacterString', false),
      findChildElement('gmx:Anchor', false)
    ),
    readText()
  )
}

function extractDateTime(): ChainableFunction<XmlElement, Date> {
  return pipe(
    fallback(
      findChildElement('gco:DateTime', false),
      findChildElement('gco:Date', false)
    ),
    readText(),
    map((dateStr) => (dateStr ? new Date(dateStr) : null))
  )
}

function extractUrl(): ChainableFunction<XmlElement, URL> {
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

function extractMandatoryUrl() {
  return fallback(extractUrl(), () => new URL('http://missing'))
}

// from gmd:role
function extractRole(): ChainableFunction<XmlElement, Role> {
  return pipe(
    findChildElement('gmd:CI_RoleCode'),
    readAttribute('codeListValue'),
    map(getRoleFromRoleCode)
  )
}

// from gmd:CI_ResponsibleParty
function extractOrganization(): ChainableFunction<XmlElement, Organization> {
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
function extractIndividuals(): ChainableFunction<
  XmlElement,
  Array<Individual>
> {
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
      const parts = fullName.split(/\s+/)
      if (!parts.length) return [fullName, null]
      const first = parts.shift()
      return [first, parts.join(' ')]
    })
  )
  const getOrganization = extractOrganization()
  const getEmail = pipe(
    findChildElement('gmd:electronicMailAddress'),
    extractCharacterString(),
    map((email) => (email === null ? 'missing@missing.com' : email))
  )
  return pipe(
    combine(
      getRole,
      getPosition,
      getNameParts,
      getOrganization,
      pipe(findChildrenElement('gmd:contactInfo'), mapArray(getEmail))
    ),
    map(([role, position, [firstName, lastName], organization, emails]) =>
      emails.map((email) => ({
        email,
        role,
        organization,
        ...(position && { position }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
      }))
    )
  )
}

function extractStatus(): ChainableFunction<XmlElement, RecordStatus> {
  return pipe(
    findChildElement('gmd:MD_ProgressCode'),
    readAttribute('codeListValue'),
    map(getStatusFromStatusCode)
  )
}

// from gmd:resourceConstraints
function extractAccessConstraints(): ChainableFunction<
  XmlElement,
  Array<AccessConstraint>
> {
  const getOtherConstraints = pipe(
    findChildrenElement('gmd:MD_LegalConstraints', false),
    filterArray(
      pipe(
        findChildrenElement('gmd:MD_RestrictionCode'),
        mapArray(readAttribute('codeListValue')),
        map(
          (values) =>
            values.indexOf('license') === -1 &&
            values.indexOf('otherRestrictions') > -1
        )
      )
    ),
    mapArray(findChildrenElement('gmd:otherConstraints')),
    flattenArray(),
    mapArray(extractCharacterString()),
    mapArray((text) => ({
      text,
      type: 'other' as AccessConstraintType,
    }))
  )
  const getSecurityConstraints = pipe(
    findNestedElements('gmd:MD_SecurityConstraints', 'gmd:useLimitation'),
    mapArray(extractCharacterString()),
    mapArray((text) => ({
      text,
      type: 'security' as AccessConstraintType,
    }))
  )
  return pipe(
    combine(getOtherConstraints, getSecurityConstraints),
    flattenArray()
  )
}

// from gmd:resourceConstraints
function extractUseLimitations(): ChainableFunction<XmlElement, Array<string>> {
  return pipe(
    combine(
      findNestedElements('gmd:MD_Constraints', 'gmd:useLimitation'),
      findNestedElements('gmd:MD_LegalConstraints', 'gmd:useLimitation')
    ),
    flattenArray(),
    mapArray(extractCharacterString())
  )
}

// from gmd:resourceConstraints
function extractLicenses(): ChainableFunction<XmlElement, Array<License>> {
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
      pipe(
        findChildElement('gmd:otherConstraints'),
        combine(extractCharacterString(), extractUrl()),
        map(([text, url]) => ({
          ...(url && { url }),
          text,
        }))
      )
    )
  )
}

// from gmd:MD_Distribution
function extractDatasetDistributions(): ChainableFunction<
  XmlElement,
  DatasetDistribution[]
> {
  const getFormat = pipe(
    findParent('gmd:MD_Distribution'),
    findNestedElement('gmd:distributionFormat', 'gmd:MD_Format', 'gmd:name'),
    extractCharacterString(),
    map(matchMimeType)
  )

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
        getFormat
      )
    ),
    mapArray(
      ([isService, isDownload, protocol, url, name, description, format]) => {
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
          const mimeType = format
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

function getUpdateFrequencyFromCustomPeriod(
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
      updatedTimes: Math.round(7 / days),
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
function extractUpdateFrequency(): ChainableFunction<
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
 * depending on record type
 */
function findIdentification() {
  return (rootEl: XmlElement) => {
    const kind = readKind(rootEl)
    let eltName = 'gmd:MD_DataIdentification'
    if (kind === 'service') eltName = 'srv:SV_ServiceIdentification'
    return findNestedElement('gmd:identificationInfo', eltName)(rootEl)
  }
}

function extractCitationDate(type: 'creation' | 'revision') {
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

function getSpatialRepresentationFromCode(
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

export function readDatasetCreated(rootEl: XmlElement): Date {
  return extractCitationDate('creation')(rootEl)
}

export function readDatasetUpdated(rootEl: XmlElement): Date {
  return extractCitationDate('revision')(rootEl)
}

export function readContacts(rootEl: XmlElement): Individual[] {
  return pipe(
    findIdentification(),
    combine(
      findChildrenElement('gmd:contact'),
      findChildrenElement('gmd:pointOfContact')
    ),
    flattenArray(),
    mapArray(findChildElement('gmd:CI_ResponsibleParty', false)),
    mapArray(extractIndividuals()),
    flattenArray()
  )(rootEl)
}

function readKeywordsOfType(isTheme: boolean) {
  return pipe(
    findIdentification(),
    findNestedElements('gmd:descriptiveKeywords', 'gmd:MD_Keywords'),
    filterArray(
      pipe(
        findChildrenElement('gmd:MD_KeywordTypeCode'),
        mapArray(readAttribute('codeListValue')),
        map((values) => isTheme === values.indexOf('theme') > -1)
      )
    ),
    mapArray(findChildrenElement('gmd:keyword')),
    flattenArray(),
    mapArray(extractCharacterString())
  )
}

export function readKeywords(rootEl: XmlElement): string[] {
  return readKeywordsOfType(false)(rootEl)
}

export function readThemes(rootEl: XmlElement): string[] {
  return readKeywordsOfType(true)(rootEl)
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

export function readAccessConstraints(rootEl: XmlElement): AccessConstraint[] {
  return pipe(
    getConstraints,
    mapArray(extractAccessConstraints()),
    flattenArray(),
    flattenArray()
  )(rootEl)
}

export function readUseLimitations(rootEl: XmlElement): string[] {
  return pipe(
    getConstraints,
    mapArray(extractUseLimitations()),
    flattenArray()
  )(rootEl)
}

export function readLicenses(rootEl: XmlElement): License[] {
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
    findChildrenElement('gmd:MD_TopicCategoryCode', false),
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

export function readSpatialExtents(rootEl: XmlElement): DatasetSpatialExtent[] {
  return [] // TODO
}

export function readTemporalExtents(
  rootEl: XmlElement
): DatasetTemporalExtent[] {
  return [] // TODO
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

export function readDistributions(rootEl: XmlElement): DatasetDistribution[] {
  return pipe(
    findNestedElements('gmd:distributionInfo', 'gmd:MD_Distribution'),
    mapArray(extractDatasetDistributions()),
    flattenArray()
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

export function readOnlineResources(
  rootEl: XmlElement
): ServiceOnlineResource[] {
  return pipe(
    findNestedElements('gmd:distributionInfo', 'gmd:MD_Distribution'),
    mapArray(extractServiceOnlineResources()),
    flattenArray()
  )(rootEl)
}
