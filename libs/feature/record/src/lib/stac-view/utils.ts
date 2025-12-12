import { DatasetTemporalExtent } from '@geonetwork-ui/common/domain/model/record'
import { Extent } from '@geospatial-sdk/core/dist/model'
import { StacFilterState } from './stac-view.component'

export function areTemporalExtentsEqual(
  previous: DatasetTemporalExtent | null,
  current: DatasetTemporalExtent | null
): boolean {
  const previousStartTime = previous?.start?.getTime() ?? null
  const previousEndTime = previous?.end?.getTime() ?? null

  const currentStartTime = current?.start?.getTime() ?? null
  const currentEndTime = current?.end?.getTime() ?? null

  return (
    previousStartTime === currentStartTime && previousEndTime === currentEndTime
  )
}

export function areSpatialExtentsEqual(
  previous: Extent | null,
  current: Extent | null
): boolean {
  return (
    previous?.[0] === current?.[0] &&
    previous?.[1] === current?.[1] &&
    previous?.[2] === current?.[2] &&
    previous?.[3] === current?.[3]
  )
}

export function areFilterStatesEqual(
  previous: StacFilterState,
  current: StacFilterState
): boolean {
  const sameTemporalExtents = areTemporalExtentsEqual(
    previous.temporalExtent,
    current.temporalExtent
  )

  const sameSpatialExtents =
    !current.isSpatialExtentFilterEnabled ||
    areSpatialExtentsEqual(previous.spatialExtent, current.spatialExtent)

  const sameIsSpatialExtentFilterEnabled =
    previous.isSpatialExtentFilterEnabled ===
    current.isSpatialExtentFilterEnabled

  const samePageUrl = previous.pageUrl === current.pageUrl

  return (
    sameTemporalExtents &&
    sameSpatialExtents &&
    sameIsSpatialExtentFilterEnabled &&
    samePageUrl
  )
}
