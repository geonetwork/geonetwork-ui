import {
  CatalogRecord,
  Constraint,
  DatasetOnlineResource,
  DatasetRecord,
  DatasetServiceDistribution,
  FieldTranslation,
  Individual,
  Keyword,
  LanguageCode,
  RecordStatus,
  RecordTranslations,
  ReuseRecord,
  Role,
  ServiceEndpoint,
  ServiceOnlineResource,
  ServiceRecord,
  UpdateFrequencyCode,
  UpdateFrequencyCustom,
} from '@geonetwork-ui/common/domain/model/record'
import { ThesaurusModel } from '@geonetwork-ui/common/domain/model/thesaurus'
import { format } from 'date-fns/format'
import { Geometry } from 'geojson'
import {
  ChainableFunction,
  filterArray,
  map,
  mapArray,
  noop,
  pipe,
  tap,
} from '../function-utils'
import {
  allChildrenElement,
  appendChildren,
  createChild,
  createElement,
  createNestedChild,
  createNestedElement,
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
  writeAttribute,
  XmlElement,
} from '../xml-utils'
import { readKind } from './read-parts'
import { writeGeometry } from './utils/geometry'
import { namePartsToFull } from './utils/individual-name'
import { getLang3FromLang2 } from '@geonetwork-ui/util/i18n/language-codes'
import { kindToCodeListValue } from '../common/resource-types'

function writeLocalizedElement(
  writeFn: ChainableFunction<XmlElement, XmlElement>,
  text: string,
  translations: FieldTranslation,
  defaultLanguage: LanguageCode
): ChainableFunction<XmlElement, XmlElement> {
  if (!translations)
    return pipe(writeFn, removeChildrenByName('gmd:PT_FreeText')) // If no translations, remove existing if any
  function createLocalized(lang: LanguageCode, translation: string) {
    return pipe(
      createNestedElement('gmd:textGroup', 'gmd:LocalisedCharacterString'),
      writeAttribute('locale', `#${lang.toUpperCase()}`),
      setTextContent(translation)
    )
  }
  return pipe(
    writeFn,
    removeChildrenByName('gmd:PT_FreeText'),
    createChild('gmd:PT_FreeText'),
    appendChildren(
      createLocalized(defaultLanguage, text),
      ...Object.entries(translations).map(([lang, translation]) =>
        createLocalized(lang, translation)
      )
    )
  )
}

export function writeCharacterString(
  text: string
): ChainableFunction<XmlElement, XmlElement> {
  return tap(
    pipe(findChildOrCreate('gco:CharacterString'), setTextContent(text))
  )
}

export function writeLocalizedCharacterString(
  text: string,
  translations: FieldTranslation,
  defaultLanguage: LanguageCode
): ChainableFunction<XmlElement, XmlElement> {
  return writeLocalizedElement(
    writeCharacterString(text),
    text,
    translations,
    defaultLanguage
  )
}

export function writeLinkage(
  url: URL
): ChainableFunction<XmlElement, XmlElement> {
  return tap(
    pipe(
      findNestedChildOrCreate('gmd:linkage', 'gmd:URL'),
      setTextContent(url.toString())
    )
  )
}

export function writeAnchor(
  url: URL,
  text?: string
): ChainableFunction<XmlElement, XmlElement> {
  return tap(
    pipe(
      findChildOrCreate('gmx:Anchor'),
      writeAttribute('xlink:href', url.toString()),
      text ? setTextContent(text) : noop
    )
  )
}

export function writeLocalizedAnchor(
  url: URL,
  text: string,
  translations: FieldTranslation,
  defaultLanguage: LanguageCode
): ChainableFunction<XmlElement, XmlElement> {
  return writeLocalizedElement(
    writeAnchor(url, text),
    text,
    translations,
    defaultLanguage
  )
}

export function writeDateTime(
  date: Date
): ChainableFunction<XmlElement, XmlElement> {
  return pipe(
    findChildOrCreate('gco:DateTime'),
    setTextContent(format(date, "yyyy-MM-dd'T'HH:mm:ss"))
  )
}

