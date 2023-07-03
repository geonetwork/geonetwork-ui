import {
  parseConfigSection,
  parseTranslationsConfigSection,
  parseMultiConfigSection,
} from './parse-utils'
import fetchMock from 'fetch-mock-jest'

describe('parse utils', () => {
  let result
  let warnings
  let errors

  beforeEach(() => {
    jest.spyOn(global.console, 'warn')
    fetchMock.reset()
    warnings = []
    errors = []
  })

  describe('parseConfigSection', () => {
    describe('section is missing', () => {
      describe('the section contains mandatory keys', () => {
        beforeEach(() => {
          result = parseConfigSection(
            {
              bla: {},
            },
            'test',
            ['mandatory1', 'mandatory2'],
            ['optional1'],
            warnings,
            errors
          )
        })
        it('generates an error', () => {
          expect(errors).toEqual([expect.stringMatching('is missing')])
        })
      })
      describe('the section contains only optional keys', () => {
        beforeEach(() => {
          result = parseConfigSection(
            {
              bla: {},
            },
            'test',
            [],
            ['optional1'],
            warnings,
            errors
          )
        })
        it('generates neither warnings nor errors', () => {
          expect(errors).toEqual([])
          expect(warnings).toEqual([])
        })
      })
    })

    describe('object with unrecognized keys', () => {
      beforeEach(() => {
        result = parseConfigSection(
          {
            test: {
              mandatory1: 'abcd',
              mandatory2: ['a', 'b', 4],
              optional1: 123,
              anotherOne: true,
              anotherTwo: 'aaa',
            },
          },
          'test',
          ['mandatory1', 'mandatory2'],
          ['optional1'],
          warnings,
          errors
        )
      })
      it('returns an object with the expected keys', () => {
        expect(result).toEqual({
          mandatory1: 'abcd',
          mandatory2: ['a', 'b', 4],
          optional1: 123,
        })
      })
      it('outputs a warning for unrecognized keys', () => {
        expect(warnings).toEqual([
          expect.stringMatching(/(?=.*anotherOne)(?=.*anotherTwo)/s),
        ])
      })
      it('outputs no error', () => {
        expect(errors).toEqual([])
      })
    })

    describe('object missing mandatory keys', () => {
      beforeEach(() => {
        result = parseConfigSection(
          {
            test: {
              mandatory1: 'abcd',
            },
          },
          'test',
          ['mandatory1', 'mandatory2'],
          ['optional1'],
          warnings,
          errors
        )
      })
      it('returns null', () => {
        expect(result).toBe(null)
      })
      it('outputs an error with relevant message', () => {
        expect(errors).toEqual([expect.stringContaining('mandatory2')])
      })
    })

    describe('object with nested properties', () => {
      beforeEach(() => {
        result = parseConfigSection(
          {
            test: {
              mandatory1: {
                path: {
                  local: '/aaa/bbb',
                  global: 'https://hello',
                },
              },
            },
          },
          'test',
          ['mandatory1'],
          [],
          warnings,
          errors
        )
      })
      it('returns the nested object as is', () => {
        expect(result).toEqual({
          mandatory1: {
            path: {
              local: '/aaa/bbb',
              global: 'https://hello',
            },
          },
        })
      })
    })
  })

  describe('parseTranslationsConfigSection', () => {
    describe('object with nested properties', () => {
      beforeEach(() => {
        result = parseTranslationsConfigSection(
          {
            translations: {
              en: {
                term: {
                  one: 'aaa',
                  two: 'bbb',
                },
              },
              de: {
                term: {
                  one: 'ccc',
                  two: 'ddd',
                },
              },
            },
          },
          'translations'
        )
      })
      it('returns an object with flattened properties (except first level)', () => {
        expect(result).toEqual({
          en: {
            'term.one': 'aaa',
            'term.two': 'bbb',
          },
          de: {
            'term.one': 'ccc',
            'term.two': 'ddd',
          },
        })
      })
    })
  })

  describe('parseMultiConfigSection', () => {
    describe('objects with unrecognized keys', () => {
      beforeEach(() => {
        result = parseMultiConfigSection(
          {
            test: [
              {
                mandatory1: 'abcd',
                optional1: 123,
                anotherOne: true,
              },
              {
                mandatory1: 'efgh',
                optional1: 456,
                anotherTwo: true,
              },
            ],
          },
          'test',
          ['mandatory1'],
          ['optional1'],
          warnings,
          errors
        )
      })
      it('returns an array of objects with the expected keys', () => {
        expect(result).toEqual([
          {
            mandatory1: 'abcd',
            optional1: 123,
          },
          {
            mandatory1: 'efgh',
            optional1: 456,
          },
        ])
      })
      it('outputs warnings for unrecognized keys', () => {
        expect(warnings).toEqual([
          expect.stringContaining('anotherOne'),
          expect.stringContaining('anotherTwo'),
        ])
      })
    })
    describe('objects missing mandatory keys', () => {
      beforeEach(() => {
        result = parseMultiConfigSection(
          {
            test: [
              {
                mandatory1: 'abcd',
                optional1: 123,
              },
              {
                optional1: 123,
              },
              {
                optional1: 456,
              },
            ],
          },
          'test',
          ['mandatory1'],
          ['optional1'],
          warnings,
          errors
        )
      })
      it('returns null', () => {
        expect(result).toBe(null)
      })
      it('outputs errors for missing keys', () => {
        expect(errors).toEqual([
          expect.stringContaining('mandatory1'),
          expect.stringContaining('mandatory1'),
        ])
      })
    })
  })
})
