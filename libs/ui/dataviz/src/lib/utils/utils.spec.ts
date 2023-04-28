import { truncateString } from './utils'

describe('truncateString', () => {
  describe('length is less than or equal to truncateLength', () => {
    const input = 'a short label'
    const truncateLength = 13
    const result = truncateString(input, truncateLength)
    it('returns the original string', () => {
      expect(result).toEqual(input)
    })
  })
  describe('length is greater than truncateLength', () => {
    const input = 'a little longer label'
    const truncateLength = 13
    const result = truncateString(input, truncateLength)
    it('truncates the string', () => {
      expect(result).toEqual('a little long...')
    })
  })
  describe('input string is empty', () => {
    const input = ''
    const truncateLength = 5
    const result = truncateString(input, truncateLength)
    it('returns an empty string', () => {
      expect(result).toEqual('')
    })
  })
})
