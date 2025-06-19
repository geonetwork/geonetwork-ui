import { multilingualDatasetFixture } from '@geonetwork-ui/common/fixtures'
import { updateLanguages } from './record.util'

describe('record utils', () => {
  describe('updateRecordLanguages', () => {
    const record = multilingualDatasetFixture()

    it('switches between default and secondary language', () => {
      const updated = updateLanguages(record, 'fr', ['en', 'de'])

      expect(updated).toMatchObject({
        defaultLanguage: 'fr',
        otherLanguages: ['en', 'de'],

        title: 'Titre Français',
        abstract: 'Résumé Français',
        lineage: 'Généalogie Français',
        translations: {
          title: { en: 'English Title', de: 'Titel DE' },
          abstract: { en: 'English Abstract', de: 'Beschreibung DE' },
          lineage: { en: 'English Lineage', de: 'Lineage DE' },
        },
        keywords: [
          {
            label: 'Mot-clé FR',
            description: 'Description FR',
            type: 'theme',
            translations: {
              label: { en: 'Keyword EN', de: 'Schlusselwort DE' },
              description: { en: 'Keyword Desc EN', de: 'Schlusselwort DE' },
            },
          },
        ],
        ownerOrganization: {
          name: 'Org FR',
          translations: {
            name: { en: 'Org EN', de: 'Org DE' },
          },
        },
        spatialExtents: [
          {
            description: 'Étendue FR',
            translations: {
              description: { en: 'Extent EN', de: 'Bereich DE' },
            },
          },
        ],
      })
    })

    it('deletes a secondary language', () => {
      const updated = updateLanguages(record, 'en', ['de'])

      expect(updated).toMatchObject({
        defaultLanguage: 'en',
        otherLanguages: ['de'],
        title: 'English Title',
        abstract: 'English Abstract',
        lineage: 'English Lineage',
        translations: {
          title: { de: 'Titel DE' },
          abstract: { de: 'Beschreibung DE' },
          lineage: { de: 'Lineage DE' },
        },
        keywords: [
          {
            label: 'Keyword EN',
            description: 'Keyword Desc EN',
            type: 'theme',
            translations: {
              label: { de: 'Schlusselwort DE' },
              description: { de: 'Schlusselwort DE' },
            },
          },
        ],
        ownerOrganization: {
          name: 'Org EN',
          translations: {
            name: { de: 'Org DE' },
          },
        },
        spatialExtents: [
          {
            description: 'Extent EN',
            translations: {
              description: { de: 'Bereich DE' },
            },
          },
        ],
      })
    })

    it('deletes all secondary languages', () => {
      const updated = updateLanguages(record, 'en', [])

      expect(updated).toMatchObject({
        defaultLanguage: 'en',
        otherLanguages: [],
        title: 'English Title',
        abstract: 'English Abstract',
        lineage: 'English Lineage',
        translations: {},
        keywords: [
          {
            label: 'Keyword EN',
            description: 'Keyword Desc EN',
            type: 'theme',
            translations: {},
          },
        ],
        ownerOrganization: {
          name: 'Org EN',
          translations: {},
        },
        spatialExtents: [
          {
            description: 'Extent EN',
            translations: {},
          },
        ],
      })
    })

    it('adds a secondary language', () => {
      const updated = updateLanguages(record, 'en', ['fr', 'de', 'it'])

      expect(updated).toMatchObject({
        defaultLanguage: 'en',
        otherLanguages: ['fr', 'de', 'it'],
        title: 'English Title',
        abstract: 'English Abstract',
        lineage: 'English Lineage',
        translations: {
          title: { fr: 'Titre Français', de: 'Titel DE', it: '' },
          abstract: { fr: 'Résumé Français', de: 'Beschreibung DE', it: '' },
          lineage: { fr: 'Généalogie Français', de: 'Lineage DE', it: '' },
        },
        keywords: [
          {
            label: 'Keyword EN',
            description: 'Keyword Desc EN',
            type: 'theme',
            translations: {
              label: { fr: 'Mot-clé FR', de: 'Schlusselwort DE', it: '' },
              description: {
                fr: 'Description FR',
                de: 'Schlusselwort DE',
                it: '',
              },
            },
          },
        ],
        ownerOrganization: {
          name: 'Org EN',
          translations: {
            name: { fr: 'Org FR', de: 'Org DE', it: '' },
          },
        },
        spatialExtents: [
          {
            description: 'Extent EN',
            translations: {
              description: { fr: 'Étendue FR', de: 'Bereich DE', it: '' },
            },
          },
        ],
      })
    })
  })
})
