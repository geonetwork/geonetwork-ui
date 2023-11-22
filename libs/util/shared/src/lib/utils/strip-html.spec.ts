import { stripHtml } from './strip-html'

describe('strip HTML', () => {
  describe('when HTML tags', () => {
    it('removes html tags', () => {
      const html = '<b>hello</b>'
      expect(stripHtml(html)).toBe('hello')
    })
  })
  describe('when HTML not defined', () => {
    it('returns undefined', () => {
      const html = null
      expect(stripHtml(html)).toBe(undefined)
    })
  })
  describe('when no HTML tags', () => {
    it('return same string', () => {
      const html = 'hello'
      expect(stripHtml(html)).toBe('hello')
    })
  })

  describe('when javascript', () => {
    const originalLog = console.log
    let consoleOutput = []
    const mockConsole = jest.fn((output) => consoleOutput.push(output))

    beforeEach(() => {
      consoleOutput = []
      console.log = mockConsole
    })
    afterEach(() => {
      console.log = originalLog
    })
    it('does not execute <script> content', () => {
      const html = `<html><script>console.log('hello')</script></html>`
      stripHtml(html)
      expect(mockConsole).not.toHaveBeenCalled()
    })
    it('does not execute javscript from events', () => {
      const html = `<img onerror="console.log('hello')"/>`
      stripHtml(html)
      expect(mockConsole).not.toHaveBeenCalled()
    })
  })
})
