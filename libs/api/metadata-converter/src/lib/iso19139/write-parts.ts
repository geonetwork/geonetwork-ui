import {
  AccessConstraint,
  CatalogRecord,
  DatasetDistribution,
  DatasetRecord,
  DatasetServiceDistribution,
  Individual,
  License,
  RecordStatus,
  Role,
  ServiceEndpoint,
  ServiceOnlineResource,
  ServiceRecord,
  UpdateFrequencyCode,
  UpdateFrequencyCustom,
} from '@geonetwork-ui/common/domain/record'
import {
  addAttribute,
  appendChildren,
  createChild,
  createElement,
  findChildElement,
  findChildOrCreate,
  findChildrenElement,
  findNestedChildOrCreate,
  findNestedElement,
  findNestedElements,
  readAttribute,
  removeAllChildren,
  removeChildren,
  removeChildrenByName,
  setTextContent,
  XmlElement,
} from '../xml-utils'
import {
  ChainableFunction,
  fallback,
  filterArray,
  getAtIndex,
  map,
  mapArray,
  noop,
  pipe,
  tap,
} from '../function-utils'
import format from 'date-fns/format'
import { readKind } from './read-parts'

function writeCharacterString(
  text: string
): ChainableFunction<XmlElement, XmlElement> {
  return tap(
    pipe(findChildOrCreate('gco:CharacterString'), setTextContent(text))
  )
}

function writeLinkage(url: URL): ChainableFunction<XmlElement, XmlElement> {
  return tap(
    pipe(
      findNestedChildOrCreate('gmd:linkage', 'gmd:URL'),
      setTextContent(url.toString())
    )
  )
}

function writeAnchor(
  url: URL,
  text?: string
): ChainableFunction<XmlElement, XmlElement> {
  return tap(
    pipe(
      findChildOrCreate('gmx:Anchor'),
      addAttribute('xlink:href', url.toString()),
      text ? setTextContent(text) : noop
    )
  )
}

function writeDateTime(date: Date): ChainableFunction<XmlElement, XmlElement> {
  return tap(
    pipe(
      findChildOrCreate('gco:DateTime'),
      setTextContent(format(date, "yyyy-MM-dd'T'HH:mm:ss"))
    )
  )
}

function writeDate(date: Date): ChainableFunction<XmlElement, XmlElement> {
  return tap(
    pipe(
      findChildOrCreate('gco:Date'),
      setTextContent(format(date, 'yyyy-MM-dd'))
    )
  )
}

function getProgressCode(status: RecordStatus): string {
  switch (status) {
    case 'completed':
      return 'completed'
    case 'deprecated':
      return 'deprecated'
    case 'ongoing':
      return 'onGoing'
    case 'removed':
      return 'removed'
    case 'under_development':
      return 'underDevelopment'
    default:
      throw new Error(
        `Could not determine progress code from status: ${status}`
      )
  }
}

function getRoleCode(role: Role): string {
  switch (role) {
    case 'author':
      return 'author'
    case 'collaborator':
      return 'collaborator'
    case 'contributor':
      return 'contributor'
    case 'custodian':
      return 'custodian'
    case 'distributor':
      return 'distributor'
    case 'editor':
      return 'editor'
    case 'funder':
      return 'funder'
    case 'mediator':
      return 'mediator'
    case 'originator':
      return 'originator'
    case 'other':
      return 'other'
    case 'owner':
      return 'owner'
    case 'point_of_contact':
      return 'pointOfContact'
    case 'principal_investigator':
      return 'principalInvestigator'
    case 'processor':
      return 'processor'
    case 'publisher':
      return 'publisher'
    case 'resource_provider':
      return 'resourceProvider'
    case 'rights_holder':
      return 'rightsHolder'
    case 'sponsor':
      return 'sponsor'
    case 'stakeholder':
      return 'stakeholder'
    case 'unspecified':
      return 'unspecified'
    case 'user':
      return 'user'
    default:
      throw new Error(`Could not determine role code from role: ${role}`)
  }
}

