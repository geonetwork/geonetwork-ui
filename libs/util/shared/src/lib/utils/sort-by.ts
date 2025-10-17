import { SortByField } from '@geonetwork-ui/common/domain/model/search'

export function sortByToStrings(sortBy: SortByField): string[] {
  const array = Array.isArray(sortBy[0]) ? sortBy : [sortBy]
  return array.map((param) => `${param[0] === 'desc' ? '-' : ''}${param[1]}`)
}

export function sortByToString(sortBy: SortByField): string {
  return sortByToStrings(sortBy).join(',')
}

export function sortByFromString(sortByString: string): SortByField {
  const fields = sortByString.split(',')
  return fields.map((field) => [
    field.startsWith('-') ? 'desc' : 'asc',
    field.startsWith('-') ? field.substring(1) : field,
  ]) as SortByField
}
