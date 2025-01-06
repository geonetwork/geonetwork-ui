export function getTemporalRangeUnion(
  ranges: {
    start?: Date
    end?: Date
  }[]
) {
  let earliestStartDate = Infinity
  let latestEndDate = -Infinity
  if (ranges.length) {
    for (let i = 0; i < ranges.length; i++) {
      const rangeStart = ranges[i].start
        ? new Date(ranges[i].start).getTime()
        : -Infinity
      const rangeEnd = ranges[i].end
        ? new Date(ranges[i].end).getTime()
        : Infinity
      if (rangeStart < earliestStartDate) {
        earliestStartDate = rangeStart
      }
      if (rangeEnd > latestEndDate) {
        latestEndDate = rangeEnd
      }
    }
    return {
      start:
        earliestStartDate !== -Infinity
          ? new Date(earliestStartDate).toLocaleDateString()
          : undefined,
      end:
        latestEndDate !== Infinity
          ? new Date(latestEndDate).toLocaleDateString()
          : undefined,
    }
  } else {
    return undefined
  }
}