function getDistributionProtocol(
  distribution: DatasetServiceDistribution
): string {
  switch (distribution.accessServiceProtocol.toLowerCase()) {
    case 'wfs':
      return 'OGC:WFS'
    case 'wms':
      return 'OGC:WMS'
    case 'wps':
      return 'OGC:WPS'
    default:
      return distribution.accessServiceProtocol
  }
}

function getMaintenanceFrequencyCode(
  updateFrequency: UpdateFrequencyCode
): string | null {
  switch (updateFrequency) {
    case 'asNeeded':
      return 'asNeeded'
    case 'unknown':
      return 'unknown'
    case 'irregular':
      return 'irregular'
    case 'notPlanned':
      return 'notPlanned'
    case 'continual':
      return 'continual'
    case 'periodic':
      return 'periodic'
  }
}

function getISODuration(updateFrequency: UpdateFrequencyCustom): string {
  const duration = {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
  }
  switch (updateFrequency.per) {
    case 'day':
      if (updateFrequency.updatedTimes <= 1) duration.days = 1
      else duration.hours = Math.round(24 / updateFrequency.updatedTimes)
      break
    case 'week':
      duration.days = Math.round(7 / updateFrequency.updatedTimes)
      break
    case 'month':
      if (updateFrequency.updatedTimes <= 1) duration.months = 1
      else duration.days = Math.round(30 / updateFrequency.updatedTimes)
      break
    case 'year':
      if (updateFrequency.updatedTimes <= 1) duration.years = 1
      else duration.months = Math.round(12 / updateFrequency.updatedTimes)
      break
  }
  const hours = duration.hours > 0 ? `T${duration.hours}H` : ''
  return `P${duration.years}Y${duration.months}M${duration.days}D${hours}`
}

function appendResponsibleParty(contact: Individual) {
  const name =
    contact.lastName && contact.firstName
      ? `${contact.firstName} ${contact.lastName}`
      : contact.lastName || contact.firstName || null
  return appendChildren(
    pipe(
      createElement('gmd:CI_ResponsibleParty'),
      name
        ? appendChildren(
            pipe(
              createElement('gmd:individualName'),
              writeCharacterString(name)
            )
          )
        : noop,
      contact.position
        ? appendChildren(
            pipe(
              createElement('gmd:positionName'),
              writeCharacterString(contact.position)
            )
          )
        : noop,
      appendChildren(
        pipe(
          createElement('gmd:organisationName'),
          writeCharacterString(contact.organization.name)
        ),
        pipe(
          createElement('gmd:contactInfo'),
          createChild('gmd:CI_Contact'),
          appendChildren(
            pipe(
              createElement('gmd:address'),
              createChild('gmd:CI_Address'),
              createChild('gmd:electronicMailAddress'),
              writeCharacterString(contact.email)
            )
          ),
          'website' in contact.organization
            ? appendChildren(
                pipe(
                  createElement('gmd:onlineResource'),
                  createChild('gmd:CI_OnlineResource'),
                  writeLinkage(contact.organization.website)
                )
              )
            : noop
        ),
        pipe(
          createElement('gmd:role'),
          createChild('gmd:CI_RoleCode'),
          addAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode'
          ),
          addAttribute('codeListValue', getRoleCode(contact.role))
        )
      )
    )
  )
}

function updateCitationDate(date: Date, type: 'revision' | 'creation') {
  return pipe(
    findNestedElements('gmd:date', 'gmd:CI_Date'),
    filterArray(
      pipe(
        findChildElement('gmd:CI_DateTypeCode'),
        readAttribute('codeListValue'),
        map((value) => value === type)
      )
    ),
    getAtIndex(0),
    findChildElement('gmd:date'),
    removeAllChildren(),
    writeDateTime(date)
  )
}

function appendCitationDate(date, type: 'revision' | 'creation') {
  return appendChildren(
    pipe(
      createElement('gmd:date'),
      createChild('gmd:CI_Date'),
      appendChildren(
        pipe(createElement('gmd:date'), writeDateTime(date)),
        pipe(
          createElement('gmd:dateType'),
          createChild('gmd:CI_DateTypeCode'),
          addAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode'
          ),
          addAttribute('codeListValue', type)
        )
      )
    )
  )
}