export function writeDate(
  date: Date
): ChainableFunction<XmlElement, XmlElement> {
  return tap(
    pipe(
      findChildOrCreate('gco:Date'),
      setTextContent(format(date, 'yyyy-MM-dd'))
    )
  )
}

export function writeDecimal(
  decimal: number
): ChainableFunction<XmlElement, XmlElement> {
  return tap(
    pipe(findChildOrCreate('gco:Decimal'), setTextContent(decimal.toString()))
  )
}

export function getProgressCode(status: RecordStatus): string {
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

export function getRoleCode(role: Role): string {
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

export function getServiceDistributionProtocol(
  distribution: DatasetServiceDistribution
): string {
  switch (distribution.accessServiceProtocol.toLowerCase()) {
    case 'ogcfeatures':
      return 'OGC API Features'
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

export function getMaintenanceFrequencyCode(
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
    case 'daily':
      return 'daily'
    case 'weekly':
      return 'weekly'
    case 'fortnightly':
      return 'fortnightly'
    case 'monthly':
      return 'monthly'
    case 'quarterly':
      return 'quarterly'
    case 'biannually':
      return 'biannually'
    case 'annually':
      return 'annually'
    case 'semimonthly':
      return 'semimonthly'
    case 'biennially':
      return 'biennially'
  }
}

export function getISODuration(updateFrequency: UpdateFrequencyCustom): string {
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
      duration.days = Math.round(7 / updateFrequency.updatedTimes - 0.0001) // this is to make sure that '2 times per week' = 'every 3 days'
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
  contact: Individual,
  translations: RecordTranslations,
  defaultLanguage: LanguageCode
) {
  const fullName = namePartsToFull(contact.firstName, contact.lastName)

  const createAddress = pipe(
    createNestedElement('gmd:address', 'gmd:CI_Address'),
    appendChildren(
      pipe(
        createElement('gmd:electronicMailAddress'),
        writeCharacterString(contact.email)
      )
    ),
    contact.address
      ? appendChildren(
          pipe(
            createElement('gmd:deliveryPoint'),
            writeCharacterString(contact.address)
          )
        )
      : noop
  )

  const createContact = pipe(
    createNestedElement('gmd:contactInfo', 'gmd:CI_Contact'),
    contact.phone
      ? appendChildren(
          pipe(
            createNestedElement('gmd:phone', 'gmd:CI_Telephone', 'gmd:voice'),
            writeCharacterString(contact.phone)
          )
        )
      : noop,
    appendChildren(createAddress),
    contact.organization?.website
      ? appendChildren(
          pipe(
            createNestedElement('gmd:onlineResource', 'gmd:CI_OnlineResource'),
            writeLinkage(contact.organization.website)
          )
        )
      : noop
  )

  return appendChildren(
    pipe(
      createElement('gmd:CI_ResponsibleParty'),
      fullName
        ? appendChildren(
            pipe(
              createElement('gmd:individualName'),
              writeCharacterString(fullName)
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

      contact.organization?.name
        ? appendChildren(
            pipe(
              createElement('gmd:organisationName'),
              writeCharacterString(contact.organization.name)
            )
          )
        : noop,
      appendChildren(
        createContact,
        pipe(
          createNestedElement('gmd:role', 'gmd:CI_RoleCode'),
          writeAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode'
          ),
          writeAttribute('codeListValue', getRoleCode(contact.role))
        )
      )
    )
  )
}

export function removeKeywords() {
  return removeChildren(pipe(findNestedElements('gmd:descriptiveKeywords')))
}

// returns a <gmd:thesaurusName> element
export function createThesaurus(thesaurus: ThesaurusModel) {
  return pipe(
    createNestedElement('gmd:thesaurusName', 'gmd:CI_Citation'),
    appendChildren(
      pipe(
        createElement('gmd:title'),
        writeCharacterString(thesaurus.name || thesaurus.id)
      ),
      pipe(
        createNestedElement('gmd:identifier', 'gmd:MD_Identifier'),
        appendChildren(
          pipe(
            createElement('gmd:code'),
            thesaurus.url
              ? writeAnchor(thesaurus.url, thesaurus.id)
              : writeCharacterString(thesaurus.id)
          )
        )
      )
    )
  )
}

export function appendKeywords(
  keywords: Keyword[],
  defaultLanguage: LanguageCode
) {
  // keywords are grouped by thesaurus if they have one, otherwise by type
  const keywordsByThesaurus: Keyword[][] = keywords.reduce((acc, keyword) => {
    const thesaurusId = keyword.thesaurus?.id
    const type = keyword.type
    let existingGroup = acc.find((group) =>
      thesaurusId
        ? group[0].thesaurus?.id === thesaurusId
        : group[0].type === type && !group[0].thesaurus
    )
    if (!existingGroup) {
      existingGroup = []
      acc.push(existingGroup)
    }
    existingGroup.push(keyword)
    return acc
  }, [])
  return appendChildren(
    ...keywordsByThesaurus.map((keywords) =>
      pipe(
        createNestedElement('gmd:descriptiveKeywords', 'gmd:MD_Keywords'),
        appendChildren(
          pipe(
            createNestedElement('gmd:type', 'gmd:MD_KeywordTypeCode'),
            writeAttribute(
              'codeList',
              'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode'
            ),
            writeAttribute('codeListValue', keywords[0].type)
          )
        ),
        keywords[0].thesaurus
          ? appendChildren(createThesaurus(keywords[0].thesaurus))
          : noop,
        appendChildren(
          ...keywords.map((keyword) =>
            pipe(
              createElement('gmd:keyword'),
              writeLocalizedCharacterString(
                keyword.label,
                keyword.translations?.label,
                defaultLanguage
              )
            )
          )
        )
      )
    )
  )
}

export function createConstraint(
  constraint: Constraint,
  type: 'legal' | 'security' | 'other',
  defaultLanguage: LanguageCode
) {
  if (type === 'security') {
    return pipe(
      createNestedElement(
        'gmd:resourceConstraints',
        'gmd:MD_SecurityConstraints'
      ),
      appendChildren(
        pipe(
          createNestedElement(
            'gmd:classification',
            'gmd:MD_ClassificationCode'
          ),
          writeAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ClassificationCode'
          ),
          writeAttribute('codeListValue', 'restricted')
        ),
        pipe(
          createElement('gmd:useLimitation'),
          'url' in constraint
            ? writeLocalizedAnchor(
                constraint.url,
                constraint.text,
                constraint.translations?.text,
                defaultLanguage
              )
            : writeLocalizedCharacterString(
                constraint.text,
                constraint.translations?.text,
                defaultLanguage
              )
        )
      )
    )
  } else if (type === 'legal') {
    return pipe(
      createNestedElement('gmd:resourceConstraints', 'gmd:MD_LegalConstraints'),
      appendChildren(
        pipe(
          createNestedElement(
            'gmd:accessConstraints',
            'gmd:MD_RestrictionCode'
          ),
          writeAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode'
          ),
          writeAttribute('codeListValue', 'otherRestrictions')
        ),
        pipe(
          createElement('gmd:otherConstraints'),
          'url' in constraint
            ? writeLocalizedAnchor(
                constraint.url,
                constraint.text,
                constraint.translations?.text,
                defaultLanguage
              )
            : writeLocalizedCharacterString(
                constraint.text,
                constraint.translations?.text,
                defaultLanguage
              )
        )
      )
    )
  }
  // other
  return pipe(
    createNestedElement(
      'gmd:resourceConstraints',
      'gmd:MD_Constraints',
      'gmd:useLimitation'
    ),
    'url' in constraint
      ? writeLocalizedAnchor(
          constraint.url,
          constraint.text,
          constraint.translations?.text,
          defaultLanguage
        )
      : writeLocalizedCharacterString(
          constraint.text,
          constraint.translations?.text,
          defaultLanguage
        )
  )
}

export function removeOtherConstraints() {
  return tap(
    pipe(
      findChildrenElement('gmd:resourceConstraints'),
      mapArray(
        removeChildren(
          pipe(
            findChildrenElement('gmd:MD_Constraints'),
            filterArray(
              pipe(
                findNestedElements('gmd:useLimitation'),
                (array) => array.length > 0
              )
            )
          )
        )
      )
    )
  )
}

export function removeSecurityConstraints() {
  return tap(
    pipe(
      findChildrenElement('gmd:resourceConstraints'),
      mapArray(
        removeChildren(
          pipe(
            findChildrenElement('gmd:MD_SecurityConstraints'),
            filterArray(
              pipe(
                findNestedElements('gmd:useLimitation'),
                (array) => array.length > 0
              )
            )
          )
        )
      )
    )
  )
}

export function removeLegalConstraints() {
  return tap(
    pipe(
      findChildrenElement('gmd:resourceConstraints'),
      mapArray(
        removeChildren(
          pipe(
            findChildrenElement('gmd:MD_LegalConstraints'),
            filterArray(
              pipe(
                findNestedElements(
                  'gmd:accessConstraints',
                  'gmd:MD_RestrictionCode'
                ),
                mapArray(readAttribute('codeListValue')),
                (restrictionCodes) =>
                  restrictionCodes.every((code) => code !== 'license')
              )
            )
          )
        )
      )
    )
  )
}

export function removeEmptyResourceConstraints() {
  return removeChildren(
    pipe(
      findChildrenElement('gmd:resourceConstraints'),
      filterArray(pipe(allChildrenElement, (array) => array.length === 0))
    )
  )
}

export function removeLicenses() {
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

export function createLicense(
  license: Constraint,
  defaultLanguage: LanguageCode
) {
  return pipe(
    createNestedElement('gmd:resourceConstraints', 'gmd:MD_LegalConstraints'),
    appendChildren(
      pipe(
        createNestedElement('gmd:accessConstraints', 'gmd:MD_RestrictionCode'),
        writeAttribute(
          'codeList',
          'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode'
        ),
        writeAttribute('codeListValue', 'license')
      ),
      pipe(
        createNestedElement('gmd:accessConstraints', 'gmd:MD_RestrictionCode'),
        writeAttribute(
          'codeList',
          'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode'
        ),
        writeAttribute('codeListValue', 'otherRestrictions')
      ),
      pipe(
        createElement('gmd:otherConstraints'),
        'url' in license
          ? writeAnchor(license.url, license.text)
          : writeLocalizedCharacterString(
              license.text,
              license.translations?.text,
              defaultLanguage
            )
      )
    )
  )
}

export function removeOnlineResources() {
  return removeChildrenByName('gmd:distributionInfo')
}

function appendOnlineResourceFormat(mimeType: string) {
  return appendChildren(
    pipe(
      createNestedElement('gmd:distributionFormat', 'gmd:MD_Format'),
      appendChildren(
        pipe(createElement('gmd:name'), writeCharacterString(mimeType)),
        pipe(
          createElement('gmd:version'),
          writeCharacterString('1.0') // hardcoding this as it most likely won't be used but is mandatory
        )
      )
    )
  )
}

export function createDistributionInfo() {
  return createNestedElement('gmd:distributionInfo', 'gmd:MD_Distribution')
}

// apply to MD_Distribution
export function appendOnlineResource(
  onlineResource: DatasetOnlineResource,
  appendFormatFn: (
    mimeType: string
  ) => ChainableFunction<XmlElement, XmlElement>,
  translations: RecordTranslations,
  defaultLanguage: LanguageCode
) {
  let name: string
  let functionCode: string
  let protocol: string
  if (onlineResource.type === 'service') {
    // should we keep the identifierInService? read-write duplicate with name
    name = onlineResource.identifierInService // this is for GeoNetwork to know the layer name
    functionCode = 'download'
    protocol = getServiceDistributionProtocol(onlineResource)
  } else if (onlineResource.type === 'download') {
    name = onlineResource.name
    functionCode = 'download'
    protocol = 'WWW:DOWNLOAD'
  } else {
    name = onlineResource.name
    functionCode = 'information'
    protocol = 'WWW:LINK'
  }
  const appendTransferOptions = appendChildren(
    pipe(
      createNestedElement(
        'gmd:transferOptions',
        'gmd:MD_DigitalTransferOptions',
        'gmd:onLine',
        'gmd:CI_OnlineResource'
      ),
      writeLinkage(onlineResource.url),
      'description' in onlineResource
        ? appendChildren(
            pipe(
              createElement('gmd:description'),
              writeLocalizedCharacterString(
                onlineResource.description,
                onlineResource.translations?.description,
                defaultLanguage
              )
            )
          )
        : noop,
      name !== undefined
        ? appendChildren(
            pipe(
              createElement('gmd:name'),
              writeLocalizedCharacterString(
                name,
                onlineResource.translations?.name,
                defaultLanguage
              )
            )
          )
        : noop,
      appendChildren(
        pipe(createElement('gmd:protocol'), writeCharacterString(protocol)),
        pipe(
          createNestedElement('gmd:function', 'gmd:CI_OnLineFunctionCode'),
          writeAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode'
          ),
          writeAttribute('codeListValue', functionCode)
        )
      )
    )
  )
  return pipe(
    'mimeType' in onlineResource
      ? appendFormatFn(onlineResource.mimeType)
      : noop,
    appendTransferOptions
  )
}

/**
 * Looks for srv:SV_ServiceIdentification or gmd:MD_DataIdentification element
 * depending on record type, create if missing
 */
export function findOrCreateIdentification() {
  return (rootEl: XmlElement) => {
    const kind = readKind(rootEl)
    let eltName = 'gmd:MD_DataIdentification'
    if (kind === 'service') eltName = 'srv:SV_ServiceIdentification'
    return findNestedChildOrCreate('gmd:identificationInfo', eltName)(rootEl)
  }
}

export function findOrCreateDistribution() {
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
    writeAttribute(
      'codeList',
      'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode'
    ),
    writeAttribute('codeListValue', kindToCodeListValue(record))
  )(rootEl)
}

export function writeTitle(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:citation', 'gmd:CI_Citation', 'gmd:title'),
    writeLocalizedCharacterString(
      record.title,
      record.translations?.title,
      record.defaultLanguage
    )
  )(rootEl)
}

