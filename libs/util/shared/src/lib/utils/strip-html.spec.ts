import { stripHtml } from './strip-html'

describe('strip HTML', () => {
  describe('when HTML tags', () => {
    it('removes html tags', () => {
      const html = '<b>hello</b>'
      expect(stripHtml(html)).toBe('hello')
    })
  })
  describe('when no HTML tags', () => {
    it('return same string', () => {
      const html = 'hello'
      expect(stripHtml(html)).toBe('hello')
    })
  })
})
