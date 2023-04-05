import {
  DatasetDistribution,
  DatasetDistributionType,
  DatasetDownloadDistribution,
  DatasetServiceDistribution,
  Individual,
  OnlineLinkResource,
  Organization,
  Role,
} from '@geonetwork-ui/util/types/metadata'
import { matchProtocol } from '../common/distribution.mapper'
import { getRoleFromRoleCode } from '../iso19139/codelists/role.mapper'

export type SourceWithUnknownProps = { [key: string]: unknown }

export const selectField = <T>(
  source: SourceWithUnknownProps,
  fieldName: string
): T | null =>
  source !== null && fieldName in source ? (source[fieldName] as T) : null

export const selectFallbackFields = <T>(
  source: SourceWithUnknownProps,
  ...fieldNames: string[]
): T | null =>
  fieldNames.reduce<T>(
    (prev, curr) => (prev === null ? selectField(source, curr) : prev),
    null
  )

export const selectFallback = <T, U>(field: T, fallback: U): T | U =>
  field === null ? fallback : field

export const selectTranslatedValue = <T>(
  source: SourceWithUnknownProps
): T | null => selectField(source, 'default')

export const selectTranslatedField = <T>(
  source: SourceWithUnknownProps,
  fieldName: string
): T | null => selectTranslatedValue(selectField(source, fieldName))

export const toDate = (field) => new Date(field)

export const getFirstValue = (field) =>
  Array.isArray(field) ? field[0] : field

export const getAsArray = (field) =>
  Array.isArray(field) ? field : field !== null ? [field] : []

export const getAsUrl = (
  field,
  location: string = window.location.toString()
) => {
  // an empty string is not a valid url, even though it could be considered an empty path to the root
  if (field === '' || field === null) return null
  try {
    return new URL(field, location)
  } catch {
    return null
  }
}

export function getLinkType(
  url: string,
  protocol?: string
): DatasetDistributionType {
  if (!protocol) return 'other'
  if (/^ESRI:REST/.test(protocol) && /FeatureServer/.test(url)) return 'service'
  if (/^OGC:/.test(protocol)) return 'service'
  if (/^WWW:DOWNLOAD/.test(protocol)) return 'download'
  if (protocol === 'WWW:LINK:LANDING_PAGE') return 'link'
  return 'other'
}

export const mapLink = (
  sourceLink: SourceWithUnknownProps
): DatasetDistribution | null => {
  const url = getAsUrl(selectField<string>(sourceLink, 'url'))?.toString()
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
  const protocol = selectField<string>(sourceLink, 'protocol')
  const type = getLinkType(url, protocol)
  const accessServiceProtocol = matchProtocol(protocol)
  const mimeTypeMatches = protocol && protocol.match(/^WWW:DOWNLOAD:(.+\/.+)$/)
  const mimeType = mimeTypeMatches && mimeTypeMatches[1]

  const distribution = {
    ...(name && { name }),
    ...(description && { description }),
    type,
  }
  switch (type) {
    case 'service':
      return {
        ...distribution,
        accessServiceUrl: new URL(url),
        accessServiceProtocol,
      } as DatasetServiceDistribution
    case 'link':
    case 'other':
      return {
        ...distribution,
        linkUrl: new URL(url),
      } as OnlineLinkResource
    case 'download':
      return {
        ...distribution,
        downloadUrl: new URL(url),
        ...(mimeType && { mimeType }),
      } as DatasetDownloadDistribution
  }
}

const mapLogo = (source: SourceWithUnknownProps) => {
  const logo = selectField(source, 'logo')
  return logo ? getAsUrl(`/geonetwork${logo}`) : null
}
export const mapContact = (
  sourceContact: SourceWithUnknownProps,
  sourceRecord: SourceWithUnknownProps
): Individual => {
  const website = getAsUrl(selectField<string>(sourceContact, 'website'))
  const logoUrl = mapLogo(sourceContact)
  const address = selectField<string>(sourceContact, 'address')
  const phone = selectField<string>(sourceContact, 'phone')
  const organization = mapOrganization(sourceContact, sourceRecord)
  return {
    firstName: selectField<string>(sourceContact, 'individual'),
    organization,
    role: getRoleFromRoleCode(selectField<string>(sourceContact, 'role')),
    email: selectField<string>(sourceContact, 'email'),
    ...(website && { website }),
    ...(logoUrl && { logoUrl }),
    ...(address && { address }),
    ...(phone && { phone }),
  }
}

export const mapOrganization = (
  sourceContact: SourceWithUnknownProps,
  sourceRecord: SourceWithUnknownProps
): Organization => {
  const website = getAsUrl(selectField<string>(sourceContact, 'website'))
  const logoUrl = mapLogo(sourceContact)
  return {
    name: selectField<string>(sourceContact, 'organisation'),
    description: selectField<string>(sourceContact, 'individual'),
    ...(website && { website }),
    ...(logoUrl && { logoUrl }),
  }
}
