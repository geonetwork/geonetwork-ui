import { getTemporalRangeUnion } from './temporal-extent-union'
import { DateService } from '../services'

// Create a minimal DateService mock by casting
const dateServiceMock = {
  formatDate: (
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return options
      ? dateObj.toLocaleDateString('en-US', options)
      : dateObj.toLocaleDateString('en-US')
  },
  formatDateTime: (
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return options
      ? dateObj.toLocaleString('en', options)
      : dateObj.toLocaleString('en')
  },
} as unknown as DateService

beforeAll(() => {
  // Override the native toLocaleDateString to use 'en' locale if called as a fallback.
  const originalFn = Date.prototype.toLocaleDateString
  Date.prototype.toLocaleDateString = function () {
    return originalFn.call(this, 'en')
  }
})

describe('getTemporalRangeUnion', () => {
  it('should return the union of temporal ranges', () => {
    const ranges = [
      { start: new Date('2022-01-01'), end: new Date('2022-01-10') },
      { start: new Date('2022-01-05'), end: new Date('2022-01-15') },
      { start: new Date('2022-01-12'), end: new Date('2022-01-20') },
    ]

    const expectedUnion = {
      start: '1/1/2022',
      end: '1/20/2022',
    }

    const union = getTemporalRangeUnion(ranges, dateServiceMock)

    expect(union).toEqual(expectedUnion)
  })

  it('should return null if no ranges are provided', () => {
    const ranges = []

    const union = getTemporalRangeUnion(ranges, dateServiceMock)

    expect(union).toBe(undefined)
  })

  it('should return an undefined end date if one range does not have it', () => {
    const ranges = [
      { start: new Date('2022-01-01') },
      { start: new Date('2022-01-05'), end: new Date('2022-01-15') },
      { start: new Date('2022-01-12'), end: new Date('2022-01-20') },
    ]

    const expectedUnion = {
      start: '1/1/2022',
      end: undefined,
    }

    const union = getTemporalRangeUnion(ranges, dateServiceMock)

    expect(union).toEqual(expectedUnion)
  })

  it('should return an undefined start date if one range does not have it', () => {
    const ranges = [
      { start: new Date('2022-01-01'), end: new Date('2022-01-10') },
      { end: new Date('2022-01-15') },
      { start: new Date('2022-01-12'), end: new Date('2022-01-20') },
    ]

    const expectedUnion = {
      start: undefined,
      end: '1/20/2022',
    }

    const union = getTemporalRangeUnion(ranges, dateServiceMock)

    expect(union).toEqual(expectedUnion)
  })
})
