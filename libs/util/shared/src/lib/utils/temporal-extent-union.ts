import { DateService } from '../services'

export function getTemporalRangeUnion(
  ranges: {
    start?: Date
    end?: Date
  }[],
  dateService: DateService
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
          ? dateService.formatDate(new Date(earliestStartDate))
          : undefined,
      end:
        latestEndDate !== Infinity
          ? dateService.formatDate(new Date(latestEndDate))
          : undefined,
    }
  } else {
    return undefined
  }
}