export function writeAbstract(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    findChildOrCreate('gmd:abstract'),
    writeLocalizedCharacterString(
      record.abstract,
      record.translations?.abstract,
      record.defaultLanguage
    )
  )(rootEl)
}

export function writeStatus(record: DatasetRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:status', 'gmd:MD_ProgressCode'),
    writeAttribute(
      'codeList',
      'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode'
    ),
    writeAttribute('codeListValue', getProgressCode(record.status))
  )(rootEl)
}

export function writeContacts(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    removeChildrenByName('gmd:contact'),
    appendChildren(
      ...record.contacts.map((contact) =>
        pipe(
          createElement('gmd:contact'),
          appendResponsibleParty(
            contact,
            record.translations,
            record.defaultLanguage
          )
        )
      )
    )
  )(rootEl)
}

export function writeContactsForResource(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  pipe(
    findOrCreateIdentification(),
    removeChildrenByName('gmd:pointOfContact'),
    removeChildrenByName('gmd:contact'),
    appendChildren(
      ...record.contactsForResource.map((contact) =>
        pipe(
          createElement('gmd:pointOfContact'),
          appendResponsibleParty(
            contact,
            record.translations,
            record.defaultLanguage
          )
        )
      )
    )
  )(rootEl)
}

export function writeKeywords(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    removeKeywords(),
    appendKeywords(record.keywords, record.defaultLanguage)
  )(rootEl)
}

