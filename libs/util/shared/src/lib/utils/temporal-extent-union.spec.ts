import { getTemporalRangeUnion } from './temporal-extent-union'

// lock locale to en
beforeAll(() => {
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

    const union = getTemporalRangeUnion(ranges)

    expect(union).toEqual(expectedUnion)
  })

  it('should return null if no ranges are provided', () => {
    const ranges = []

    const union = getTemporalRangeUnion(ranges)

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

    const union = getTemporalRangeUnion(ranges)

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

    const union = getTemporalRangeUnion(ranges)

    expect(union).toEqual(expectedUnion)
  })
})
