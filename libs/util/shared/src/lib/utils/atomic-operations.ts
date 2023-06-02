import { MetadataContact } from '../models'

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
  let url = field
  try {
    return new URL(url, window.location.toString()).toString()
  } catch {
    return null
  }
}

export const mapLogo = (source: SourceWithUnknownProps) => {
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
