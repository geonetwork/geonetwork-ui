import {
  matchesNoApplicableConstraint,
  matchesNoKnownConstraint,
  NOT_APPLICABLE_CONSTRAINT,
  NOT_KNOWN_CONSTRAINT,
} from './constraints.utils'

describe('constraints utils', () => {
  describe('matchesNoApplicableConstraint', () => {
    it('matches based on url', () => {
      expect(
        matchesNoApplicableConstraint({
          text: 'hello world',
          url: NOT_APPLICABLE_CONSTRAINT.url,
        })
      ).toBe(true)
    })
    it('matches based on text (1)', () => {
      expect(
        matchesNoApplicableConstraint({ text: ' No conditions apply ' })
      ).toBe(true)
    })
    it('matches based on text (2)', () => {
      expect(
        matchesNoApplicableConstraint({
          text: ' NO conditions apply to access and use ',
        })
      ).toBe(true)
    })
    it('matches based on text (FR)', () => {
      expect(
        matchesNoApplicableConstraint({
          text: "aucune condition ne s'applique ",
        })
      ).toBe(true)
    })
    it('matches based on text translation', () => {
      expect(
        matchesNoApplicableConstraint({
          text: ' bonjour monde ',
          translations: {
            text: { en: 'no conditions apply', de: 'hallo welt' },
          },
        })
      ).toBe(true)
    })
    it('returns false otherwise', () => {
      expect(
        matchesNoApplicableConstraint({
          text: ' bonjour monde ',
          translations: {
            text: { en: 'hello world', de: 'hallo welt' },
          },
          url: new URL('https://some.licence.org/abc.pdf'),
        })
      ).toBe(false)
    })
  })

  describe('matchesNoKnownConstraint', () => {
    it('matches based on url', () => {
      expect(
        matchesNoKnownConstraint({
          text: 'hello world',
          url: NOT_KNOWN_CONSTRAINT.url,
        })
      ).toBe(true)
    })
    it('matches based on text', () => {
      expect(matchesNoKnownConstraint({ text: ' Conditions unknown ' })).toBe(
        true
      )
    })
    it('matches based on text (FR)', () => {
      expect(
        matchesNoKnownConstraint({
          text: 'CONDITIONS inconnues ',
        })
      ).toBe(true)
    })
    it('matches based on text translation', () => {
      expect(
        matchesNoKnownConstraint({
          text: ' bonjour monde ',
          translations: {
            text: { en: 'Conditions unknown', de: 'hallo welt' },
          },
        })
      ).toBe(true)
    })
    it('returns false otherwise', () => {
      expect(
        matchesNoKnownConstraint({
          text: ' bonjour monde ',
          translations: {
            text: { en: 'hello world', de: 'hallo welt' },
          },
          url: new URL('https://some.licence.org/abc.pdf'),
        })
      ).toBe(false)
    })
  })
})
