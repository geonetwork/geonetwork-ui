import { FieldFilter } from '@geonetwork-ui/common/domain/model/search'

export function isDateRange(filter: FieldFilter): boolean {
  if (!filter) return false
  return typeof filter === 'object' && ('start' in filter || 'end' in filter)
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
