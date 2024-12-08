import { DateRange, isDateRange } from '@geonetwork-ui/api/repository'
import { ROUTE_PARAMS, SearchRouteParams } from '../constants'

export function flattenQueryParams(
  params: SearchRouteParams
): Record<string, unknown> {
  const flattened = { ...params }
  for (const key in params) {
    if (
      Array.isArray(flattened[key]) &&
      (flattened[key] as string[]).length > 0
    ) {
      flattened[key] = [(flattened[key] as string[]).join(',')]
    } else if (isDateRange(flattened[key] as DateRange)) {
      flattened[key] = [
        `${
          (flattened[key] as DateRange).start?.toISOString().split('T')[0] || ''
        }..${
          (flattened[key] as DateRange).end?.toISOString().split('T')[0] || ''
        }`,
      ]
    }
  }

  return flattened
}

export function expandQueryParams(
  params: Record<string, unknown>
): SearchRouteParams {
  const expanded = { ...params }
  for (const key in params) {
    const value: string = Array.isArray(expanded[key])
      ? expanded[key][0]
      : (expanded[key] as string)
    if (typeof value === 'string') {
      if (
        Object.values(ROUTE_PARAMS).includes(key as ROUTE_PARAMS) &&
        key !== 'publisher' //FIXME: temporary workaround as publisher shouldn't be in ROUTE_PARAMS as it is a search field
      ) {
        //do nothing
      } else if (isDateUrl(value)) {
        const [start, end] = value.split('..')
        expanded[key] = {
          ...(start && { start: new Date(start) }),
          ...(end && { end: new Date(end) }),
        }
      } else {
        expanded[key] = value.split(',')
      }
    }
  }
  return expanded
}

// this only matches if the separator ".." is present only once and no dots are present elsewhere
function isDateUrl(value: string) {
  return value.match(/^[^.]*(\.\.)[^.]*$/)
}
