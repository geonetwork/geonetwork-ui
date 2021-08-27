import { MetadataLink } from '@geonetwork-ui/util/shared'

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

export const selectFallback = (field, fallback) =>
  field === null ? fallback : field

export const selectTranslatedField = <T>(
  source: SourceWithUnknownProps,
  fieldName: string
): T | null => selectField(selectField(source, fieldName), 'default')

export const toDate = (field) => new Date(field)

export const getFirstValue = (field) =>
  Array.isArray(field) ? field[0] : field

export const getAsArray = (field) =>
  Array.isArray(field) ? field : field !== null ? [field] : []

export const mapLinks = (
  sourceLinks: SourceWithUnknownProps[],
  filter: (MetadataLink) => boolean
): MetadataLink[] =>
  getAsArray(sourceLinks)
    .map((link) => ({
      protocol: selectFallback(selectField<string>(link, 'protocol'), ''),
      url: selectFallback(selectField<string>(link, 'url'), ''),
      description: selectFallback(selectField<string>(link, 'description'), ''),
      name: selectFallback(selectField<string>(link, 'name'), ''),
    }))
    .filter(filter)
