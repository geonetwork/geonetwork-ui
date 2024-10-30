import { ROUTE_PARAMS, SearchRouteParams } from '../constants'
import { DateRange } from '@geonetwork-ui/feature/search'

export function flattenQueryParams(
  params: SearchRouteParams
): Record<string, unknown> {
  const flattened = { ...params }
  for (const key in params) {
    if (Array.isArray(flattened[key])) {
      flattened[key] = (flattened[key] as string[]).join(',')
    } else if (isDateRange(flattened[key] as DateRange)) {
      flattened[key] = `${
        (flattened[key] as DateRange).start?.toISOString().split('T')[0] || ''
      }..${
        (flattened[key] as DateRange).end?.toISOString().split('T')[0] || ''
      }`
    }
  }

  return flattened
}

export function expandQueryParams(
  params: Record<string, unknown>
): SearchRouteParams {
  // this only matches if the separator ".." is present only once and not dots are present elsewhere
  const ifDate = function (value: string) {
    return value.match(/^[^.]*(\.\.)[^.]*$/)
  }
  const expanded = { ...params }
  for (const key in params) {
    if (
      Object.values(ROUTE_PARAMS).includes(key as ROUTE_PARAMS) &&
      key !== 'publisher' //FIXME: temporary workaround as publisher shouldn't be in ROUTE_PARAMS as it is a search field
    ) {
      //do nothing
    } else if (ifDate(expanded[key] as string)) {
      const [start, end] = (expanded[key] as string).split('..')
      expanded[key] = {
        ...(start && { start: new Date(start) }),
        ...(end && { end: new Date(end) }),
      }
    } else {
      expanded[key] = (expanded[key] as string).split(',')
    }
  }
  return expanded
}

function isDateRange(filter: DateRange): boolean {
  if (!filter) return false
  return typeof filter === 'object' && ('start' in filter || 'end' in filter)
}
