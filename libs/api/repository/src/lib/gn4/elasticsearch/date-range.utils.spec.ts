import { isDateRange, formatDate } from './date-range.utils'
import { FieldFilter } from '@geonetwork-ui/common/domain/model/search'

describe('date-range.utils', () => {
  describe('isDateRange', () => {
    it('should return false if filter is null or undefined', () => {
      expect(isDateRange(null)).toBe(false)
      expect(isDateRange(undefined)).toBe(false)
    })

    it('should return false if filter is not an object', () => {
      expect(isDateRange('string' as any)).toBe(false)
      expect(isDateRange(123 as any)).toBe(false)
    })

    it('should return true if filter has start or end properties', () => {
      const filterWithStart: FieldFilter = { start: '2023-01-01' }
      const filterWithEnd: FieldFilter = { end: '2023-12-31' }
      const filterWithBoth: FieldFilter = {
        start: '2023-01-01',
        end: '2023-12-31',
      }

      expect(isDateRange(filterWithStart)).toBe(true)
      expect(isDateRange(filterWithEnd)).toBe(true)
      expect(isDateRange(filterWithBoth)).toBe(true)
    })

    it('should return false if filter does not have start or end properties', () => {
      const filterWithoutDate: FieldFilter = { someOtherField: 'value' }
      expect(isDateRange(filterWithoutDate)).toBe(false)
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date(2023, 11, 31)
      expect(formatDate(date)).toBe('2023-12-31')
    })

    it('should handle single digit months and days', () => {
      const date = new Date(2023, 3, 5)
      expect(formatDate(date)).toBe('2023-04-05')
    })
  })
})
