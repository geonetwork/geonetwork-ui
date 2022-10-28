import {
  AccessConstraint,
  CatalogRecord,
  DatasetDistribution,
  DatasetRecord,
  DatasetServiceDistribution,
  Individual,
  License,
  Organisation,
  RecordStatus,
  Role,
  UpdateFrequencyCode,
  UpdateFrequencyCustom,
} from '../model'
import {
  addAttribute,
  appendChildren,
  createChild,
  createElement,
  findChildElement,
  findChildrenElement,
  findNestedElement,
  findNestedElements,
  findChildOrCreate,
  findNestedChildOrCreate,
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
    case RecordStatus.COMPLETED:
      return 'completed'
    case RecordStatus.DEPRECATED:
      return 'deprecated'
    case RecordStatus.ON_GOING:
      return 'onGoing'
    case RecordStatus.REMOVED:
      return 'removed'
    case RecordStatus.UNDER_DEVELOPMENT:
      return 'underDevelopment'
    default:
      throw new Error(
        `Could not determine progress code from status: ${status}`
      )
  }
}

function getRoleCode(role: Role): string {
  switch (role) {
    case Role.AUTHOR:
      return 'author'
    case Role.COLLABORATOR:
      return 'collaborator'
    case Role.CONTRIBUTOR:
      return 'contributor'
    case Role.CUSTODIAN:
      return 'custodian'
    case Role.DISTRIBUTOR:
      return 'distributor'
    case Role.EDITOR:
      return 'editor'
    case Role.FUNDER:
      return 'funder'
    case Role.MEDIATOR:
      return 'mediator'
    case Role.ORIGINATOR:
      return 'originator'
    case Role.OTHER:
      return 'other'
    case Role.OWNER:
      return 'owner'
    case Role.POINT_OF_CONTACT:
      return 'pointOfContact'
    case Role.PRINCIPAL_INVESTIGATOR:
      return 'principalInvestigator'
    case Role.PROCESSOR:
      return 'processor'
    case Role.PUBLISHER:
      return 'publisher'
    case Role.RESOURCE_PROVIDER:
      return 'resourceProvider'
    case Role.RIGHTS_HOLDER:
      return 'rightsHolder'
    case Role.SPONSOR:
      return 'sponsor'
    case Role.STAKEHOLDER:
      return 'stakeholder'
    case Role.UNSPECIFIED:
      return 'unspecified'
    case Role.USER:
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

function appendResponsibleParty(
  org: Organisation,
  contacts: Individual[],
  role: Role
) {
  return appendChildren(
    pipe(
      createElement('gmd:CI_ResponsibleParty'),
      appendChildren(
        pipe(
          createElement('gmd:organisationName'),
          writeCharacterString(org.name)
        ),
        pipe(
          createElement('gmd:contactInfo'),
          createChild('gmd:CI_Contact'),
          appendChildren(
            ...contacts.map((contact) =>
              pipe(
                createElement('gmd:address'),
                createChild('gmd:CI_Address'),
                createChild('gmd:electronicMailAddress'),
                writeCharacterString(contact.email)
              )
            )
          ),
          'website' in org
            ? appendChildren(
                pipe(
                  createElement('gmd:onlineResource'),
                  createChild('gmd:CI_OnlineResource'),
                  writeLinkage(org.website)
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
          addAttribute('codeListValue', getRoleCode(role))
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
  if ('accessServiceUrl' in distribution) {
    linkageUrl = distribution.accessServiceUrl.toString()
    name = distribution.identifierInService // this is for GeoNetwork to know the layer name
    functionCode = 'download'
    protocol = getDistributionProtocol(distribution)
  } else if ('downloadUrl' in distribution) {
    linkageUrl = distribution.downloadUrl.toString()
    name = distribution.name
    functionCode = 'download'
    protocol = 'WWW:DOWNLOAD'
  } else {
    linkageUrl = distribution.linkUrl.toString()
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

export function writeOwnerOrganisation(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  pipe(
    findChildOrCreate('gmd:contact'),
    removeAllChildren(),
    appendResponsibleParty(
      record.ownerOrganisation,
      record.contacts.filter(
        (contact) => contact.organisation.name === record.ownerOrganisation.name
      ),
      Role.POINT_OF_CONTACT // owner responsible party is always point of contact
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
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification',
      'gmd:citation',
      'gmd:CI_Citation',
      'gmd:title'
    ),
    removeAllChildren(),
    writeCharacterString(record.title)
  )(rootEl)
}

export function writeAbstract(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification',
      'gmd:abstract'
    ),
    removeAllChildren(),
    writeCharacterString(record.abstract)
  )(rootEl)
}

export function writeStatus(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification',
      'gmd:status',
      'gmd:MD_ProgressCode'
    ),
    addAttribute(
      'codeList',
      'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode'
    ),
    addAttribute('codeListValue', getProgressCode(record.status))
  )(rootEl)
}

export function writeContacts(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification'
    ),
    removeChildrenByName('gmd:pointOfContact'),
    appendChildren(
      ...record.contacts.map((contact) =>
        pipe(
          createElement('gmd:pointOfContact'),
          appendResponsibleParty(contact.organisation, [contact], contact.role)
        )
      )
    )
  )(rootEl)
}

export function writeKeywords(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification'
    ),
    removeKeywords(null),
    appendKeywords(record.keywords, null)
  )(rootEl)
}

export function writeThemes(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification'
    ),
    removeKeywords('theme'),
    appendKeywords(record.themes, 'theme')
  )(rootEl)
}

export function writeAccessConstraints(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  pipe(
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification'
    ),
    removeAccessConstraints(),
    appendChildren(...record.accessConstraints.map(createAccessConstraint))
  )(rootEl)
}

export function writeLicenses(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification'
    ),
    removeLicenses(),
    appendChildren(...record.licenses.map(createLicense))
  )(rootEl)
}

export function writeUseLimitations(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification'
    ),
    removeUseLimitations(),
    appendChildren(...record.useLimitations.map(createUseLimitation))
  )(rootEl)
}

export function writeUpdateFrequency(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  pipe(
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification',
      'gmd:resourceMaintenance'
    ),
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
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification',
      'gmd:citation',
      'gmd:CI_Citation'
    ),
    fallback(
      updateCitationDate(record.datasetCreated, 'creation'),
      appendCitationDate(record.datasetCreated, 'creation')
    )
  )(rootEl)
}

export function writeDatasetUpdated(record: DatasetRecord, rootEl: XmlElement) {
  if (!('datasetUpdated' in record)) return
  pipe(
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification',
      'gmd:citation',
      'gmd:CI_Citation'
    ),
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
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification',
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
    findNestedChildOrCreate(
      'gmd:identificationInfo',
      'gmd:MD_DataIdentification'
    ),
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
