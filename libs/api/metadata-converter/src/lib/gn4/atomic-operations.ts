import {
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { getRoleFromRoleCode } from '../iso19139/utils/role.mapper'
import { Thesaurus } from './types'
import { getKeywordTypeFromKeywordTypeCode } from '../iso19139/utils/keyword.mapper'

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
  source: SourceWithUnknownProps,
  lang3: string
): T | null =>
  selectFallback(selectField(source, lang3), selectField(source, 'default'))

export const selectTranslatedField = <T>(
  source: SourceWithUnknownProps,
  fieldName: string,
  lang3: string
): T | null => selectTranslatedValue(selectField(source, fieldName), lang3)

export const toDate = (field) => new Date(field)

export const getFirstValue = (field) =>
  Array.isArray(field) ? field[0] : field

export const getArrayItem = (field, index) =>
  Array.isArray(field) && field[index] !== undefined ? field[index] : null

export const getAsArray = (field) =>
  Array.isArray(field) ? field : field !== null ? [field] : []

export const getAsUrl = (
  field,
  location: string = window.location.toString()
) => {
  // an empty string is not a valid url, even though it could be considered an empty path to the root
  if (field === '' || field === null) return null
  let url = field
  if (field.match(/^www\./)) url = `https://${field}`
  try {
    return new URL(url, location)
  } catch {
    return null
  }
}

export const mapLogo = (source: SourceWithUnknownProps) => {
  const logo = selectFallbackFields(source, 'logoUrl', 'logo')
  return logo ? getAsUrl(`/geonetwork${logo}`) : null
}

export const mapOrganization = (
  sourceContact: SourceWithUnknownProps,
  lang3: string
): Organization => {
  const website = getAsUrl(selectField<string>(sourceContact, 'website'))
  const logoUrl = getAsUrl(selectField<string>(sourceContact, 'logo'))
  return {
    name: selectFallback(
      selectTranslatedField<string>(sourceContact, 'organisationObject', lang3),
      selectField<string>(sourceContact, 'organisation')
    ),
    ...(logoUrl && { logoUrl }),
    ...(website && { website }),
  }
}

export const mapContact = (
  sourceContact: SourceWithUnknownProps,
  lang3: string
): Individual => {
  const address = selectField<string>(sourceContact, 'address')
  const phone = selectField<string>(sourceContact, 'phone')
  return {
    lastName: selectField<string>(sourceContact, 'individual'),
    organization: mapOrganization(sourceContact, lang3),
    email: selectField<string>(sourceContact, 'email'),
    role: getRoleFromRoleCode(selectField<string>(sourceContact, 'role')),
    ...(address && { address }),
    ...(phone && { phone }),
  }
}

export const mapKeywords = (thesauri: Thesaurus[], language: string) => {
  const keywords = []
  for (const thesaurusId in thesauri) {
    const rawThesaurus = thesauri[thesaurusId]
    let thesaurus = null
    if (rawThesaurus.id) {
      const thesaurusSource: SourceWithUnknownProps = { ...rawThesaurus }
      const url = getAsUrl(selectField(thesaurusSource, 'link'))
      const name = selectField(thesaurusSource, 'title')
      thesaurus = {
        id: rawThesaurus.id,
        ...(name && { name }),
        ...(url && { url }),
      }
    }
    for (const keyword of rawThesaurus.keywords) {
      keywords.push({
        label: selectTranslatedValue<string>(keyword, language),
        type: getKeywordTypeFromKeywordTypeCode(rawThesaurus.theme),
        ...(keyword.link && { key: keyword.link }),
        ...(thesaurus && { thesaurus }),
      })
    }
  }

  return keywords
}
