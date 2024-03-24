import {
  findChildElement,
  findChildrenElement,
  findNestedElement,
  findNestedElements,
  readAttribute,
  XmlElement,
} from '../xml-utils'
import {
  ChainableFunction,
  combine,
  flattenArray,
  getAtIndex,
  map,
  mapArray,
  pipe,
} from '../function-utils'
import {
  extractCharacterString,
  extractRole,
  extractUrl,
} from '../iso19139/read-parts'
import {
  Individual,
  Organization,
  RecordKind,
} from '@geonetwork-ui/common/domain/model/record'

export function readKind(rootEl: XmlElement): RecordKind {
  return pipe(
    findNestedElement(
      'mdb:metadataScope',
      'mdb:MD_MetadataScope',
      'mdb:resourceScope',
      'mcc:MD_ScopeCode'
    ),
    readAttribute('codeListValue'),
    map(
      (scopeCode): RecordKind =>
        scopeCode === 'service' ? 'service' : 'dataset'
    )
  )(rootEl)
}

export function findIdentification() {
  return (rootEl: XmlElement) => {
    const kind = readKind(rootEl)
    let eltName = 'mri:MD_DataIdentification'
    if (kind === 'service') eltName = 'srv:SV_ServiceIdentification'
    return findNestedElement('gmd:identificationInfo', eltName)(rootEl)
  }
}

export function findDistribution() {
  return findNestedElement('mdb:distributionInfo', 'mrd:MD_Distribution')
}

// from cit:CI_Responsibility
export function extractOrganization(): ChainableFunction<
  XmlElement,
  Organization
> {
  const getOrganization = findNestedElement('cit:party', 'cit:CI_Organisation')
  const getUrl = pipe(
    getOrganization,
    findNestedElements(
      'cit:contactInfo',
      'cit:CI_Contact',
      'cit:onlineResource',
      'cit:CI_OnlineResource',
      'cit:linkage'
    ),
    getAtIndex(0),
    extractUrl()
  )
  return pipe(
    combine(
      pipe(
        getOrganization,
        findChildElement('cit:name', false),
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

// from cit:CI_Responsibility
export function extractIndividuals(): ChainableFunction<
  XmlElement,
  Array<Individual>
> {
  const getRole = pipe(findChildElement('cit:role'), extractRole())
  const getIndividual = pipe(
    findChildElement('cit:individual'),
    findChildElement('cit:CI_Individual')
  )
  const getPosition = pipe(
    getIndividual,
    findChildElement('cit:positionName'),
    extractCharacterString()
  )
  const getNameParts = pipe(
    getIndividual,
    findChildElement('cit:name'),
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
  const getContacts = pipe(
    findNestedElement('cit:party', 'cit:CI_Organisation'),
    findChildrenElement('cit:contactInfo'),
    mapArray(findChildElement('cit:CI_Contact'))
  )
  const getAddressRoots = pipe(
    getContacts,
    mapArray(findNestedElement('cit:address', 'cit:CI_Address'))
  )
  const getAddresses = pipe(
    getAddressRoots,
    mapArray(
      combine(
        pipe(
          findChildElement('cit:deliveryPoint', false),
          extractCharacterString()
        ),
        pipe(findChildElement('cit:city', false), extractCharacterString()),
        pipe(
          findChildElement('cit:postalCode', false),
          extractCharacterString()
        ),
        pipe(findChildElement('cit:country', false), extractCharacterString())
      )
    ),
    mapArray((parts) => parts.filter((p) => !!p).join(', '))
  )
  const getPhones = pipe(
    getContacts,
    mapArray(findNestedElement('cit:phone', 'cit:CI_Telephone', 'cit:number')),
    mapArray(extractCharacterString())
  )
  const getEmails = pipe(
    getAddressRoots,
    mapArray(
      pipe(
        findChildElement('cit:electronicMailAddress', false),
        extractCharacterString(),
        map((email) => (email === null ? 'missing@missing.com' : email))
      )
    )
  )
  return pipe(
    combine(
      getRole,
      getPosition,
      getNameParts,
      getOrganization,
      getEmails,
      getAddresses,
      getPhones
    ),
    map(
      ([
        role,
        position,
        [firstName, lastName],
        organization,
        emails,
        addresses,
        phones,
      ]) =>
        emails.map((email, i) => ({
          email,
          role,
          organization,
          ...(position && { position }),
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(addresses[i] && { address: addresses[i] }),
          ...(phones[i] && { phone: phones[i] }),
        }))
    )
  )
}

export function readUniqueIdentifier(rootEl: XmlElement): string {
  return pipe(
    findNestedElement(
      'mdb:metadataIdentifier',
      'mcc:MD_Identifier',
      'mcc:code'
    ),
    extractCharacterString()
  )(rootEl)
}

export function readOwnerOrganization(rootEl: XmlElement): Organization {
  return pipe(
    findNestedElement('mdb:contact', 'cit:CI_Responsibility'),
    extractOrganization()
  )(rootEl)
}

export function readContacts(rootEl: XmlElement): Individual[] {
  return pipe(
    combine(
      findChildElement('mdb:contact'),
      findChildrenElement('mri:pointOfContact')
    ),
    flattenArray(),
    mapArray(findChildElement('cit:CI_Responsibility', false)),
    mapArray(extractIndividuals()),
    flattenArray()
  )(rootEl)
}

export function readResourceContacts(rootEl: XmlElement): Individual[] {
  return pipe(
    findDistribution(),
    findChildrenElement('mrd:distributorContact'),
    mapArray(findChildElement('cit:CI_Responsibility', false)),
    mapArray(extractIndividuals()),
    flattenArray()
  )(rootEl)
}

export function readLandingPage(rootEl: XmlElement): URL {
  return pipe(
    findNestedElement(
      'mdb:metadataLinkage',
      'cit:CI_OnlineResource',
      'cit:linkage'
    ),
    extractUrl()
  )(rootEl)
}

export function readLineage(rootEl: XmlElement): string {
  return pipe(
    findNestedElement('mdb:resourceLineage', 'mrl:LI_Lineage', 'mrl:statement'),
    extractCharacterString()
  )(rootEl)
}