export function writeTopics(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    removeChildrenByName('gmd:topicCategory'),
    appendChildren(
      ...record.topics.map((topic) =>
        pipe(
          createNestedElement('gmd:topicCategory', 'gmd:MD_TopicCategoryCode'),
          setTextContent(topic)
        )
      )
    )
  )(rootEl)
}

export function writeLicenses(record: CatalogRecord, rootEl: XmlElement) {
  pipe(
    findOrCreateIdentification(),
    removeLicenses(),
    appendChildren(
      ...record.licenses.map((license) =>
        createLicense(license, record.defaultLanguage)
      )
    )
  )(rootEl)
}

export function writeLegalConstraints(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  pipe(
    findOrCreateIdentification(),
    removeLegalConstraints(),
    removeEmptyResourceConstraints(),
    appendChildren(
      ...record.legalConstraints.map((c) =>
        createConstraint(c, 'legal', record.defaultLanguage)
      )
    )
  )(rootEl)
}

export function writeSecurityConstraints(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  pipe(
    findOrCreateIdentification(),
    removeSecurityConstraints(),
    removeEmptyResourceConstraints(),
    appendChildren(
      ...record.securityConstraints.map((c) =>
        createConstraint(c, 'security', record.defaultLanguage)
      )
    )
  )(rootEl)
}