function removeKeywords(type: string | null) {
  return removeChildren(
    pipe(
      findNestedElements('gmd:descriptiveKeywords'),
      filterArray(
        pipe(
          findNestedElement(
            'gmd:MD_Keywords',
            'gmd:type',
            'gmd:MD_KeywordTypeCode'
          ),
          readAttribute('codeListValue'),
          // if a specific type is targeted, compare with it; otherwise remove keywords if they have no type defined
          map((typeValue) => (type !== null ? type === typeValue : true))
        )
      )
    )
  )
}

function appendKeywords(keywords: string[], type: string | null) {
  return appendChildren(
    pipe(
      createElement('gmd:descriptiveKeywords'),
      createChild('gmd:MD_Keywords'),
      type !== null
        ? appendChildren(
            pipe(
              createElement('gmd:type'),
              createChild('gmd:MD_KeywordTypeCode'),
              addAttribute(
                'codeList',
                'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode'
              ),
              addAttribute('codeListValue', type)
            )
          )
        : noop,
      appendChildren(
        ...keywords.map((keyword) =>
          pipe(createElement('gmd:keyword'), writeCharacterString(keyword))
        )
      )
    )
  )
}

function removeAccessConstraints() {
  const securityConstraintsFilter = pipe(
    findChildrenElement('gmd:MD_SecurityConstraints'),
    (array) => array.length > 0
  )

  // remove legal constraints that *only* have 'otherRestrictions'
  const otherConstraintsFilter = pipe(
    findNestedElements(
      'gmd:MD_LegalConstraints',
      'gmd:accessConstraints',
      'gmd:MD_RestrictionCode'
    ),
    mapArray(readAttribute('codeListValue')),
    (restrictionCodes) =>
      restrictionCodes.every((code) => code === 'otherRestrictions')
  )
  return removeChildren(
    pipe(
      findChildrenElement('gmd:resourceConstraints'),
      filterArray(
        (el) => securityConstraintsFilter(el) || otherConstraintsFilter(el)
      )
    )
  )
}

function createAccessConstraint(constraint: AccessConstraint) {
  if (constraint.type === 'security') {
    return pipe(
      createElement('gmd:resourceConstraints'),
      createChild('gmd:MD_SecurityConstraints'),
      appendChildren(
        pipe(
          createElement('gmd:classification'),
          createChild('gmd:MD_ClassificationCode'),
          addAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ClassificationCode'
          ),
          addAttribute('codeListValue', 'restricted')
        ),
        pipe(
          createElement('gmd:useLimitation'),
          writeCharacterString(constraint.text)
        )
      )
    )
  }
  return pipe(
    createElement('gmd:resourceConstraints'),
    createChild('gmd:MD_LegalConstraints'),
    appendChildren(
      pipe(
        createElement('gmd:accessConstraints'),
        createChild('gmd:MD_RestrictionCode'),
        addAttribute(
          'codeList',
          'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode'
        ),
        addAttribute('codeListValue', 'otherRestrictions')
      ),
      pipe(
        createElement('gmd:otherConstraints'),
        writeCharacterString(constraint.text)
      )
    )
  )
}

function removeUseLimitations() {
  return removeChildren(
    pipe(
      findChildrenElement('gmd:resourceConstraints'),
      filterArray(
        pipe(
          findNestedElements('gmd:MD_Constraints', 'gmd:useLimitation'),
          (array) => array.length > 0
        )
      )
    )
  )
}

function createUseLimitation(useLimitation: string) {
  return pipe(
    createElement('gmd:resourceConstraints'),
    createChild('gmd:MD_Constraints'),
    createChild('gmd:useLimitation'),
    writeCharacterString(useLimitation)
  )
}

function removeLicenses() {
  return removeChildren(
    pipe(
      findChildrenElement('gmd:resourceConstraints'),
      filterArray(
        pipe(
          findNestedElements(
            'gmd:MD_LegalConstraints',
            'gmd:accessConstraints',
            'gmd:MD_RestrictionCode'
          ),
          mapArray(readAttribute('codeListValue')),
          (restrictionCodes) =>
            restrictionCodes.some((code) => code === 'license')
        )
      )
    )
  )
}

