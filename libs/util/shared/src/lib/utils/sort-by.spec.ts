import { sortByFromString, sortByToString, sortByToStrings } from './sort-by'

describe('sortBy utils', () => {
  describe('sortByToStrings', () => {
    it('single sort by', () => {
      expect(sortByToStrings(['desc', 'bla'])).toEqual(['-bla'])
    })
    it('multiple sort by', () => {
      expect(
        sortByToStrings([
          ['asc', 'hello'],
          ['desc', 'bla'],
        ])
      ).toEqual(['hello', '-bla'])
    })
  })
  describe('sortByToString', () => {
    it('single sort by', () => {
      expect(sortByToString(['desc', 'bla'])).toEqual('-bla')
    })
    it('multiple sort by', () => {
      expect(
        sortByToString([
          ['asc', 'hello'],
          ['desc', 'bla'],
        ])
      ).toEqual('hello')
    })
  })
  describe('sortByFromString', () => {
    it('single sort by', () => {
      expect(sortByFromString('-hello')).toEqual(['desc', 'hello'])
      expect(sortByFromString('bla')).toEqual(['asc', 'bla'])
    })
  })
})
