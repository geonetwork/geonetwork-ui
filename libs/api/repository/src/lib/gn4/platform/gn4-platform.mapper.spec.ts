import { Gn4PlatformMapper } from './gn4-platform.mapper'
import {
  KeywordApiResponse,
  ThesaurusApiResponse,
} from '@geonetwork-ui/api/metadata-converter'

import { AvatarServiceInterface } from '../auth'

const keywords: KeywordApiResponse[] = [
  {
    values: {
      eng: 'Addresses',
    },
    definitions: {
      eng: 'Location of properties based on address identifiers, usually by road name, house number, postal code.',
    },
    thesaurusKey: 'external.theme.httpinspireeceuropaeutheme-theme',
    definition:
      'Location of properties based on address identifiers, usually by road name, house number, postal code.',
    value: 'Addresses',
    uri: 'http://inspire.ec.europa.eu/theme/ad',
  },
  {
    values: {
      fre: 'France',
    },
    definitions: {
      fre: '',
    },
    coordEast: '55.855',
    coordWest: '-61.798',
    coordSouth: '-21.371',
    coordNorth: '51.088',
    thesaurusKey: 'external.place.regions',
    definition: '',
    value: 'France',
    uri: 'http://www.naturalearthdata.com/ne_admin#Country/FRA',
  },
]
const thesaurus: ThesaurusApiResponse[] = [
  {
    key: 'external.theme.httpinspireeceuropaeutheme-theme',
    dname: 'theme',
    description: [],
    filename: 'httpinspireeceuropaeutheme-theme.rdf',
    title: 'GEMET - INSPIRE themes, version 1.0',
    multilingualTitles: [],
    dublinCoreMultilinguals: [],
    date: '2008-06-01',
    url: 'http://localhost:8080/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme',
    defaultNamespace: 'http://inspire.ec.europa.eu/theme',
    type: 'external',
    activated: 'y',
  },
  {
    key: 'external.place.regions',
    dname: 'place',
    description: 'Generated from NaturalEarth datasets and SeaVox.',
    filename: 'regions.rdf',
    title: 'Continents, countries, sea regions of the world.',
    multilingualTitles: [],
    dublinCoreMultilinguals: [],
    date: '2015-07-17',
    url: 'http://localhost:8080/geonetwork/srv/api/registries/vocabularies/external.place.regions',
    defaultNamespace:
      'http://geonetwork-opensource.org/thesaurus/naturalearth-and-seavox',
    type: 'external',
    activated: 'y',
  },
]
describe('Gn4PlatformMapper', () => {
  let mapper: Gn4PlatformMapper
  let avatarService: AvatarServiceInterface

  beforeEach(() => {
    avatarService = {
      getPlaceholder: jest.fn(),
      getProfileIcon: jest.fn(),
      getProfileIconUrl: jest.fn(),
    }
    mapper = new Gn4PlatformMapper(avatarService)
  })

  describe('keywordsFromApi', () => {
    it('should return an array of Keyword objects', () => {
      const lang3 = 'eng'
      const result = mapper.keywordsFromApi(keywords, thesaurus, lang3)
      const resultThesaurus = {
        id: 'external.theme.httpinspireeceuropaeutheme-theme',
        name: 'GEMET - INSPIRE themes, version 1.0',
        url: new URL(
          'http://localhost:8080/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme'
        ),
        type: 'theme',
      }
      expect(result).toEqual([
        {
          description:
            'Location of properties based on address identifiers, usually by road name, house number, postal code.',
          key: 'http://inspire.ec.europa.eu/theme/ad',
          label: 'Addresses',
          thesaurus: {
            id: 'external.theme.httpinspireeceuropaeutheme-theme',
            name: 'GEMET - INSPIRE themes, version 1.0',
            type: 'theme',
            url: new URL(
              'http://localhost:8080/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme'
            ),
          },
          type: 'theme',
        },
        {
          bbox: [-61.798, -21.371, 55.855, 51.088],
          description: '',
          key: 'http://www.naturalearthdata.com/ne_admin#Country/FRA',
          label: 'France',
          thesaurus: {
            id: 'external.place.regions',
            name: 'Continents, countries, sea regions of the world.',
            type: 'place',
            url: new URL(
              'http://localhost:8080/geonetwork/srv/api/registries/vocabularies/external.place.regions'
            ),
          },
          type: 'place',
        },
      ])
    })
  })
})