export function writeOtherConstraints(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  pipe(
    findOrCreateIdentification(),
    removeOtherConstraints(),
    removeEmptyResourceConstraints(),
    appendChildren(
      ...record.otherConstraints.map((c) =>
        createConstraint(c, 'other', record.defaultLanguage)
      )
    )
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
          createNestedChild(
            'gmd:userDefinedMaintenanceFrequency',
            'gts:TM_PeriodDuration'
          ),
          setTextContent(getISODuration(record.updateFrequency))
        )
      : pipe(
          createNestedChild(
            'gmd:maintenanceAndUpdateFrequency',
            'gmd:MD_MaintenanceFrequencyCode'
          ),
          writeAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_MaintenanceFrequencyCode'
          ),
          writeAttribute(
            'codeListValue',
            getMaintenanceFrequencyCode(record.updateFrequency)
          )
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

export function removeResourceDate(
  type: 'revision' | 'creation' | 'publication'
) {
  return pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:citation', 'gmd:CI_Citation'),
    removeChildren(
      pipe(
        findNestedElements('gmd:date'),
        filterArray(
          pipe(
            findNestedElement(
              'gmd:CI_Date',
              'gmd:dateType',
              'gmd:CI_DateTypeCode'
            ),
            readAttribute('codeListValue'),
            map((value) => value === type)
          )
        )
      )
    )
  )
}

