import { SortByField } from '@geonetwork-ui/common/domain/model/search'

export function sortByToStrings(sortBy: SortByField): string[] {
  const array = Array.isArray(sortBy[0]) ? sortBy : [sortBy]
  return array.map((param) => `${param[0] === 'desc' ? '-' : ''}${param[1]}`)
}

export function sortByToString(sortBy: SortByField): string {
  return sortByToStrings(sortBy)[0]
}

export function sortByFromString(sortByString: string): SortByField {
  return [
    sortByString.startsWith('-') ? 'desc' : 'asc',
    sortByString.startsWith('-') ? sortByString.substring(1) : sortByString,
  ]
}
