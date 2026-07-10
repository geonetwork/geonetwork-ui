import {
  getAsUrl,
  getKeywordHierarchyPath,
  mapKeywords,
} from './atomic-operations'

describe('atomic operations', () => {
  describe('getAsUrl', () => {
    it('parses relative URL', () => {
      expect(getAsUrl('images/abc.png')).toEqual(
        new URL('http://localhost/images/abc.png')
      )
    })
    it('parses absolute URL', () => {
      expect(getAsUrl('/org/images/abc.png')).toEqual(
        new URL('http://localhost/org/images/abc.png')
      )
    })
    it('parses fully qualified URL', () => {
      expect(getAsUrl('https://myorg.net/images/abc.png')).toEqual(
        new URL('https://myorg.net/images/abc.png')
      )
    })
    it('parses www url without protocol, adding HTTPs', () => {
      expect(getAsUrl('www.myorg.net')).toEqual(
        new URL('https://www.myorg.net/')
      )
    })
  })
  describe('mapKeywords', () => {
    it('should map keywords from thesauri', () => {
      const thesauri = {
        th_1: {
          id: '1',
          theme: 'theme',
          keywords: [
            {
              default: 'keyword1',
              link: 'https://some-uri.org/thematique/categories/culture_tourisme_sport',
            },
            {
              default: 'keyword2',
              link: 'https://some-uri.org/thematique/categories/services_social_sante',
            },
          ],
        },
        th_2: {
          id: '2',
          theme: 'place',
          keywords: [
            {
              default: 'keyword3',
              link: 'https://some-uri.org/place/france',
            },
            {
              default: 'keyword4',
              link: 'https://some-uri.org/place/europe',
            },
          ],
        },
      }
      const expected = [
        {
          label: 'keyword1',
          type: 'theme',
          key: 'https://some-uri.org/thematique/categories/culture_tourisme_sport',
          thesaurus: { id: '1' },
        },
        {
          label: 'keyword2',
          type: 'theme',
          key: 'https://some-uri.org/thematique/categories/services_social_sante',
          thesaurus: { id: '1' },
        },
        {
          label: 'keyword3',
          type: 'place',
          key: 'https://some-uri.org/place/france',
          thesaurus: { id: '2' },
        },
        {
          label: 'keyword4',
          type: 'place',
          key: 'https://some-uri.org/place/europe',
          thesaurus: { id: '2' },
        },
      ]
      expect(mapKeywords(thesauri, 'default')).toEqual(expected)
    })

    it('should default type to "other" if theme is not provided and not break without link', () => {
      const thesauri = {
        th_1: {
          id: '1',
          theme: '',
          keywords: [{ default: 'keyword1' }, { default: 'keyword2' }],
        },
      }
      const expected = [
        { label: 'keyword1', type: 'other', thesaurus: { id: '1' } },
        { label: 'keyword2', type: 'other', thesaurus: { id: '1' } },
      ]
      expect(mapKeywords(thesauri, 'default')).toEqual(expected)
    })

    it('attaches the hierarchy path when a matching tree is present in the source', () => {
      const rawThesauri = {
        th_1: {
          id: '1',
          theme: 'theme',
          keywords: [{ default: 'Bodenschutz' }],
        },
      }
      const source = {
        th_1_tree: {
          default: [
            'Boden^Bodenschutz',
            'Umweltpolitik^Umweltschutz^Bodenschutz',
          ],
        },
      }
      const expected = [
        {
          label: 'Bodenschutz',
          type: 'theme',
          thesaurus: { id: '1' },
          hierarchyPath: ['Boden', 'Bodenschutz'],
        },
      ]
      expect(mapKeywords(rawThesauri, 'default', source)).toEqual(expected)
    })

    it('takes the localized thesaurus name from multilingualTitle when present', () => {
      const rawThesauri = {
        'th_inspire-theme': {
          id: 'geonetwork.thesaurus.external.theme.inspire-theme',
          theme: 'theme',
          multilingualTitle: {
            default: 'GEMET - INSPIRE themes, version 1.0',
            langfre: 'GEMET - thèmes INSPIRE, version 1.0',
          },
          keywords: [{ default: 'Lieux de production et sites industriels' }],
        },
      }
      expect(mapKeywords(rawThesauri, 'langfre')).toEqual([
        {
          label: 'Lieux de production et sites industriels',
          type: 'theme',
          thesaurus: {
            id: 'geonetwork.thesaurus.external.theme.inspire-theme',
            name: 'GEMET - thèmes INSPIRE, version 1.0',
          },
        },
      ])
    })

    it('attaches the thesaurus name for a titled group that has no id', () => {
      const rawThesauri = {
        th_covadis: {
          theme: 'theme',
          multilingualTitle: {
            default: 'Arborescence thématique de la COVADIS',
          },
          keywords: [{ default: 'Site industriel Production/Site éolien' }],
        },
      }
      expect(mapKeywords(rawThesauri, 'default')).toEqual([
        {
          label: 'Site industriel Production/Site éolien',
          type: 'theme',
          thesaurus: { name: 'Arborescence thématique de la COVADIS' },
        },
      ])
    })

    it('derives the keyword type from the group key for free-keyword groups', () => {
      const rawThesauri = {
        'otherKeywords-theme': {
          keywords: [{ default: 'éolienne' }],
        },
        'th_otherKeywords-place': {
          keywords: [{ default: 'Paris' }],
        },
        'th_otherKeywords-': {
          keywords: [{ default: 'air' }],
        },
      }
      expect(mapKeywords(rawThesauri, 'default')).toEqual([
        { label: 'éolienne', type: 'theme' },
        { label: 'Paris', type: 'place' },
        { label: 'air', type: 'other' },
      ])
    })

    it('does not attach a hierarchy path when the source has no matching tree field', () => {
      const rawThesauri = {
        th_1: {
          id: '1',
          theme: 'theme',
          keywords: [{ default: 'Bodenschutz' }],
        },
      }
      const expected = [
        { label: 'Bodenschutz', type: 'theme', thesaurus: { id: '1' } },
      ]
      expect(mapKeywords(rawThesauri, 'default', {})).toEqual(expected)
    })
  })

  describe('getKeywordHierarchyPath', () => {
    it('returns null when the tree has no default entries', () => {
      expect(getKeywordHierarchyPath('foo', {})).toBeNull()
    })

    it('returns null when no path ends with the keyword label', () => {
      const tree = { default: ['Boden^Bodenschutz'] }
      expect(getKeywordHierarchyPath('Unrelated', tree)).toBeNull()
    })

    it('returns the split path for a single match', () => {
      const tree = { default: ['Boden^Bodenschutz'] }
      expect(getKeywordHierarchyPath('Bodenschutz', tree)).toEqual([
        'Boden',
        'Bodenschutz',
      ])
    })

    it('returns null for a root-level keyword (no ancestors to display)', () => {
      const tree = { default: ['Umweltpolitik'] }
      expect(getKeywordHierarchyPath('Umweltpolitik', tree)).toBeNull()
    })

    it('picks the shortest path on poly-hierarchy, first on tie', () => {
      const tree = {
        default: [
          'Umweltpolitik^Umweltschutz^Bodenschutz',
          'Boden^Bodenschutz',
          'Naturschutz^Bodenschutz',
        ],
      }
      expect(getKeywordHierarchyPath('Bodenschutz', tree)).toEqual([
        'Boden',
        'Bodenschutz',
      ])
    })
  })
})