export function appendResourceDate(
  date: Date,
  type: 'revision' | 'creation' | 'publication'
) {
  return pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:citation', 'gmd:CI_Citation'),
    appendChildren(
      pipe(
        createNestedElement('gmd:date', 'gmd:CI_Date'),
        appendChildren(
          pipe(createElement('gmd:date'), writeDateTime(date)),
          pipe(
            createNestedElement('gmd:dateType', 'gmd:CI_DateTypeCode'),
            writeAttribute(
              'codeList',
              'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode'
            ),
            writeAttribute('codeListValue', type)
          )
        )
      )
    )
  )
}

export function writeResourceCreated(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  removeResourceDate('creation')(rootEl)
  if (!record.resourceCreated) return
  appendResourceDate(record.resourceCreated, 'creation')(rootEl)
}

export function writeResourceUpdated(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  removeResourceDate('revision')(rootEl)
  if (!record.resourceUpdated) return
  appendResourceDate(record.resourceUpdated, 'revision')(rootEl)
}

export function writeResourcePublished(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  removeResourceDate('publication')(rootEl)
  if (!record.resourcePublished) return
  appendResourceDate(record.resourcePublished, 'publication')(rootEl)
}

export function writeReuseType(record: CatalogRecord, rootEl: XmlElement) {
  writeKind(record, rootEl)
}

