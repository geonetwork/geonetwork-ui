import { deepFreeze } from './freeze'

describe('freeze util', () => {
  describe('deepFreeze', () => {
    let obj
    beforeEach(() => {
      obj = deepFreeze({
        ab: 'cde',
        fg: {
          h: true,
          ij: 12,
        },
        k: [
          {
            l: 456,
            mn: ['opqr'],
          },
        ],
      })
    })
    it('prevents mutation of root properties', () => {
      expect(() => {
        obj.ab = 'AA'
      }).toThrow()
    })
    it('prevents mutation of nested properties', () => {
      expect(() => {
        obj.fg.h = 'AA'
      }).toThrow()
    })
    it('prevents mutation of objects inside nested arrays', () => {
      expect(() => {
        obj.k[0].l = 'AA'
      }).toThrow()
    })
    describe('starting with array', () => {
      beforeEach(() => {
        obj = deepFreeze([
          {
            l: 456,
            mn: ['opqr'],
          },
        ])
      })
      it('prevents mutation of nested objects', () => {
        expect(() => {
          obj[0].l = 'AA'
        }).toThrow()
      })
    })
  })
})
