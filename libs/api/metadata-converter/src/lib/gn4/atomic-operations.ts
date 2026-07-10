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

export interface KeywordTree {
  default?: string[]
}

/**
 * Resolves a keyword's ancestor path within its thesaurus tree, or null for a
 * root-level keyword (no ancestors to show). Tree entries are `^`-joined label
 * paths (default language); they aren't index-aligned with the keywords, so we
 * match on the last segment (not by position/URI), shortest path on poly-hierarchy.
 */
export const getKeywordHierarchyPath = (
  keywordDefaultLabel: string,
  tree?: KeywordTree | null
): string[] | null => {
  if (!keywordDefaultLabel || !tree?.default) return null
  const shortest = tree.default
    .map((entry) => entry.split('^'))
    .filter((path) => path[path.length - 1] === keywordDefaultLabel)
    .reduce(
      (shortest, path) =>
        !shortest || path.length < shortest.length ? path : shortest,
      null
    )
  return shortest?.length > 1 ? shortest : null
}

export const mapKeywords = (
  thesauri: Record<string, Thesaurus>,
  language: string,
  source?: SourceWithUnknownProps
) => {
  const keywords = []
  for (const thesaurusId in thesauri) {
    const rawThesaurus = thesauri[thesaurusId]
    // thesauri have an `id` (registered) or a `multilingualTitle` (cited);
    // free-keyword groups only have a machine-key `title` like "otherKeywords-theme"
    const { id, multilingualTitle, link = null } = rawThesaurus
    let thesaurus = null
    if (id || multilingualTitle) {
      const url = getAsUrl(link)
      const name = multilingualTitle
        ? selectTranslatedValue<string>(multilingualTitle, language)
        : rawThesaurus.title
      thesaurus = {
        ...(id && { id }),
        ...(name && { name }),
        ...(url && { url }),
      }
    }
    const tree =
      source && selectField<KeywordTree>(source, `${thesaurusId}_tree`)
    // free-keyword groups have no `theme` field; their type is in the group key
    const typeCode =
      rawThesaurus.theme || thesaurusId.match(/otherKeywords-(\w+)$/)?.[1]
    for (const keyword of rawThesaurus.keywords) {
      const hierarchyPath = getKeywordHierarchyPath(keyword.default, tree)
      keywords.push({
        label: selectTranslatedValue<string>(keyword, language),
        type: getKeywordTypeFromKeywordTypeCode(typeCode),
        ...(keyword.link && { key: keyword.link }),
        ...(thesaurus && { thesaurus }),
        ...(hierarchyPath && { hierarchyPath }),
      })
    }
  }

  return keywords
}