export function writeSpatialRepresentation(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  if (!record.spatialRepresentation) {
    pipe(
      findOrCreateIdentification(),
      removeChildrenByName('gmd:spatialRepresentationType')
    )(rootEl)
    return
  }
  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate(
      'gmd:spatialRepresentationType',
      'gmd:MD_SpatialRepresentationTypeCode'
    ),
    writeAttribute(
      'codeList',
      'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_SpatialRepresentationTypeCode'
    ),
    writeAttribute('codeListValue', record.spatialRepresentation)
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
      ...record.overviews
        .filter((overview) => overview.url)
        .map((overview) =>
          pipe(
            createNestedElement('gmd:graphicOverview', 'gmd:MD_BrowseGraphic'),
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

export function writeLineage(record: DatasetRecord, rootEl: XmlElement) {
  pipe(
    findNestedChildOrCreate(
      'gmd:dataQualityInfo',
      'gmd:DQ_DataQuality',
      'gmd:lineage',
      'gmd:LI_Lineage',
      'gmd:statement'
    ),
    writeLocalizedCharacterString(
      record.lineage,
      record.translations?.lineage,
      record.defaultLanguage
    )
  )(rootEl)
}

export function getServiceEndpointProtocol(endpoint: ServiceEndpoint): string {
  switch (endpoint.accessServiceProtocol.toLowerCase()) {
    case 'wfs':
      return 'OGC:WFS'
    case 'wms':
      return 'OGC:WMS'
    case 'wps':
      return 'OGC:WPS'
    default:
      return endpoint.accessServiceProtocol
  }
}

export function createOnlineResource(onlineResource: ServiceOnlineResource) {
  let linkageUrl, functionCode, protocol
  if (onlineResource.type === 'endpoint') {
    linkageUrl = onlineResource.url.toString()
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
      createNestedChild(
        'gmd:MD_DigitalTransferOptions',
        'gmd:onLine',
        'gmd:CI_OnlineResource'
      ),
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
          createNestedElement('gmd:function', 'gmd:CI_OnLineFunctionCode'),
          writeAttribute(
            'codeList',
            'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode'
          ),
          writeAttribute('codeListValue', functionCode)
        )
      )
    )
  )
  return pipe(
    createNestedElement('gmd:distributionInfo', 'gmd:MD_Distribution'),
    appendTransferOptions
  )
}

export function appendDatasetOnlineResources(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  appendChildren(
    ...record.onlineResources.map((d) =>
      pipe(
        createDistributionInfo(),
        appendOnlineResource(
          d,
          appendOnlineResourceFormat,
          record.translations,
          record.defaultLanguage
        )
      )
    )
  )(rootEl)
}

export function appendServiceOnlineResources(
  record: ServiceRecord | ReuseRecord,
  rootEl: XmlElement
) {
  appendChildren(...record.onlineResources.map(createOnlineResource))(rootEl)
}

export function writeOnlineResources(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  removeOnlineResources()(rootEl)

  if (record.kind === 'dataset') {
    appendDatasetOnlineResources(record, rootEl)
    return
  }
  appendServiceOnlineResources(record, rootEl)
}

export function writeTemporalExtents(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:extent', 'gmd:EX_Extent'),
    removeChildrenByName('gmd:temporalElement'),
    appendChildren(
      ...record.temporalExtents.map((extent) =>
        pipe(
          createNestedElement('gmd:temporalElement', 'gmd:EX_TemporalExtent'),
          appendChildren(
            'start' in extent && 'end' in extent
              ? pipe(
                  createNestedElement('gmd:extent', 'gml:TimePeriod'),
                  appendChildren(
                    pipe(
                      createElement('gml:beginPosition'),
                      pipe(
                        extent.start
                          ? setTextContent(format(extent.start, 'yyyy-MM-dd'))
                          : writeAttribute('indeterminatePosition', 'unknown')
                      )
                    ),
                    pipe(
                      createElement('gml:endPosition'),
                      pipe(
                        extent.end
                          ? setTextContent(format(extent.end, 'yyyy-MM-dd'))
                          : writeAttribute('indeterminatePosition', 'unknown')
                      )
                    )
                  )
                )
              : pipe(
                  createNestedElement(
                    'gmd:extent',
                    'gml:TimeInstant',
                    'gml:timePosition'
                  ),
                  extent.start
                    ? setTextContent(format(extent.start, 'yyyy-MM-dd'))
                    : writeAttribute('indeterminatePosition', 'unknown')
                )
          )
        )
      )
    )
  )(rootEl)
}

