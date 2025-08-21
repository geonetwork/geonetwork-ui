import { toLang2, toLang3 } from './language-codes'

describe('Language codes utils', () => {
  describe('toLang3', () => {
    it('return lang in iso3', () => {
      expect(toLang3('fr')).toBe('fre')
      expect(toLang3('fr_FR')).toBe('fre')
      expect(toLang3('ab_CD')).toBe('ab_CD')
      expect(toLang3('fre')).toBe('fre')
      expect(toLang3('de')).toBe('ger')
      expect(toLang3('DE')).toBe('ger')
      expect(toLang3('deu')).toBe('ger')
      expect(toLang3('en')).toBe('eng')
      expect(toLang3('ENG')).toBe('eng')
      expect(toLang3('unknown')).toBe('unknown')
      expect(toLang3('unk')).toBe('unk')
      expect(toLang3('un')).toBe('un')
      expect(toLang3(null)).toBe(null)
    })
  })
  describe('toLang2', () => {
    it('return lang in iso2', () => {
      expect(toLang2('fr')).toBe('fr')
      expect(toLang2('EN')).toBe('en')
      expect(toLang2('fr_FR')).toBe('fr')
      expect(toLang2('ab_CD')).toBe('ab')
      expect(toLang2('fre')).toBe('fr')
      expect(toLang2('ger')).toBe('de')
      expect(toLang2('GER')).toBe('de')
      expect(toLang2('deu')).toBe('de')
      expect(toLang2('eng')).toBe('en')
      expect(toLang2('unknown')).toBe('unknown')
      expect(toLang2('unk')).toBe('unk')
      expect(toLang2('un')).toBe('un')
      expect(toLang2(null)).toBe(null)
    })
  })
})
