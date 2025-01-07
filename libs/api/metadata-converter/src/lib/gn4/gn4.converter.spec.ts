import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import {
  elasticFullResponseFixture,
  elasticHitsOnlyFixture,
} from '@geonetwork-ui/common/fixtures'
import { Gn4Converter } from './gn4.converter'
import { of } from 'rxjs'
import { TestBed } from '@angular/core/testing'
import { MetadataUrlService } from './metadata-url.service'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import {
  CatalogRecord,
  DatasetRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { TranslateService } from '@ngx-translate/core'
import { Gn4Record } from '../gn4/types/metadata.model'

setupZoneTestEnv()

class MetadataUrlServiceMock {
  translate = undefined
  getUrl = (uuid) => `http://my.catalog.org/metadata/${uuid}`
}

class OrganisationsServiceMock {
  organisationsCount$ = of(456)
  addOrganizationToRecordFromSource = jest.fn((source, record) =>
    of({
      ...record,
      ownerOrganization: {
        name: 'My Organization',
        website: new URL('http://my.org'),
      },
    } as CatalogRecord)
  )
}

const translateServiceMock = {
  currentLang: 'de',
}

describe('Gn4Converter', () => {
  let service: Gn4Converter

  beforeAll(() => {
    window.console.warn = jest.fn()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MetadataUrlService, useClass: MetadataUrlServiceMock },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    })
  })

  it('should be created', () => {
    service = TestBed.inject(Gn4Converter)
    expect(service).toBeTruthy()
  })

  describe('methods', () => {
    beforeEach(() => {
      service = TestBed.inject(Gn4Converter)
    })
    describe('#readRecords', () => {
      it('outputs records', async () => {
        const records = await service.readRecords(
          elasticHitsOnlyFixture().hits.hits
        )
        expect(records).toEqual([
          {
            kind: 'dataset',
            abstract: 'The grid is based on proposal ',
            extras: {
              id: '12456',
              catalogUuid: '6731be1e-6533-44e0-9b8a-580b45e36e80',
            },
            landingPage: new URL(
              'http://my.catalog.org/metadata/20e9e1a1-83c1-4f13-89ef-c19767d6ee18f'
            ),
            overviews: [
              {
                url: new URL(
                  'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/20e9e1a1-83c1-4f13-89ef-c19767d6ee18f.png'
                ),
              },
            ],
            title: 'EEA reference grid for Germany (10km), May 2013',
            uniqueIdentifier: '20e9e1a1-83c1-4f13-89ef-c19767d6ee18f',
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org'),
            },
            status: null,
            lineage: null,
            recordPublished: null,
            recordUpdated: null,
            onlineResources: [],
            licenses: [],
            legalConstraints: [],
            securityConstraints: [],
            otherConstraints: [],
            contacts: [],
            contactsForResource: [],
            keywords: [],
            spatialExtents: [],
            topics: [],
            temporalExtents: [
              {
                end: new Date('2013-12-31T00:00:00.000Z'),
                start: new Date('2013-01-01T00:00:00.000Z'),
              },
            ],
            defaultLanguage: 'en',
            otherLanguages: [],
          },
          {
            kind: 'dataset',
            abstract: 'Reference layer of the rivers sensitive areas, ',
            extras: {
              id: '12442',
              catalogUuid: '6731be1e-6533-44e0-9b8a-580b45e36e80',
              favoriteCount: 4,
            },
            landingPage: new URL(
              'http://my.catalog.org/metadata/5b35f06e-8c6b-4907-b8f4-39541d170360'
            ),
            overviews: [
              {
                url: new URL(
                  'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/5b35f06e-8c6b-4907-b8f4-39541d170360.png'
                ),
              },
            ],
            title:
              'Urban Waste Water Treatment Directive, Sensitive areas - rivers reported under UWWTD data call 2015, Nov. 2017',
            uniqueIdentifier: '5b35f06e-8c6b-4907-b8f4-39541d170360',
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org'),
            },
            status: null,
            lineage: null,
            recordPublished: null,
            recordUpdated: null,
            onlineResources: [],
            contacts: [],
            contactsForResource: [],
            keywords: [],
            licenses: [],
            legalConstraints: [],
            securityConstraints: [],
            otherConstraints: [],
            spatialExtents: [],
            topics: [],
            temporalExtents: [
              {
                end: new Date('2014-12-31T00:00:00.000Z'),
                start: new Date('2013-01-01T00:00:00.000Z'),
              },
            ],
            defaultLanguage: 'en',
            otherLanguages: [],
          },
        ] as CatalogRecord[])
      })
      it('works with an empty result set', async () => {
        const records = await service.readRecords([])
        expect(records).toEqual([])
      })
    })

    describe('#readRecord', () => {
      let hit
      beforeEach(() => {
        hit = elasticHitsOnlyFixture().hits.hits[0]
      })

      describe('overview', () => {
        it('when data', async () => {
          const record = await service.readRecord(hit)
          expect(record.overviews[0].url).toEqual(
            new URL(
              'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/20e9e1a1-83c1-4f13-89ef-c19767d6ee18f.png'
            )
          )
        })
        it('when no data and url', async () => {
          const record = await service.readRecord({
            ...hit,
            _source: {
              ...hit._source,
              overview: {
                url: 'imgUrl',
              },
            },
          })
          expect(record.overviews[0].url).toEqual(
            new URL('http://localhost/imgUrl')
          )
        })
        it('when no data no url', async () => {
          const record = await service.readRecord({
            ...hit,
            _source: {
              ...hit._source,
              overview: {},
            },
          })
          expect(record.overviews[0].url).toEqual(null)
        })
      })

      describe('links', () => {
        describe('valid link with a protocol and name', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    protocol: 'MY-PROTOCOL',
                    name: 'my data layer',
                    url: 'https://my.website/services/data/',
                  },
                ],
              },
            }
          })
          it('parses as a valid link, uses name as label', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.onlineResources).toEqual([
              {
                name: 'my data layer',
                type: 'link',
                url: new URL('https://my.website/services/data/'),
              },
            ])
          })
        })
        describe('valid link pointing to a file', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    description: 'Download this file!',
                    url: 'https://my.website/services/static/data.csv',
                  },
                ],
              },
            }
          })
          it('parses as a valid link, uses description as label', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.onlineResources).toEqual([
              {
                description: 'Download this file!',
                type: 'link',
                url: new URL('https://my.website/services/static/data.csv'),
              },
            ])
          })
        })
        describe('valid link with a mime type', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    description: 'Download this file!',
                    protocol: 'WWW:DOWNLOAD:application/csv',
                    url: 'https://my.website/services/static/data.csv',
                  },
                ],
              },
            }
          })
          it('parses as a valid link, uses description as label', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.onlineResources).toEqual([
              {
                description: 'Download this file!',
                mimeType: 'application/csv',
                url: new URL('https://my.website/services/static/data.csv'),
                type: 'download',
              },
            ])
          })
        })
        describe('invalid link (invalid url)', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    protocol: 'MY-PROTOCOL',
                    url: 'https://abcd:1234:5678/@',
                  },
                ],
              },
            }
          })
          it('does not parse the link', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.onlineResources).toEqual([])
            expect(window.console.warn).toHaveBeenCalledWith(
              expect.stringContaining('URL'),
              expect.any(Object)
            )
          })
        })
        describe('link is multilingual (+ name / description)', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    descriptionObject: {
                      default: 'Download this file!',
                      langfre: 'Téléchargez ce fichier!',
                    },
                    nameObject: {
                      default: 'My file',
                      langfre: 'Mon fichier',
                    },
                    protocol: 'MY-PROTOCOL',
                    urlObject: {
                      default: 'https://my.website/services/static/data.csv',
                      langfre: 'https://my.website/services/static/data.csv',
                    },
                  },
                ],
              },
            }
          })
          it('parse the link correctly', async () => {
            const summary = (await service.readRecord(hit)) as DatasetRecord
            expect(summary.onlineResources).toEqual([
              {
                name: 'My file',
                description: 'Download this file!',
                url: new URL('https://my.website/services/static/data.csv'),
                type: 'link',
              },
            ])
          })
        })
        describe('link is multilingual (no name and description)', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    protocol: 'MY-PROTOCOL',
                    urlObject: {
                      default: 'https://my.website/services/static/data.csv',
                      langfre: 'https://my.website/services/static/data.csv',
                    },
                  },
                ],
              },
            }
          })
          it('parse the link correctly', async () => {
            const summary = (await service.readRecord(hit)) as DatasetRecord
            expect(summary.onlineResources).toEqual([
              {
                url: new URL('https://my.website/services/static/data.csv'),
                type: 'link',
              },
            ])
          })
        })
      })

      describe('spatial and temporal extents', () => {
        describe('only one bounding box, no bounding geometry', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                hasBoundingPolygon: 'false',
                shape: null,
                extentDescriptionObject: [
                  {
                    default: 'Genève',
                    langger: 'Genève',
                  },
                ],
                geom: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [6.11, 46.177],
                      [6.176, 46.177],
                      [6.176, 46.232],
                      [6.11, 46.232],
                      [6.11, 46.177],
                    ],
                  ],
                },
              },
            }
          })
          it('keeps the bounding box', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.spatialExtents).toEqual([
              {
                description: 'Genève',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [6.11, 46.177],
                      [6.176, 46.177],
                      [6.176, 46.232],
                      [6.11, 46.232],
                      [6.11, 46.177],
                    ],
                  ],
                },
              },
            ])
          })
        })
        describe('only one bounding box, no description', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                shape: null,
                extentDescriptionObject: null,
                geom: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [6.755991, 45.788744],
                      [10.541824, 45.788744],
                      [10.541824, 47.517566],
                      [6.755991, 47.517566],
                      [6.755991, 45.788744],
                    ],
                  ],
                },
              },
            }
          })
          it('does not define a description', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.spatialExtents).toEqual([
              {
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [6.755991, 45.788744],
                      [10.541824, 45.788744],
                      [10.541824, 47.517566],
                      [6.755991, 47.517566],
                      [6.755991, 45.788744],
                    ],
                  ],
                },
              },
            ])
          })
        })
        describe('one bounding box, one bounding polygon', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                hasBoundingPolygon: 'true',
                shape: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [6.756, 47.5176],
                      [10.5418, 47.478],
                      [10.4463, 45.7887],
                      [6.7771, 45.8271],
                      [6.756, 47.5176],
                    ],
                  ],
                },
                extentDescriptionObject: [
                  {
                    default: 'Alpenkonvention',
                    langger: 'Alpenkonvention',
                    langfre: 'Convention des Alpes',
                    langita: 'Convenzione delle alpi',
                    langeng: 'Alpine Convention',
                  },
                ],
                geom: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [6.755991, 45.788744],
                      [10.541824, 45.788744],
                      [10.541824, 47.517566],
                      [6.755991, 47.517566],
                      [6.755991, 45.788744],
                    ],
                  ],
                },
              },
            }
          })
          it('keeps the bounding polygon', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.spatialExtents).toEqual([
              {
                description: 'Alpenkonvention',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [6.756, 47.5176],
                      [10.5418, 47.478],
                      [10.4463, 45.7887],
                      [6.7771, 45.8271],
                      [6.756, 47.5176],
                    ],
                  ],
                },
              },
            ])
          })
        })
        describe('multiple extents', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                geom: [
                  {
                    type: 'Polygon',
                    coordinates: [
                      [
                        [7.756217, 47.534554],
                        [7.839631, 47.534554],
                        [7.839631, 47.590202],
                        [7.756217, 47.590202],
                        [7.756217, 47.534554],
                      ],
                    ],
                  },
                  {
                    type: 'Polygon',
                    coordinates: [
                      [
                        [7.714457, 47.526934],
                        [7.764639, 47.526934],
                        [7.764639, 47.548398],
                        [7.714457, 47.548398],
                        [7.714457, 47.526934],
                      ],
                    ],
                  },
                  {
                    type: 'Polygon',
                    coordinates: [
                      [
                        [7.818973, 47.534407],
                        [7.899144, 47.534407],
                        [7.899144, 47.591074],
                        [7.818973, 47.591074],
                        [7.818973, 47.534407],
                      ],
                    ],
                  },
                ],
                extentDescriptionObject: [
                  {
                    default: 'Rheinfelden',
                    langger: 'Rheinfelden',
                    langfre: 'Rheinfelden',
                    langita: 'Rheinfelden',
                    langeng: 'Rheinfelden',
                  },
                  {
                    default: 'Kaiseraugst',
                    langger: 'Kaiseraugst',
                    langfre: 'Kaiseraugst',
                    langita: 'Kaiseraugst',
                    langeng: 'Kaiseraugst',
                  },
                  {
                    default: 'Möhlin',
                    langger: 'Möhlin',
                    langfre: 'Möhlin',
                    langita: 'Möhlin',
                    langeng: 'Möhlin',
                  },
                ],
                hasBoundingPolygon: 'true',
                shape: [
                  {
                    type: 'Polygon',
                    coordinates: [
                      [
                        [7.7638, 47.543],
                        [7.7637, 47.543],
                        [7.7636, 47.543],
                        [7.7635, 47.543],
                        [7.7633, 47.5429],
                        [7.763, 47.5429],
                        [7.7638, 47.543],
                      ],
                    ],
                  },
                  {
                    type: 'Polygon',
                    coordinates: [
                      [
                        [7.764, 47.5429],
                        [7.7641, 47.5423],
                        [7.7643, 47.5421],
                        [7.7645, 47.5415],
                        [7.7646, 47.5411],
                        [7.7646, 47.5405],
                        [7.7645, 47.5398],
                        [7.7634, 47.5402],
                        [7.7621, 47.5401],
                        [7.7623, 47.5396],
                        [7.764, 47.5429],
                      ],
                    ],
                  },
                  {
                    type: 'Polygon',
                    coordinates: [
                      [
                        [7.8335, 47.5357],
                        [7.8319, 47.5358],
                        [7.831, 47.536],
                        [7.8301, 47.5363],
                        [7.829, 47.5364],
                        [7.8335, 47.5357],
                      ],
                    ],
                  },
                ],
              },
            }
          })
          it('parses correctly the extents', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.spatialExtents).toEqual([
              {
                description: 'Rheinfelden',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [7.7638, 47.543],
                      [7.7637, 47.543],
                      [7.7636, 47.543],
                      [7.7635, 47.543],
                      [7.7633, 47.5429],
                      [7.763, 47.5429],
                      [7.7638, 47.543],
                    ],
                  ],
                },
              },
              {
                description: 'Kaiseraugst',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [7.764, 47.5429],
                      [7.7641, 47.5423],
                      [7.7643, 47.5421],
                      [7.7645, 47.5415],
                      [7.7646, 47.5411],
                      [7.7646, 47.5405],
                      [7.7645, 47.5398],
                      [7.7634, 47.5402],
                      [7.7621, 47.5401],
                      [7.7623, 47.5396],
                      [7.764, 47.5429],
                    ],
                  ],
                },
              },
              {
                description: 'Möhlin',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [7.8335, 47.5357],
                      [7.8319, 47.5358],
                      [7.831, 47.536],
                      [7.8301, 47.5363],
                      [7.829, 47.5364],
                      [7.8335, 47.5357],
                    ],
                  ],
                },
              },
            ])
          })
        })
        describe('temporal extents', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                resourceTemporalExtentDateRange: [
                  {
                    gte: '2000-05-31T22:00:00.000Z',
                    lte: '2014-12-31T23:00:00.000Z',
                  },
                  {
                    lte: '2000-04-31T23:00:00.000Z',
                  },
                ],
                resourceTemporalExtentDetails: [
                  {
                    start: {
                      date: '2000-06-01',
                    },
                    end: {
                      date: '2015-01-01',
                    },
                  },
                ],
              },
            }
          })
          it('parses temporal ranges accordingly', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.temporalExtents).toEqual([
              {
                start: new Date('2000-05-31T22:00:00.000Z'),
                end: new Date('2014-12-31T23:00:00.000Z'),
              },
              {
                end: new Date('2000-04-31T23:00:00.000Z'),
              },
            ])
          })
        })
      })

      describe('license and constraints', () => {
        beforeEach(() => {
          hit = {
            ...hit,
            _source: {
              ...hit._source,
              licenseObject: [
                {
                  default:
                    'Géodonnées de base accessibles au public: niveau A (selon l’OGéo, art. 21).',
                  langger:
                    'Öffentlich zugängliche Geobasisdaten: Zugangsberechtigungsstufe A (nach GeoIV, Art. 21).',
                  langeng:
                    'Publicly accessible basic geodata : level A (GeoIV, Art. 21).',
                  link: 'https://registry.geocat.ch/use-limitation/levelA',
                  langfre:
                    'Géodonnées de base accessibles au public: niveau A (selon l’OGéo, art. 21).',
                },
                {
                  default:
                    "Les conditions générales d'utilisation des géodonnées du Canton du Valais font foi (https://www.vs.ch/fr/web/guest/information-legale).",
                  langger:
                    'Es gelten die Nutzungsbedingungen für Geodaten des Kantons Wallis (https://www.vs.ch/de/web/guest/rechtliches).',
                  langfre:
                    "Les conditions générales d'utilisation des géodonnées du Canton du Valais font foi (https://www.vs.ch/fr/web/guest/information-legale).",
                },
              ],
              MD_ConstraintsUseLimitationObject: [
                {
                  default: 'aucune',
                  langger: 'keine',
                  langfre: 'aucune',
                },
              ],
              cl_accessConstraints: [
                {
                  default: 'Autres restrictions',
                  langger: 'Benutzerdeifinierte Einschränkungen',
                  langeng: 'Other restrictions',
                  langroh: 'otherRestrictions',
                  link: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/codelist/ML_gmxCodelists.xml#MD_RestrictionCode',
                  langita: 'Altri vincoli',
                  key: 'otherRestrictions',
                  langfre: 'Autres restrictions',
                },
              ],
              MD_LegalConstraintsOtherConstraintsObject: [
                {
                  default:
                    'Géodonnées de base accessibles au public: niveau A (selon l’OGéo, art. 21).',
                  langger:
                    'Öffentlich zugängliche Geobasisdaten: Zugangsberechtigungsstufe A (nach GeoIV, Art. 21).',
                  langeng:
                    'Publicly accessible basic geodata : level A (GeoIV, Art. 21).',
                  link: 'https://registry.geocat.ch/use-limitation/levelA',
                  langfre:
                    'Géodonnées de base accessibles au public: niveau A (selon l’OGéo, art. 21).',
                },
                {
                  default:
                    "Les conditions générales d'utilisation des géodonnées du Canton du Valais font foi (https://www.vs.ch/fr/web/guest/information-legale).",
                  langger:
                    'Es gelten die Nutzungsbedingungen für Geodaten des Kantons Wallis (https://www.vs.ch/de/web/guest/rechtliches).',
                  langfre:
                    "Les conditions générales d'utilisation des géodonnées du Canton du Valais font foi (https://www.vs.ch/fr/web/guest/information-legale).",
                },
              ],
            },
          }
        })

        it('parses the licenses', async () => {
          const record = (await service.readRecord(hit)) as DatasetRecord
          expect(record.licenses).toEqual([
            {
              text: 'Öffentlich zugängliche Geobasisdaten: Zugangsberechtigungsstufe A (nach GeoIV, Art. 21).',
              url: new URL('https://registry.geocat.ch/use-limitation/levelA'),
            },
            {
              text: 'Es gelten die Nutzungsbedingungen für Geodaten des Kantons Wallis (https://www.vs.ch/de/web/guest/rechtliches).',
            },
          ])
        })

        it('parses the legal constraints', async () => {
          const record = (await service.readRecord(hit)) as DatasetRecord
          expect(record.legalConstraints).toEqual([
            {
              text: 'Öffentlich zugängliche Geobasisdaten: Zugangsberechtigungsstufe A (nach GeoIV, Art. 21).',
              url: new URL('https://registry.geocat.ch/use-limitation/levelA'),
            },
            {
              text: 'Es gelten die Nutzungsbedingungen für Geodaten des Kantons Wallis (https://www.vs.ch/de/web/guest/rechtliches).',
            },
          ])
        })

        it('parses the security constraints', async () => {
          const record = (await service.readRecord(hit)) as DatasetRecord
          expect(record.securityConstraints).toEqual([])
        })

        it('parses the other constraints', async () => {
          const record = (await service.readRecord(hit)) as DatasetRecord
          expect(record.otherConstraints).toEqual([
            {
              text: 'keine',
            },
          ])
        })
      })

      describe('keywords', () => {
        beforeEach(() => {
          hit = {
            ...hit,
            _source: {
              ...hit._source,
              allKeywords: {
                'th_gemet-theme': {
                  keywords: [
                    {
                      default: 'administration',
                      langger:
                        'Verwaltung, Organisation, Institutionen, Planung, Politik und -vollzug, immaterielle Massnahmen',
                      langeng: 'administration',
                      link: 'http://www.eionet.europa.eu/gemet/theme/1',
                      langita: 'amministrazione',
                      langfre: 'administration',
                    },
                  ],
                  link: 'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet-theme',
                  theme: 'theme',
                  id: 'geonetwork.thesaurus.external.theme.gemet-theme',
                  title: 'GEMET themes',
                },
                th_gemet: {
                  keywords: [
                    {
                      default: 'abri',
                      langger: 'Unterschlupf',
                      langeng: 'shelter',
                      langita: 'riparo',
                      langfre: 'abri',
                    },
                  ],
                  link: 'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet',
                  theme: 'theme',
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  title: 'GEMET',
                },
                'th_geocat-ch': {
                  keywords: [
                    {
                      default: 'opendata.swiss',
                      langger: 'opendata.swiss',
                      langeng: 'opendata.swiss',
                      langita: 'opendata.swiss',
                      langfre: 'opendata.swiss',
                    },
                  ],
                  link: 'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch',
                  theme: 'theme',
                  id: 'geonetwork.thesaurus.local.theme.geocat.ch',
                  title: 'geocat.ch',
                },
                'th_otherKeywords-': {
                  keywords: [
                    {
                      default: 'air',
                      langfre: 'air',
                    },
                  ],
                  theme: '',
                  title: 'otherKeywords-',
                },
              },
            },
          }
        })

        it('parses the keywords', async () => {
          const record = (await service.readRecord(hit)) as DatasetRecord
          expect(record.keywords).toEqual([
            {
              label:
                'Verwaltung, Organisation, Institutionen, Planung, Politik und -vollzug, immaterielle Massnahmen',
              thesaurus: {
                id: 'geonetwork.thesaurus.external.theme.gemet-theme',
                url: new URL(
                  'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet-theme'
                ),
                name: 'GEMET themes',
              },
              type: 'theme',
              key: 'http://www.eionet.europa.eu/gemet/theme/1',
            },
            {
              label: 'Unterschlupf',
              thesaurus: {
                id: 'geonetwork.thesaurus.external.theme.gemet',
                url: new URL(
                  'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
                ),
                name: 'GEMET',
              },
              type: 'theme',
            },
            {
              label: 'opendata.swiss',
              thesaurus: {
                id: 'geonetwork.thesaurus.local.theme.geocat.ch',
                url: new URL(
                  'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
                ),
                name: 'geocat.ch',
              },
              type: 'theme',
            },
            {
              label: 'air',
              type: 'other',
            },
          ])
        })
      })

      describe('full record', () => {
        it('builds a complete record object', async () => {
          const record = await service.readRecord(
            elasticFullResponseFixture().hits.hits[0] as Gn4Record
          )
          expect(record).toEqual({
            kind: 'dataset',
            abstract:
              "Le produit Surval \"Données par paramètre\" met à disposition les données d'observation et de surveillance bancarisées dans Quadrige, validées et qui ne sont pas sous moratoire.\n\nCe système d'information contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants, 1987 pour le phytoplancton et les phycotoxines, 1989 pour la microbiologie, du début des années 2000 pour le benthos. \n\nCe produit contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants.\n\nLes données sous moratoire ou les données qualifiées \"Faux\" sont exclus de la diffusion Surval. Une donnée validée dans Quadrige aujourd’hui sera disponible dans Surval demain.\n\nL'accès aux données d'observation se fait par lieu. Un lieu de surveillance est un lieu géographique où des observations, des mesures et/ou des prélèvements sont effectués. Il est localisé de façon unique par son emprise cartographique (surface, ligne ou point). Un lieu de mesure peut être utilisé par plusieurs programmes d'observation et de surveillance.\n\nA compter du 29 avril 2021, conformément aux obligations de l’ « Open data », toutes les données validées sans moratoire sont diffusées à J+1 et sans traitement. Ainsi tous les paramètres et tous les programmes Quadrige sont diffusés, et regroupés sous forme de thème :\n- Benthos dont récifs coralliens\n- Contaminants chimiques et Écotoxicologie\n- Déchets\n- Microbiologie\n- Phytoplancton et Hydrologie\n- Ressources aquacoles\n- Zooplancton\n- Autres\nUn thème regroupe un ou plusieurs programmes d'acquisition. Un programme correspond à une mise en œuvre d'un protocole, sur une période et un ensemble de lieux. Chaque programme est placé sous la responsabilité d'un animateur. \n\nPour accompagner le résultat, de nombreuses données sont diffusées (téléchargeables en tant que données d’observation), comme :\n- la description complète du « Paramètre-Support-Fraction-Méthode-Unité »;\n- la description complète des « Passages », « Prélèvements » et « Échantillons »;\n- le niveau de qualification du résultat;\n- une proposition de citation, afin d’identifier tous les organismes contribuant à cette observation.\n\nL'emprise géographique est nationale : la métropole et les départements et régions d'outre-mer (DROM).\n\nL'accès au téléchargement direct du jeu de données complet (~ 220 Mo) en date du 9 juillet 2021 s'effectue par ce lien : https://www.ifremer.fr/sextant_doc/surveillance_littorale/surval/data/surval.zip \nL'accès par la carte permet de configurer des extractions et des graphes de visualisation sur demande (email demandé pour le téléchargement).",
            licenses: [
              {
                text: 'Pas de restriction d’accès public',
                url: new URL(
                  'http://inspire.ec.europa.eu/metadatacodelist/LimitationsOnPublicAccess/noLimitations'
                ),
              },
              {
                text: 'Licence Ouverte version 2.0  https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf',
              },
            ],
            legalConstraints: [
              {
                text: "Restriction légale d'utilisation à préciser",
              },
              {
                text: 'Pas de restriction d’accès public',
                url: new URL(
                  'http://inspire.ec.europa.eu/metadatacodelist/LimitationsOnPublicAccess/noLimitations'
                ),
              },
              {
                text: 'Licence Ouverte version 2.0  https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf',
              },
            ],
            securityConstraints: [],
            otherConstraints: [
              {
                text: 'Einschränkung im Zusammenhang mit der Ausübung moralischer Rechte',
              },
            ],
            contacts: [
              {
                email: 'q2suppor@ifremer.fr',
                lastName: "Cellule d'administration Quadrige",
                organization: {
                  name: 'Ifremer',
                  website: new URL('https://www.ifremer.fr/'),
                },
                role: 'point_of_contact',
              },
            ],
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org'),
            },
            contactsForResource: [
              {
                email: 'q2_support@ifremer.fr',
                lastName: "Cellule d'Administration Quadrige",
                organization: {
                  name: 'Ifremer',
                },
                role: 'point_of_contact',
              },
              {
                email: 'q2_support@ifremer.fr',
                lastName: 'Quadrige',
                organization: {
                  name: 'Ifremer',
                },
                role: 'author',
              },
              {
                email: 'q2_support@ifremer.fr',
                lastName: 'Quadrige',
                organization: {
                  name: 'Ifremer',
                },
                role: 'publisher',
              },
            ],
            onlineResources: [
              {
                url: new URL(
                  'https://wwz.ifremer.fr/envlit/Quadrige-la-base-de-donnees'
                ),
                name: 'La base de données Quadrige',
                type: 'link',
              },
              {
                url: new URL(
                  'https://wwz.ifremer.fr/envlit/Surveillance-du-littoral'
                ),
                name: 'La surveillance du milieu marin et côtier',
                type: 'link',
              },
              {
                description:
                  'Manuel pour l’utilisation des données REPHY. Informations destinées à améliorer la compréhension des fichiers de données REPHY mis à disposition des scientifiques et du public. ODE/VIGIES/17-15. Ifremer, ODE/VIGIES, Coordination REPHY & Cellule Quadrige (2017).',
                url: new URL('http://archimer.ifremer.fr/doc/00409/52016/'),
                name: 'Manuel pour l’utilisation des données REPHY',
                type: 'link',
              },
              {
                accessServiceProtocol: 'wms',
                url: new URL(
                  'http://www.ifremer.fr/services/wms/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (point)',
                name: 'surval_parametre_point',
                type: 'service',
              },
              {
                accessServiceProtocol: 'wfs',
                url: new URL(
                  'http://www.ifremer.fr/services/wfs/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (point)',
                name: 'surval_parametre_point',
                type: 'service',
              },
              {
                description: "Extraction des données d'observation",
                url: new URL('https://www.ifremer.fr/services/wps3/surval'),
                name: 'r:survalextraction30140',
                type: 'link',
              },
              {
                accessServiceProtocol: 'wms',
                url: new URL(
                  'http://www.ifremer.fr/services/wms/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (ligne)',
                name: 'surval_parametre_ligne',
                type: 'service',
              },
              {
                accessServiceProtocol: 'wfs',
                url: new URL(
                  'http://www.ifremer.fr/services/wfs/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (ligne)',
                name: 'surval_parametre_ligne',
                type: 'service',
              },
              {
                description: "Extraction des données d'observation",
                url: new URL('https://www.ifremer.fr/services/wps3/surval'),
                name: 'r:survalextraction30140',
                type: 'link',
              },
              {
                accessServiceProtocol: 'wms',
                url: new URL(
                  'http://www.ifremer.fr/services/wms/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (polygone)',
                name: 'surval_parametre_polygone',
                type: 'service',
              },
              {
                accessServiceProtocol: 'wfs',
                url: new URL(
                  'http://www.ifremer.fr/services/wfs/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (polygone)',
                name: 'surval_parametre_polygone',
                type: 'service',
              },
              {
                description: "Extraction des données d'observation",
                url: new URL('https://www.ifremer.fr/services/wps3/surval'),
                name: 'r:survalextraction30140',
                type: 'link',
              },
              {
                description: 'DOI du jeu de données',
                url: new URL(
                  'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea'
                ),
                name: 'DOI du jeu de données',
                type: 'link',
              },
            ],
            extras: {
              catalogUuid: '81e8a591-7815-4d2f-a7da-5673192e74c9',
              favoriteCount: 12,
              id: '11700',
              isOpenData: true,
              isPublishedToAll: true,
              ownerInfo: 'testadmin|ADMIN|Test|Administrator',
            },
            keywords: [
              {
                label: 'D8: Contaminants',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D1: Biodiversité',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D7: Changements hydrographiques',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D4: Réseaux trophiques',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D5: Eutrophisation',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D9: Questions sanitaires',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D10: Déchets marins',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D1: Biodiversité - Habitats benthiques',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D1: Biodiversité - Habitats pélagiques',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D1: Biodiversité - Poissons',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D1: Biodiversité - Mammifères',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D1: Biodiversité - Tortues',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'D1: Biodiversité - Céphalopodes',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
                  name: 'DCSMM : Descripteurs',
                },
                type: 'theme',
              },
              {
                label: 'Observation par point',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-methode',
                  name: 'DCSMM : Méthodes de recueil des données',
                },
                type: 'theme',
              },
              {
                label: 'Observation directe',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.dcsmm-methode',
                  name: 'DCSMM : Méthodes de recueil des données',
                },
                type: 'theme',
              },
              {
                label: 'Installations de suivi environnemental',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
                  name: 'GEMET - INSPIRE themes, version 1.0',
                },
                type: 'theme',
              },
              {
                label: 'Brest',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.place.oh_ville',
                  name: 'Ocean Hackathon - Ville',
                },
                type: 'place',
              },
              {
                label: 'Fort-de-France',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.place.oh_ville',
                  name: 'Ocean Hackathon - Ville',
                },
                type: 'place',
              },
              {
                label: 'Boulogne-sur-Mer',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.place.oh_ville',
                  name: 'Ocean Hackathon - Ville',
                },
                type: 'place',
              },
              {
                label: 'Nouméa',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.place.oh_ville',
                  name: 'Ocean Hackathon - Ville',
                },
                type: 'place',
              },
              {
                label: 'Toulon',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.place.oh_ville',
                  name: 'Ocean Hackathon - Ville',
                },
                type: 'place',
              },
              {
                label: 'Sète',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.place.oh_ville',
                  name: 'Ocean Hackathon - Ville',
                },
                type: 'place',
              },
              {
                label: 'La Rochelle',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.place.oh_ville',
                  name: 'Ocean Hackathon - Ville',
                },
                type: 'place',
              },
              {
                label: 'National',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.place.dcsmm.area',
                  name: 'Sous-regions marines',
                },
                type: 'place',
              },
              {
                label: 'Base de données de recherche',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_thematiques',
                  name: 'Thèmatiques ODATIS',
                },
                type: 'theme',
              },
              {
                label: 'Dispositifs de surveillance',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_thematiques',
                  name: 'Thèmatiques ODATIS',
                },
                type: 'theme',
              },
              {
                label:
                  "/Activités humaines/Réseaux d'observation et de surveillance du littoral",
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.sextant-theme',
                  name: 'Thèmes Sextant',
                },
                type: 'theme',
              },
              {
                label: '/Etat du Milieu/Biogéochimie',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.simm.thematiques',
                  name: 'Thématiques - SIMM',
                },
                type: 'theme',
              },
              {
                label: '/Etat du Milieu/Pollutions',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.simm.thematiques',
                  name: 'Thématiques - SIMM',
                },
                type: 'theme',
              },
              {
                label: '/Etat du Milieu/Littoral',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.simm.thematiques',
                  name: 'Thématiques - SIMM',
                },
                type: 'theme',
              },
              {
                label: '/Etat du Milieu/Habitats',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.simm.thematiques',
                  name: 'Thématiques - SIMM',
                },
                type: 'theme',
              },
              {
                label: '/Etat du Milieu/Espèces',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.simm.thematiques',
                  name: 'Thématiques - SIMM',
                },
                type: 'theme',
              },
              {
                label: '/Observations in-situ/Réseaux',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.type_jeux_donnee',
                  name: 'Type de jeux de donnée ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biologie marine/Bivalves',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label:
                  '/Biogéochimie marine/Eléments chimiques et contaminants',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: "/Physique de l'Océan/Turbidité",
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biogéochimie marine/Pigments',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biologie marine/Toxines',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biologie marine/Phytoplancton',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biologie marine/Zooplancton',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: "/Physique de l'Océan/Température",
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: "/Physique de l'Océan/Salinité",
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biogéochimie marine/Oxygène dissous',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biologie marine/Organismes pathogènes',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biologie marine/Organismes marins tropicaux',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biologie marine/Matière en suspension',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biogéochimie marine/Nutriments (sels nutritifs)',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: '/Biologie marine/Habitats benthiques',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.odatis_variables',
                  name: 'Variables ODATIS',
                },
                type: 'theme',
              },
              {
                label: 'Lieux de surveillance',
                type: 'other',
              },
              {
                label: 'Observation',
                type: 'other',
              },
              {
                label: 'Surveillance',
                type: 'other',
              },
              {
                label: 'Environnement',
                type: 'other',
              },
              {
                label: 'Littoral',
                type: 'other',
              },
              {
                label: 'Quadrige',
                type: 'other',
              },
              {
                label: 'DCE',
                type: 'other',
              },
              {
                label: 'DCSMM',
                type: 'other',
              },
              {
                label: 'OSPAR',
                type: 'other',
              },
              {
                label: 'MEDPOL',
                type: 'other',
              },
              {
                label: 'Données ouvertes',
                type: 'other',
              },
              {
                label: 'Open Data',
                type: 'other',
              },
              {
                label: 'Surval',
                type: 'other',
              },
            ],
            landingPage: new URL(
              'http://my.catalog.org/metadata/cf5048f6-5bbf-4e44-ba74-e6f429af51ea'
            ),
            lineage:
              'Les données sont bancarisées dans la base de données Quadrige.',
            overviews: [
              {
                description: 'parametres.gif',
                url: new URL(
                  'https://sextant.ifremer.fr/geonetwork/srv/api/records/cf5048f6-5bbf-4e44-ba74-e6f429af51ea/attachments/parametres.gif'
                ),
              },
            ],
            recordCreated: new Date('2021-10-05T12:48:57.678Z'),
            recordUpdated: new Date('2021-10-05T12:48:57.678Z'),
            recordPublished: new Date('2021-04-01T00:00:00.000Z'),
            resourceCreated: new Date('2012-01-01T00:00:00.000Z'),
            resourceUpdated: new Date('2021-12-13T00:00:00.000Z'),
            status: 'ongoing',
            topics: ['Installations de suivi environnemental', 'Océans'],
            title: 'Surval - Données par paramètre',
            uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
            updateFrequency: {
              per: 'day',
              updatedTimes: 1,
            },
            spatialExtents: [
              {
                description: 'Hauts-de-France (Région)',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [-180.0, -70.0],
                      [180.0, -70.0],
                      [180.0, 70.0],
                      [-180.0, 70.0],
                      [-180.0, -70.0],
                    ],
                  ],
                },
              },
            ],
            temporalExtents: [{ start: new Date('1974-01-01T00:00:00.000Z') }],
            defaultLanguage: 'fr',
            otherLanguages: [],
          } as CatalogRecord)
        })
      })

      describe('full record, multilingual', () => {
        it('builds a complete record object', async () => {
          const record = await service.readRecord(
            elasticFullResponseFixture().hits.hits[1] as Gn4Record
          )
          expect(record).toEqual({
            abstract:
              'Perimeter der Alpenkonvention in der Schweiz. Die Alpenkonvention ist ein völkerrechtlicher Vertrag zwischen den acht Alpenländern Deutschland, Frankreich, Italien, Liechtenstein, Monaco, Österreich, Schweiz, Slowenien sowie der Europäischen Union. Das Ziel des Übereinkommens ist der Schutz der Alpen durch eine sektorübergreifende, ganzheitliche und nachhaltige Politik.',
            contacts: [
              {
                address: 'Ittigen, 3063, CH',
                email: 'rolf.giezendanner@are.admin.ch',
                lastName: 'Rolf Giezendanner',
                organization: {
                  name: 'Bundesamt für Raumentwicklung',
                },
                role: 'point_of_contact',
              },
            ],
            contactsForResource: [
              {
                address: 'Ittigen, 3063, CH',
                email: 'rolf.giezendanner@are.admin.ch',
                lastName: 'Rolf Giezendanner',
                organization: {
                  name: 'Bundesamt für Raumentwicklung',
                },
                role: 'point_of_contact',
              },
              {
                email: 'info@are.admin.ch',
                lastName: '',
                organization: {
                  name: 'Bundesamt für Raumentwicklung',
                },
                role: 'owner',
              },
            ],
            extras: {
              catalogUuid: '7ea582d4-9ddf-422e-b28f-29760a4c0147',
              favoriteCount: 0,
              id: '39253641',
              isOpenData: true,
              isPublishedToAll: true,
              ownerInfo: 'AREadmin|admin|ARE|UserAdmin',
            },
            keywords: [
              {
                key: 'http://inspire.ec.europa.eu/theme/ef',
                label: 'Umweltüberwachung',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
                  name: 'GEMET - INSPIRE themes, version 1.0',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://inspire.ec.europa.eu/theme/au',
                label: 'Verwaltungseinheiten',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
                  name: 'GEMET - INSPIRE themes, version 1.0',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://www.eionet.europa.eu/gemet/concept/8247',
                label: 'Nachhaltige Entwicklung',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://www.eionet.europa.eu/gemet/concept/6225',
                label: 'Raumplanung',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://www.eionet.europa.eu/gemet/concept/10236',
                label: 'Bergschutz',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://www.eionet.europa.eu/gemet/concept/7852',
                label: 'Bodenschutz',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://www.eionet.europa.eu/gemet/theme/11',
                label: 'Umweltpolitik',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://www.eionet.europa.eu/gemet/theme/11',
                label: 'Umweltpolitik',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://www.eionet.europa.eu/gemet/theme/37',
                label: 'Verkehr',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://www.eionet.europa.eu/gemet/theme/37',
                label: 'Verkehr',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://www.eionet.europa.eu/gemet/theme/37',
                label: 'Verkehr',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://geocat.ch/concept#94202915-c2c1-44fd-a106-71488110e399',
                label: 'Aufbewahrungs- und Archivierungsplanung AAP - Bund',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.geocat.ch',
                  name: 'geocat.ch',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://geocat.ch/concept#e6485c01-fe69-485e-b194-035f682463db',
                label: 'opendata.swiss',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.geocat.ch',
                  name: 'geocat.ch',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://custom.shared.obj.ch/concept#ab642d3d-d74f-400c-bb01-81c6dde26247',
                label: 'Geobasisdaten',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.geocat.ch',
                  name: 'geocat.ch',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://custom.shared.obj.ch/concept#948082ad-0adf-4d3c-8c4f-685f9d4d9372',
                label: 'e-geo.ch',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.geocat.ch',
                  name: 'geocat.ch',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
                  ),
                },
                type: 'theme',
              },
              {
                key: 'http://custom.shared.obj.ch/concept#ae677a16-f81a-4533-9243-a87831115079',
                label: 'BGDI Bundesgeodaten-Infrastruktur',
                thesaurus: {
                  id: 'geonetwork.thesaurus.local.theme.geocat.ch',
                  name: 'geocat.ch',
                  url: new URL(
                    'https://www.geocat.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
                  ),
                },
                type: 'theme',
              },
            ],
            kind: 'dataset',
            landingPage: new URL(
              'http://my.catalog.org/metadata/8698bf0b-fceb-4f0f-989b-111e7c4af0a4'
            ),
            defaultLanguage: 'de',
            otherLanguages: ['fr', 'it'],
            legalConstraints: [
              {
                text: 'Opendata BY: Freie Nutzung. Quellenangabe ist Pflicht.',
                url: new URL(
                  'https://opendata.swiss/en/terms-of-use/#terms_by'
                ),
              },
            ],
            licenses: [
              {
                text: 'Opendata BY: Freie Nutzung. Quellenangabe ist Pflicht.',
                url: new URL(
                  'https://opendata.swiss/en/terms-of-use/#terms_by'
                ),
              },
            ],
            lineage:
              'Digitalisiert nach den administrativen Einheiten der Schweiz, die im Anhang des Übereinkommens erscheinen.',
            onlineResources: [
              {
                description: 'Vorschau map.geo.admin.ch',
                name: 'Vorschau map.geo.admin.ch',
                type: 'link',
                url: new URL(
                  'https://map.geo.admin.ch/?layers=ch.are.alpenkonvention'
                ),
              },
              {
                accessServiceProtocol: 'wms',
                description: 'WMS-BGDI Dienst, Layer "Alpenkonvention"',
                name: 'ch.are.alpenkonvention',
                type: 'service',
                url: new URL(
                  'https://wms.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities&lang=de'
                ),
              },
              {
                accessServiceProtocol: 'wmts',
                description: 'WMTS-BGDI Dienst, Layer "Alpenkonvention"',
                name: 'ch.are.alpenkonvention',
                type: 'service',
                url: new URL(
                  'https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml?lang=de'
                ),
              },
              {
                description: 'Webseite des ARE über die Alpenkonvention',
                type: 'link',
                url: new URL(
                  'https://www.are.admin.ch/are/de/home/laendliche-raeume-und-berggebiete/internationale-zusammenarbeit/alpenkonvention.html'
                ),
              },
              {
                description: 'Download von data.geo.admin.ch',
                type: 'download',
                url: new URL(
                  'https://data.geo.admin.ch/browser/index.html#/collections/ch.are.alpenkonvention'
                ),
              },
              {
                description: 'Minimales Geodatenmodell in INTERLIS 2.3',
                type: 'download',
                url: new URL(
                  'https://www.are.admin.ch/are/de/home/raumentwicklung-und-raumplanung/grundlagen-und-daten/minimale-geodatenmodelle/alpenkonvention.html'
                ),
              },
              {
                description: 'Web-GIS ARE',
                type: 'link',
                url: new URL(
                  'http://map.are.admin.ch/?Y=660000&X=190000&zoom=1&bgLayer=ch.swisstopo.pixelkarte-grau&layers=ch.are.alpenkonvention&layers_opacity=0.2&layers_visibility=true&lang=de'
                ),
              },
              {
                description: 'Offizielle Homepage der Alpenkonvention',
                type: 'link',
                url: new URL('http://www.alpconv.org/'),
              },
              {
                description: 'Die Alpenkonvention im Bundesgeoportal',
                type: 'link',
                url: new URL(
                  'http://map.geo.admin.ch/?selectedNode=LT1_1&Y=660000&X=190000&zoom=1&bgLayer=ch.swisstopo.pixelkarte-farbe&layers=ch.are.alpenkonvention&layers_opacity=0.6&layers_visibility=true&lang=de'
                ),
              },
              {
                description:
                  'Liste der administrativen Einheiten des Alpenraumes in der schweizerischen Eidgenossenschaft',
                type: 'link',
                url: new URL('http://www.admin.ch/ch/d/sr/0_700_1/app1.html'),
              },
              {
                description: 'RESTful API von geo.admin.ch',
                name: 'RESTful API von geo.admin.ch',
                type: 'link',
                url: new URL(
                  'https://api3.geo.admin.ch/rest/services/api/MapServer/ch.are.alpenkonvention'
                ),
              },
              {
                description: 'Permalink opendata.swiss',
                name: 'Permalink opendata.swiss',
                type: 'link',
                url: new URL(
                  'https://opendata.swiss/de/perma/8698bf0b-fceb-4f0f-989b-111e7c4af0a4@bundesamt-fur-raumentwicklung-are'
                ),
              },
            ],
            otherConstraints: [],
            overviews: [],
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org/'),
            },
            recordPublished: null,
            recordCreated: new Date('2021-04-12T07:50:54.000Z'),
            recordUpdated: new Date('2022-12-16T16:16:01.912Z'),
            resourceCreated: new Date('1999-01-01T00:00:00.000Z'),
            resourceUpdated: new Date('2009-01-01T00:00:00.000Z'),
            securityConstraints: [],
            spatialExtents: [
              {
                description: 'Alpenkonvention',
                geometry: {
                  coordinates: [
                    [
                      [6.756, 47.5176],
                      [10.5418, 47.478],
                      [10.4463, 45.7887],
                      [6.7771, 45.8271],
                      [6.756, 47.5176],
                    ],
                  ],
                  type: 'Polygon',
                },
              },
            ],
            status: 'completed',
            temporalExtents: [],
            title: 'Alpenkonvention',
            topics: [
              'Umweltüberwachung',
              'Verwaltungseinheiten',
              'Planungsunterlagen, Kataster',
              'E1 Raumplanung, Raumentwicklung',
            ],
            uniqueIdentifier: '8698bf0b-fceb-4f0f-989b-111e7c4af0a4',
            updateFrequency: 'asNeeded',
          } as CatalogRecord)
        })
      })
    })
  })
})