function createLicense(license: License) {
  return pipe(
    createElement('gmd:resourceConstraints'),
    createChild('gmd:MD_LegalConstraints'),
    appendChildren(
      pipe(
        createElement('gmd:accessConstraints'),
        createChild('gmd:MD_RestrictionCode'),
        addAttribute(
          'codeList',
          'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode'
        ),
        addAttribute('codeListValue', 'license')
      ),
      pipe(
        createElement('gmd:accessConstraints'),
        createChild('gmd:MD_RestrictionCode'),
        addAttribute(
          'codeList',
          'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode'
        ),
        addAttribute('codeListValue', 'otherRestrictions')
      ),
      pipe(
        createElement('gmd:otherConstraints'),
        'url' in license
          ? writeAnchor(license.url, license.text)
          : writeCharacterString(license.text)
      )
    )
  )
}

function removeDistributions() {
  return pipe(removeChildrenByName('gmd:distributionInfo'))
}

function createDistribution(distribution: DatasetDistribution) {
  const appendDistributionFormat =
    'mimeType' in distribution
      ? appendChildren(
          pipe(
            createElement('gmd:distributionFormat'),
            createChild('gmd:MD_Format'),
            appendChildren(
              pipe(
                createElement('gmd:name'),
                writeCharacterString(distribution.mimeType)
              ),
              pipe(
                createElement('gmd:version'),
                writeCharacterString('1.0') // hardcoding this as it most likely won't be used but is mandatory
              )
            )
          )
        )
      : noop

  let linkageUrl, name, functionCode, protocol
  if (distribution.type === 'service') {
    linkageUrl = distribution.url.toString()
    name = distribution.identifierInService // this is for GeoNetwork to know the layer name
    functionCode = 'download'
    protocol = getDistributionProtocol(distribution)
  } else if (distribution.type === 'download') {
    linkageUrl = distribution.url.toString()
    name = distribution.name
    functionCode = 'download'
    protocol = 'WWW:DOWNLOAD'
  } else {
    linkageUrl = distribution.url.toString()
    name = distribution.name
    functionCode = 'information'
    protocol = 'WWW:LINK'
  }
  const appendTransferOptions = appendChildren(
    pipe(
      createElement('gmd:transferOptions'),
      createChild('gmd:MD_DigitalTransferOptions'),
      createChild('gmd:onLine'),
      createChild('gmd:CI_OnlineResource'),
      writeLinkage(linkageUrl),
      'description' in distribution
        ? appendChildren(
            pipe(
              createElement('gmd:description'),
              writeCharacterString(distribution.description)
            )
          )
        : noop,
      name !== undefined
        ? appendChildren(
            pipe(createElement('gmd:name'), writeCharacterString(name))
          )
        : noop,
      appendChildren(
        pipe(createElement('gmd:protocol'), writeCharacterString(protocol)),
        pipe(
          createElement('gmd:function'),
          createChild('gmd:CI_OnLineFunctionCode'),
          addAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode'
          ),
          addAttribute('codeListValue', functionCode)
        )
      )
    )
  )
  return pipe(
    createElement('gmd:distributionInfo'),
    createChild('gmd:MD_Distribution'),
    appendDistributionFormat,
    appendTransferOptions
  )
}

/**
 * Looks for srv:SV_ServiceIdentification or gmd:MD_DataIdentification element
 * depending on record type, create if missing
 */
function findOrCreateIdentification() {
  return (rootEl: XmlElement) => {
    const kind = readKind(rootEl)
    let eltName = 'gmd:MD_DataIdentification'
    if (kind === 'service') eltName = 'srv:SV_ServiceIdentification'
    return findNestedChildOrCreate('gmd:identificationInfo', eltName)(rootEl)
  }
}

function findOrCreateDistribution() {
  return (rootEl: XmlElement) => {
    return findNestedChildOrCreate(
      'gmd:distributionInfo',
      'gmd:MD_Distribution'
    )(rootEl)
  }
}

