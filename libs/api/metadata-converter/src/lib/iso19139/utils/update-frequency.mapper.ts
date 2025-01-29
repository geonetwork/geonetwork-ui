import {
  UpdateFrequency,
  UpdateFrequencyCode,
  updateFrequencyCodeValues,
} from '@geonetwork-ui/common/domain/model/record'

export function getUpdateFrequencyFromFrequencyCode(
  frequencyCode: string
): UpdateFrequency {
  return frequencyCode &&
    updateFrequencyCodeValues.includes(frequencyCode as UpdateFrequencyCode)
    ? (frequencyCode as UpdateFrequencyCode)
    : null
}
