import { isEqual } from './convert-utils'

describe('convert utils', () => {
  describe('isEqual', () => {
    describe('array', () => {
      it('returns true when equal', () => {
        const a = ['hello', 1234, { ab: 'cd' }]
        const b = ['hello', 1234, { ab: 'cd' }]
        expect(isEqual(a, b)).toBe(true)
      })
      it('returns false when additional elements', () => {
        const a = ['hello', 1234, { ab: 'cd' }]
        const b = ['hello', 1234, { ab: 'cd' }, true]
        expect(isEqual(a, b)).toBe(false)
      })
      it('returns false when missing elements', () => {
        const a = ['hello', 1234, { ab: 'cd' }]
        const b = ['hello', 1234]
        expect(isEqual(a, b)).toBe(false)
      })
    })
    describe('object', () => {
      it('returns true when equal', () => {
        const a = { ab: 'cd', ef: 12, gh: ['aa', false] }
        const b = { ab: 'cd', ef: 12, gh: ['aa', false] }
        expect(isEqual(a, b)).toBe(true)
      })
      it('returns false when additional properties', () => {
        const a = { ab: 'cd', gh: ['aa', false] }
        const b = { ab: 'cd', ef: 12, gh: ['aa', false] }
        expect(isEqual(a, b)).toBe(false)
      })
      it('returns false when missing properties', () => {
        const a = { ab: 'cd', ef: 12, gh: ['aa', false] } as unknown
        const b = { ab: 'cd', gh: ['aa', false], ij: 'kl' } as unknown
        expect(isEqual(a, b)).toBe(false)
      })
    })
    describe('date', () => {
      it('returns true when equal', () => {
        const a = new Date('2012-01-01T12:34:56.123Z')
        const b = new Date('2012-01-01T12:34:56.123Z')
        expect(isEqual(a, b)).toBe(true)
      })
      it('returns false when not equal', () => {
        const a = new Date('2012-01-01T12:34:56.123Z')
        const b = new Date('2012-01-01T12:34:56.124Z')
        expect(isEqual(a, b)).toBe(false)
      })
    })
    describe('url', () => {
      it('returns true when equal', () => {
        const a = new URL('http://my.domain/hello/1.png')
        const b = new URL('http://my.domain/hello/1.png')
        expect(isEqual(a, b)).toBe(true)
      })
      it('returns false when not equal', () => {
        const a = new URL('http://my.domain/hello/1.png')
        const b = new URL('https://my.domain/hello/1.png')
        expect(isEqual(a, b)).toBe(false)
      })
    })
  })
})