export function writeUniqueIdentifier(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  pipe(
    findChildOrCreate('gmd:fileIdentifier'),
    writeCharacterString(record.uniqueIdentifier)
  )(rootEl)
}

export function writeKind(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findNestedChildOrCreate('gmd:hierarchyLevel', 'gmd:MD_ScopeCode'),
    addAttribute(
      'codeList',
      'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode'
    ),
    addAttribute('codeListValue', record.kind)
  )(rootEl)
}

export function writeOwnerOrganization(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  // if no contact matches the owner org, create an empty one
  const ownerContact: Individual = record.contacts.find(
    (contact) => contact.organization.name === record.ownerOrganization.name
  )
  pipe(
    findChildOrCreate('gmd:contact'),
    removeAllChildren(),
    appendResponsibleParty(
      ownerContact
        ? {
            ...ownerContact,
            // owner responsible party is always point of contact
            role: 'point_of_contact',
          }
        : {
            organization: record.ownerOrganization,
            email: '',
            role: 'point_of_contact',
          }
    )
  )(rootEl)
}

export function writeRecordUpdated(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findChildOrCreate('gmd:dateStamp'),
    removeAllChildren(),
    writeDateTime(record.recordUpdated)
  )(rootEl)
}

export function writeTitle(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:citation', 'gmd:CI_Citation', 'gmd:title'),
    writeCharacterString(record.title)
  )(rootEl)
}

export function writeAbstract(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    findChildOrCreate('gmd:abstract'),
    writeCharacterString(record.abstract)
  )(rootEl)
}

export function writeStatus(record: DatasetRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:status', 'gmd:MD_ProgressCode'),
    addAttribute(
      'codeList',
      'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode'
    ),
    addAttribute('codeListValue', getProgressCode(record.status))
  )(rootEl)
}

export function writeContacts(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    removeChildrenByName('gmd:pointOfContact'),
    appendChildren(
      ...record.contacts.map((contact) =>
        pipe(
          createElement('gmd:pointOfContact'),
          appendResponsibleParty(contact)
        )
      )
    )
  )(rootEl)
}

export function writeKeywords(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    removeKeywords(null),
    appendKeywords(record.keywords, null)
  )(rootEl)
}

export function writeThemes(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    removeKeywords('theme'),
    appendKeywords(record.themes, 'theme')
  )(rootEl)
}

export function writeAccessConstraints(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  pipe(
    findOrCreateIdentification(),
    removeAccessConstraints(),
    appendChildren(...record.accessConstraints.map(createAccessConstraint))
  )(rootEl)
}

export function writeLicenses(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    removeLicenses(),
    appendChildren(...record.licenses.map(createLicense))
  )(rootEl)
}

export function writeUseLimitations(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    removeUseLimitations(),
    appendChildren(...record.useLimitations.map(createUseLimitation))
  )(rootEl)
}

export function writeUpdateFrequency(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  pipe(
    findOrCreateIdentification(),
    findChildOrCreate('gmd:resourceMaintenance'),
    removeAllChildren(),
    findChildOrCreate('gmd:MD_MaintenanceInformation'),
    typeof record.updateFrequency === 'object'
      ? pipe(
          createChild('gmd:userDefinedMaintenanceFrequency'),
          createChild('gts:TM_PeriodDuration'),
          setTextContent(getISODuration(record.updateFrequency))
        )
      : pipe(
          createChild('gmd:maintenanceAndUpdateFrequency'),
          createChild('gmd:MD_MaintenanceFrequencyCode'),
          addAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_MaintenanceFrequencyCode'
          ),
          addAttribute(
            'codeListValue',
            getMaintenanceFrequencyCode(record.updateFrequency)
          )
        )
  )(rootEl)
}

export function writeDatasetCreated(record: DatasetRecord, rootEl: XmlElement) {
  if (!('datasetCreated' in record)) return
  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:citation', 'gmd:CI_Citation'),
    fallback(
      updateCitationDate(record.datasetCreated, 'creation'),
      appendCitationDate(record.datasetCreated, 'creation')
    )
  )(rootEl)
}

