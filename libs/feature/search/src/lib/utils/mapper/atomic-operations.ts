import {
  MetadataContact,
  MetadataLink,
  MetadataLinkType,
} from '@geonetwork-ui/util/shared'

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

export const getAsUrl = (field) => {
  // an empty string is not a valid url, even though it could be considered an empty path to the root
  if (field === '' || field === null) return null
  try {
    return new URL(field, window.location.toString()).toString()
  } catch {
    return null
  }
}

export function getLinkType(url: string, protocol?: string): MetadataLinkType {
  if (!protocol) return MetadataLinkType.OTHER
  if (/^ESRI:REST/.test(protocol) && /FeatureServer/.test(url))
    return MetadataLinkType.ESRI_REST
  if (/^OGC:WMS/.test(protocol)) return MetadataLinkType.WMS
  if (/^OGC:WFS/.test(protocol)) return MetadataLinkType.WFS
  if (/^OGC:WMTS/.test(protocol)) return MetadataLinkType.WMTS
  if (/^WWW:DOWNLOAD/.test(protocol)) return MetadataLinkType.DOWNLOAD
  if (protocol === 'WWW:LINK:LANDING_PAGE') return MetadataLinkType.LANDING_PAGE
  return MetadataLinkType.OTHER
}

export const mapLink = (
  sourceLink: SourceWithUnknownProps
): MetadataLink | null => {
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

  const mimeTypeMatches = protocol && protocol.match(/^WWW:DOWNLOAD:(.+\/.+)$/)
  const mimeType = mimeTypeMatches && mimeTypeMatches[1]

  const type = getLinkType(url, protocol)

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

const mapLogo = (source: SourceWithUnknownProps) => {
  const logo = selectField(source, 'logo')
  return logo ? getAsUrl(`/geonetwork${logo}`) : null
}
export const mapContact = (
  sourceContact: SourceWithUnknownProps,
  sourceRecord: SourceWithUnknownProps
): MetadataContact => {
  const website = getAsUrl(selectField<string>(sourceContact, 'website'))
  const logoUrl = mapLogo(sourceRecord)
  const address = selectField<string>(sourceContact, 'address')
  const phone = selectField<string>(sourceContact, 'phone')
  return {
    name: selectField<string>(sourceContact, 'individual'),
    organisation: selectField<string>(sourceContact, 'organisation'),
    email: selectField<string>(sourceContact, 'email'),
    ...(website && { website }),
    ...(logoUrl && { logoUrl }),
    ...(address && { address }),
    ...(phone && { phone }),
  }
}
