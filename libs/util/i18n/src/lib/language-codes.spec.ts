import {
  getLang2FromLang3,
  getLang3FromLang2,
  getLocalizedIndexKey,
} from './language-codes'

describe('Language codes utils', () => {
  describe('getLang3FromLang2', () => {
    it('return lang in iso3', () => {
      expect(getLang3FromLang2('fr')).toBe('fre')
    })
  })
  describe('getLang2FromLang3', () => {
    it('return lang in iso2', () => {
      expect(getLang2FromLang3('fre')).toBe('fr')
    })
  })
  describe('getLang2FromLang3', () => {
    it('return index property selector for lang2', () => {
      expect(getLocalizedIndexKey('fr')).toBe('langfre')
    })
  })
})