export function writeDatasetUpdated(record: DatasetRecord, rootEl: XmlElement) {
  if (!('datasetUpdated' in record)) return
  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:citation', 'gmd:CI_Citation'),
    fallback(
      updateCitationDate(record.datasetUpdated, 'revision'),
      appendCitationDate(record.datasetUpdated, 'revision')
    )
  )(rootEl)
}

export function writeSpatialRepresentation(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate(
      'gmd:spatialRepresentationType',
      'gmd:MD_SpatialRepresentationTypeCode'
    ),
    addAttribute(
      'codeList',
      'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_SpatialRepresentationTypeCode'
    ),
    addAttribute('codeListValue', record.spatialRepresentation)
  )(rootEl)
}

export function writeGraphicOverviews(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  pipe(
    findOrCreateIdentification(),
    removeChildrenByName('gmd:graphicOverview'),
    appendChildren(
      ...record.overviews.map((overview) =>
        pipe(
          createElement('gmd:graphicOverview'),
          createChild('gmd:MD_BrowseGraphic'),
          appendChildren(
            pipe(
              createElement('gmd:fileName'),
              writeCharacterString(overview.url.toString())
            )
          ),
          'description' in overview
            ? appendChildren(
                pipe(
                  createElement('gmd:fileDescription'),
                  writeCharacterString(overview.description)
                )
              )
            : noop
        )
      )
    )
  )(rootEl)
}

export function writeDistributions(record: DatasetRecord, rootEl: XmlElement) {
  pipe(
    removeDistributions(),
    appendChildren(...record.distributions.map(createDistribution))
  )(rootEl)
}

export function writeLineage(record: DatasetRecord, rootEl: XmlElement) {
  pipe(
    findNestedChildOrCreate(
      'gmd:dataQualityInfo',
      'gmd:DQ_DataQuality',
      'gmd:lineage',
      'gmd:LI_Lineage',
      'gmd:statement'
    ),
    writeCharacterString(record.lineage)
  )(rootEl)
}

function getServiceEndpointProtocol(endpoint: ServiceEndpoint): string {
  switch (endpoint.protocol.toLowerCase()) {
    case 'wfs':
      return 'OGC:WFS'
    case 'wms':
      return 'OGC:WMS'
    case 'wps':
      return 'OGC:WPS'
    default:
      return endpoint.protocol
  }
}

function createOnlineResource(onlineResource: ServiceOnlineResource) {
  let linkageUrl, functionCode, protocol
  if (onlineResource.type === 'endpoint') {
    linkageUrl = onlineResource.endpointUrl.toString()
    protocol = getServiceEndpointProtocol(onlineResource)
    functionCode = 'download'
  } else {
    linkageUrl = onlineResource.url.toString()
    functionCode = 'information'
    protocol = 'WWW:LINK'
  }
  const appendTransferOptions = appendChildren(
    pipe(
      createElement('gmd:transferOptions'),
      createChild('gmd:MD_DigitalTransferOptions'),
      createChild('gmd:onLine'),
      createChild('gmd:CI_OnlineResource'),
      writeLinkage(linkageUrl),
      'description' in onlineResource
        ? appendChildren(
            pipe(
              createElement('gmd:description'),
              writeCharacterString(onlineResource.description)
            )
          )
        : noop,
      'name' in onlineResource
        ? appendChildren(
            pipe(
              createElement('gmd:name'),
              writeCharacterString(onlineResource.name)
            )
          )
        : noop,
      appendChildren(
        pipe(createElement('gmd:protocol'), writeCharacterString(protocol)),
        pipe(
          createElement('gmd:function'),
          createChild('gmd:CI_OnLineFunctionCode'),
          addAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode'
          ),
          addAttribute('codeListValue', functionCode)
        )
      )
    )
  )
  return pipe(
    createElement('gmd:distributionInfo'),
    createChild('gmd:MD_Distribution'),
    appendTransferOptions
  )
}

export function writeOnlineResources(
  record: ServiceRecord,
  rootEl: XmlElement
) {
  pipe(
    removeDistributions(),
    appendChildren(...record.onlineResources.map(createOnlineResource))
  )(rootEl)
}