export function writeSpatialExtents(record: DatasetRecord, rootEl: XmlElement) {
  const appendBoundingPolygon = (geometry?: Geometry) => {
    if (!geometry) return null
    return pipe(
      createElement('gmd:EX_BoundingPolygon'),
      appendChildren(
        pipe(
          createElement('gmd:polygon'),
          appendChildren(() => writeGeometry(geometry))
        )
      )
    )
  }

  const appendGeographicBoundingBox = (
    bbox?: [number, number, number, number]
  ) => {
    if (!bbox) return null
    return pipe(
      createElement('gmd:EX_GeographicBoundingBox'),
      appendChildren(
        pipe(createElement('gmd:westBoundLongitude'), writeDecimal(bbox[0])),
        pipe(createElement('gmd:eastBoundLongitude'), writeDecimal(bbox[2])),
        pipe(createElement('gmd:southBoundLatitude'), writeDecimal(bbox[1])),
        pipe(createElement('gmd:northBoundLatitude'), writeDecimal(bbox[3]))
      )
    )
  }

  const appendGeographicDescription = (
    description?: string,
    translations?: FieldTranslation
  ) => {
    if (!description) return null
    return pipe(
      createNestedElement(
        'gmd:EX_GeographicDescription',
        'gmd:geographicIdentifier',
        'gmd:MD_Identifier',
        'gmd:code'
      ),
      writeLocalizedCharacterString(
        description,
        translations,
        record.defaultLanguage
      )
    )
  }

  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:extent', 'gmd:EX_Extent'),
    removeChildrenByName('gmd:geographicElement'),
    appendChildren(
      ...record.spatialExtents.map((extent) =>
        pipe(
          createElement('gmd:geographicElement'),
          appendChildren(
            appendBoundingPolygon(extent.geometry),
            appendGeographicBoundingBox(extent.bbox),
            appendGeographicDescription(
              extent.description,
              extent.translations?.description
            )
          )
        )
      )
    )
  )(rootEl)
}

export function writeLanguages(record: DatasetRecord, rootEl: XmlElement) {
  // clear existing
  removeChildrenByName('gmd:locale')(rootEl)

  // do not write down languages if there is nothing else than the default one
  if (!record.otherLanguages?.length) {
    return
  }

  const createLanguageEl = (lang: LanguageCode) =>
    pipe(
      createNestedElement('gmd:locale', 'gmd:PT_Locale'),
      writeAttribute('id', lang.toUpperCase()),
      createNestedChild('gmd:languageCode', 'gmd:LanguageCode'),
      writeAttribute('codeList', 'http://www.loc.gov/standards/iso639-2/'),
      writeAttribute('codeListValue', getLang3FromLang2(lang) ?? lang)
    )

  // add new languages (only if other than default one)
  appendChildren(
    createLanguageEl(record.defaultLanguage),
    ...record.otherLanguages.map(createLanguageEl)
  )(rootEl)
}

export function writeDefaultLanguage(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  const lang3 = getLang3FromLang2(record.defaultLanguage.toLowerCase())
  return pipe(
    findNestedChildOrCreate('gmd:language', 'gmd:LanguageCode'),
    writeAttribute('codeList', 'http://www.loc.gov/standards/iso639-2/'),
    writeAttribute('codeListValue', lang3)
  )(rootEl)
}

export function writeResourceIdentifier(
  record: DatasetRecord,
  rootEl: XmlElement
) {
  pipe(
    findOrCreateIdentification(),
    findNestedChildOrCreate('gmd:citation', 'gmd:CI_Citation'),
    removeChildrenByName('gmd:identifier'),
    record.resourceIdentifier
      ? pipe(
          createNestedChild('gmd:identifier', 'gmd:MD_Identifier', 'gmd:code'),
          writeCharacterString(record.resourceIdentifier)
        )
      : noop
  )(rootEl)
}
