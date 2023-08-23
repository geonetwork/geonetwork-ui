import { UpdateFrequency } from '@geonetwork-ui/common/domain/record'

export function getUpdateFrequencyFromFrequencyCode(
  frequencyCode: string
): UpdateFrequency {
  switch (frequencyCode) {
    case 'asNeeded':
      return 'asNeeded'
    case 'unknown':
      return 'unknown'
    case 'irregular':
      return 'irregular'
    case 'notPlanned':
      return 'notPlanned'
    case 'continual':
      return 'continual'
    case 'periodic':
      return 'periodic'
    case 'daily':
      return {
        updatedTimes: 1,
        per: 'day',
      }
    case 'weekly':
      return {
        updatedTimes: 1,
        per: 'week',
      }
    case 'fortnightly':
      return {
        updatedTimes: 0.5,
        per: 'week',
      }
    case 'semimonthly':
      return {
        updatedTimes: 2,
        per: 'month',
      }
    case 'monthly':
      return {
        updatedTimes: 1,
        per: 'month',
      }
    case 'quarterly':
      return {
        updatedTimes: 4,
        per: 'year',
      }
    case 'biannually':
      return {
        updatedTimes: 2,
        per: 'year',
      }
    case 'annually':
      return {
        updatedTimes: 1,
        per: 'year',
      }
    case 'biennially':
      return {
        updatedTimes: 0.5,
        per: 'year',
      }
    default:
      return null
  }
}
