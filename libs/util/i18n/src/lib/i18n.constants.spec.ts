import { getLangFromBrowser } from './i18n.constants'

const languageGetter = jest.spyOn(window.navigator, 'language', 'get')

describe('#getLangFromBrowser', () => {
  let lang
  describe('when lang is on 2 char', () => {
    beforeEach(() => {
      languageGetter.mockReturnValue('fr')
      lang = getLangFromBrowser()
    })
    it('returns same value', () => {
      expect(lang).toEqual('fr')
    })
  })
  describe('when lang is has sub region', () => {
    beforeEach(() => {
      languageGetter.mockReturnValue('en_US')
      lang = getLangFromBrowser()
    })
    it('returns 2 char lang code', () => {
      expect(lang).toEqual('en')
    })
  })
})
