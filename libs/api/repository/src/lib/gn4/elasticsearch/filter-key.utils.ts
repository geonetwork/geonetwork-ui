export const CUSTOM_FILTER_KEY_SEPARATOR = '#'

export function toCustomFilterKey(esFieldName: string, filterName: string) {
  return `${esFieldName}${CUSTOM_FILTER_KEY_SEPARATOR}${filterName}`
}

export function getEsFieldName(filterKey: string) {
  return filterKey.split(CUSTOM_FILTER_KEY_SEPARATOR)[0]
}
