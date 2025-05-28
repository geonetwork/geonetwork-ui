import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import {
  elasticFullResponseFixture,
  elasticHitsOnlyFixture,
  elasticServiceMetadataHistsFixture,
  elasticReuseMetadataHitsFixture,
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
              edit: true,
              isPublishedToAll: true,
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
              edit: true,
              isPublishedToAll: true,
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

      describe('feature catalog (fcats)', () => {
        it('sets the featureCatalogIdentifier from the fcats', async () => {
          const record = await service.readRecord({
            ...hit,
            _source: {
              ...hit._source,
              related: {
                fcats: [
                  {
                    _source: {
                      uuid: 'related-metadata-with-fcats',
                    },
                  },
                ],
              },
            },
          })

          expect(record.extras['featureCatalogIdentifier']).toEqual(
            'related-metadata-with-fcats'
          )
        })

        it('supports empty fcats array', async () => {
          const record = await service.readRecord({
            ...hit,
            _source: {
              ...hit._source,
              related: {
                fcats: [],
              },
            },
          })

          expect(record.extras['featureCatalogIdentifier']).toBeUndefined()
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
                accessRestricted: null,
              },
              {
                accessServiceProtocol: 'wfs',
                url: new URL(
                  'http://www.ifremer.fr/services/wfs/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (point)',
                name: 'surval_parametre_point',
                type: 'service',
                accessRestricted: null,
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
                accessRestricted: null,
              },
              {
                accessServiceProtocol: 'wfs',
                url: new URL(
                  'http://www.ifremer.fr/services/wfs/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (ligne)',
                name: 'surval_parametre_ligne',
                type: 'service',
                accessRestricted: null,
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
                accessRestricted: null,
              },
              {
                accessServiceProtocol: 'wfs',
                url: new URL(
                  'http://www.ifremer.fr/services/wfs/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (polygone)',
                name: 'surval_parametre_polygone',
                type: 'service',
                accessRestricted: null,
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
              isHarvested: false,
              isOpenData: true,
              isPublishedToAll: true,
              ownerInfo: 'testadmin|ADMIN|Test|Administrator',
              edit: true,
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
            recordPublished: new Date('2021-11-05T12:48:57.678Z'),
            resourceCreated: new Date('2012-01-01T00:00:00.000Z'),
            resourceUpdated: new Date('2021-12-13T00:00:00.000Z'),
            resourcePublished: new Date('2021-04-01T00:00:00.000Z'),
            status: 'ongoing',
            topics: ['Installations de suivi environnemental', 'Océans'],
            title: 'Surval - Données par paramètre',
            uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
            updateFrequency: 'daily',
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
              isHarvested: false,
              isOpenData: true,
              isPublishedToAll: true,
              ownerInfo: 'AREadmin|admin|ARE|UserAdmin',
              edit: true,
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
            otherLanguages: ['fr', 'it', 'en', 'rm'],
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
                accessRestricted: false,
              },
              {
                accessServiceProtocol: 'wmts',
                description: 'WMTS-BGDI Dienst, Layer "Alpenkonvention"',
                name: 'ch.are.alpenkonvention',
                type: 'service',
                url: new URL(
                  'https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml?lang=de'
                ),
                accessRestricted: false,
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

      describe('full record service metadata Wallonie', () => {
        it('builds a complete record object', async () => {
          const record = await service.readRecord(
            elasticServiceMetadataHistsFixture().hits.hits[0] as Gn4Record
          )
          expect(record).toEqual({
            kind: 'service',
            status: null,
            lineage: null,
            recordUpdated: new Date('2024-10-15T07:37:39.350Z'),
            recordPublished: null,
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org/'),
            },
            licenses: [
              {
                text: 'No limitations to public access',
                url: new URL(
                  'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations'
                ),
              },
              {
                text: "Aucune contrainte d'utilisation ne s'applique",
              },
            ],
            legalConstraints: [
              {
                text: 'No limitations to public access',
                url: new URL(
                  'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations'
                ),
              },
              {
                text: "Aucune contrainte d'utilisation ne s'applique",
              },
            ],
            securityConstraints: [],
            otherConstraints: [
              {
                text: "Aucune condition ne s'applique",
              },
            ],
            contacts: [
              {
                lastName: '',
                organization: {
                  name: 'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
                },
                email: 'helpdesk.carto@spw.wallonie.be',
                role: 'point_of_contact',
              },
            ],
            contactsForResource: [
              {
                lastName: '',
                organization: {
                  name: 'Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
                },
                email: 'helpdesk.carto@spw.wallonie.be',
                role: 'point_of_contact',
              },
              {
                lastName: '',
                organization: {
                  name: 'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
                },
                email: 'helpdesk.carto@spw.wallonie.be',
                role: 'custodian',
              },
              {
                lastName: '',
                organization: {
                  name: 'Service public de Wallonie (SPW)',
                  website: new URL('https://geoportail.wallonie.be/'),
                },
                email: '',
                role: 'owner',
              },
            ],
            keywords: [
              {
                label: 'métadonnées',
                type: 'other',
              },
              {
                label: 'ISO',
                type: 'other',
              },
              {
                label: 'CSW',
                type: 'other',
              },
              {
                label: '19115',
                type: 'other',
              },
              {
                label: '19139',
                type: 'other',
              },
              {
                label: 'description',
                type: 'other',
              },
              {
                label: 'MobilityDCAT',
                type: 'other',
              },
              {
                label: 'DCAT',
                type: 'other',
              },
              {
                label: 'MMTIS',
                type: 'other',
              },
              {
                label: 'SRTI',
                type: 'other',
              },
              {
                label: 'ITS',
                type: 'other',
              },
              {
                label: 'NAP',
                type: 'other',
              },
              {
                label: 'transportdata',
                type: 'other',
              },
              {
                label: 'RTTI',
                type: 'other',
              },
              {
                label: 'SSTP',
                type: 'other',
              },
              {
                label: 'Régional',
                type: 'theme',
                key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/regional',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope',
                  name: 'Champ géographique',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope'
                  ),
                },
              },
              {
                label: 'Service de catalogue',
                type: 'theme',
                key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoCatalogueService',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory',
                  name: 'Classification of spatial data services',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory'
                  ),
                },
              },
              {
                label: 'transport',
                type: 'theme',
                key: 'http://www.eionet.europa.eu/gemet/theme/37',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet-theme',
                  name: 'GEMET themes',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.gemet-theme'
                  ),
                },
              },
              {
                label: 'Reporting INSPIRENO',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.infraSIG',
                  name: 'Mots-clés InfraSIG',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.infraSIG'
                  ),
                },
              },
              {
                label: 'Mobilité (autre)',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/3099',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
                  name: 'Thèmes du géoportail wallon',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
                  ),
                },
              },
              {
                label: 'Données de base (autre)',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5099',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
                  name: 'Thèmes du géoportail wallon',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
                  ),
                },
              },
              {
                label: 'Mobilité',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/30',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
                  name: 'Thèmes du géoportail wallon',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
                  ),
                },
              },
              {
                label: 'Données de base',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/50',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
                  name: 'Thèmes du géoportail wallon',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
                  ),
                },
              },
            ],
            topics: ['Infrastructures de transport'],
            spatialExtents: [
              {
                description: 'Région wallonne',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [2.75, 49.45],
                      [6.5, 49.45],
                      [6.5, 50.85],
                      [2.75, 50.85],
                      [2.75, 49.45],
                    ],
                  ],
                },
              },
            ],
            temporalExtents: [],
            overviews: [
              {
                url: new URL(
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/fe1c1a3d-c75b-435c-a1d1-48426818f54d/attachments/echangeur.png'
                ),
              },
            ],
            defaultLanguage: 'fr',
            otherLanguages: [],
            title: 'Service OGC API Records du catalogue NAP-ITS-Wallonia',
            resourceUpdated: new Date('2023-12-17T23:00:00.000Z'),
            resourcePublished: new Date('2023-12-17T23:00:00.000Z'),
            abstract:
              "Point d'accès OGC API Records du catalogue NAP-ITS-Wallonia contenant la description des données régionales de mobilité telles que demandé par la législation sur les systèmes de transport intelligents.",
            extras: {
              isHarvested: false,
              isOpenData: false,
              ownerInfo: 'vbombaerts_admin|Admin|Vincent|Administrator',
              isPublishedToAll: true,
              id: '53583',
              favoriteCount: 0,
              featureTypes: [],
              catalogUuid: 'metawal.wallonie.be',
              edit: true,
            },
            onlineResources: [
              {
                name: "Point d'accès OGC API Records pour NAP-ITS-Wallonia",
                description:
                  "Point d'accès OGC API Records pour NAP-ITS-Wallonia.",
                type: 'link',
                url: new URL(
                  'https://metawal.wallonie.be/geonetwork/api/collections/napits'
                ),
              },
            ],
            uniqueIdentifier: 'fe1c1a3d-c75b-435c-a1d1-48426818f54d',
            landingPage: new URL(
              'http://my.catalog.org/metadata/fe1c1a3d-c75b-435c-a1d1-48426818f54d'
            ),
            recordCreated: new Date('2023-12-18T12:25:26.464Z'),
          })
        })
      })

      describe('full record service metadata geo2france', () => {
        it('builds a complete record object', async () => {
          const record = await service.readRecord(
            elasticServiceMetadataHistsFixture().hits.hits[1] as Gn4Record
          )

          expect(record).toEqual({
            kind: 'service',
            status: null,
            lineage:
              "Localisation par un ponctuel de l'ouvrage de dépollution a partir d'un fichier csv collecté sur le site du ministère : http://assainissement.developpement-durable.gouv.fr/. \nLa table des ponctuels comprend désormais tous les points de localisation des stations d'épuration calculés à partir des centroïdes de leur emprise. \nFréquence de mise à jour : annuel. \nQualité des données : Variable selon le type de saisie.",
            recordUpdated: new Date('2024-05-29T11:58:54.326Z'),
            recordPublished: null,
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org/'),
            },
            licenses: [
              {
                text: 'No limitations on public access',
                url: new URL(
                  'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations'
                ),
              },
              {
                text: 'No conditions apply to access and use',
                url: new URL(
                  'http://inspire.ec.europa.eu/metadata-codelist/ConditionsApplyingToAccessAndUse/noConditionsApply'
                ),
              },
            ],
            legalConstraints: [
              {
                text: 'No limitations on public access',
                url: new URL(
                  'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations'
                ),
              },
              {
                text: 'No conditions apply to access and use',
                url: new URL(
                  'http://inspire.ec.europa.eu/metadata-codelist/ConditionsApplyingToAccessAndUse/noConditionsApply'
                ),
              },
            ],
            securityConstraints: [],
            otherConstraints: [],
            contacts: [
              {
                lastName: '',
                organization: {
                  name: 'Sandre',
                },
                email: 'sandre@sandre.eaufrance.fr',
                role: 'point_of_contact',
                address: 'OIEau, 15 rue Edouard Chamberland, 87000, France',
              },
            ],
            contactsForResource: [
              {
                lastName: '',
                organization: {
                  name: 'Sandre',
                },
                email: 'sandre@sandre.eaufrance.fr',
                role: 'custodian',
                address: 'OIEau, 15 Rue Edouad Chamberland, 87000, France',
              },
            ],
            keywords: [
              {
                label: 'National',
                type: 'other',
                key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/national',
              },
              {
                label: 'WFS',
                type: 'theme',
              },
              {
                label: 'Ouvrage de dépollution',
                type: 'theme',
              },
              {
                label: 'Rapportage',
                type: 'theme',
              },
              {
                label: 'ODP',
                type: 'theme',
              },
              {
                label: 'SysTraitementEauxUsees',
                type: 'theme',
              },
              {
                label: 'Données ouvertes',
                type: 'theme',
              },
              {
                label: "Services d'utilité publique et services publics",
                type: 'theme',
              },
              {
                label: 'France métropolitaine',
                type: 'theme',
              },
              {
                label: 'hvd',
                type: 'theme',
              },
              {
                label: "Services d'utilité publique et services publics",
                type: 'theme',
                key: 'http://inspire.ec.europa.eu/theme/pf',
                thesaurus: {
                  id: 'Registre de thème INSPIRE',
                  name: 'GEMET - INSPIRE themes, version 1.0',
                  url: new URL('http://inspire.ec.europa.eu/theme'),
                },
              },
              {
                label: 'Observation de la terre et environnement',
                type: 'theme',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.high-value-dataset-category-skos-ap-eu',
                  name: 'High-value dataset categories',
                  url: new URL(
                    'https://www.sandre.eaufrance.fr/atlas/srv/api/registries/vocabularies/external.theme.high-value-dataset-category-skos-ap-eu'
                  ),
                },
              },
              {
                label: 'Directive 2012/18/EU',
                type: 'other',
                key: 'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/dir-2012-18',
              },
              {
                label:
                  'Urban waste-water treatment plants (Urban Waste Water Treatment Directive)',
                type: 'other',
                key: 'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/EstablishmentsInvolvingDangerousSubstances-dir-2012-18',
              },
              {
                label: 'Service d’accès aux éléments',
                type: 'other',
                key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoFeatureAccessService',
              },
            ],
            topics: ["Services d'utilité publique et services publics"],
            spatialExtents: [
              {
                geometry: {
                  coordinates: [
                    [
                      [-61.798, -21.371],
                      [55.855, -21.371],
                      [55.855, 51.088],
                      [-61.798, 51.088],
                      [-61.798, -21.371],
                    ],
                  ],
                  type: 'Polygon',
                },
              },
            ],
            temporalExtents: [],
            overviews: [],
            defaultLanguage: 'fr',
            otherLanguages: [],
            extras: {
              isPublishedToAll: true,
              id: '15415',
              qualityScore: 62,
              isHarvested: true,
              isOpenData: false,
              catalogUuid: 'c3f93209-4363-4e30-bec2-3cc43bd7a8a7',
              ownerInfo: 'vfabry|Fabry|Vincent|Administrator',
              favoriteCount: 0,
              edit: true,
            },
            recordCreated: new Date('2021-12-14T15:02:50.000Z'),
            resourceCreated: new Date('2019-12-02T00:00:00.000Z'),
            uniqueIdentifier: 'be052079-f1f6-4f6f-a722-cbf11deb40eb',
            landingPage: new URL(
              'http://my.catalog.org/metadata/be052079-f1f6-4f6f-a722-cbf11deb40eb'
            ),
            abstract:
              "Le service web (WFS) du référentiel des Stations de traitement des eaux permet de télécharger les ouvrages impliqués dans la dépollution des eaux usées. Les différents concepts définis dans le scénario d'échange du référentiel Stations de traitement des eaux usées du Sandre sont diffusés par ce service.",
            onlineResources: [
              {
                name: 'sa:SysTraitementEauxUsees',
                description:
                  'Ouvrages de dépollution - Système de traitement des eaux usées - France entière',
                type: 'service',
                url: new URL(
                  'https://services.sandre.eaufrance.fr/geo/odp?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities'
                ),
                accessServiceProtocol: 'wfs',
                accessRestricted: false,
              },
            ],
            title:
              'Service web géographique OGC (WFS) du référentiel des Stations de traitement des eaux usées - Ouvrages de dépollution',
          })
        })
      })

      describe('full record reuse(application) metadata metawal', () => {
        it('builds a complete record object', async () => {
          const record = await service.readRecord(
            elasticReuseMetadataHitsFixture().hits.hits[0] as Gn4Record
          )

          expect(record).toEqual({
            abstract:
              "Application cartographique présentant des données du SPW territoire (Aménagement du territoire, Logement, Patrimoine et Energie).\n\nCette application propose une trentaine de couches de données thématiques regroupées dans cinq grands thèmes : 1) Aménagement du territoire et urbanisme, 2) Application particulière du CoDT, 3) Logement, 4) Patrimoine et 5) Applications spécifiques. Par thème, il est possible de consulter les couches de données individuellement à partir d'une liste prédéfinie, de consulter leurs métadonnées et leur légende.\n\n\nUne identification des données présentes sur le territoire est possible de trois manières différentes : fine, étendue ou par parcelle. Des liens sont prévus pour visualiser aisément les dossiers, et donc toute la partie documentaire. Le résultat peut être sauvé et exporté en pdf ou en xml.\n\nDes recherches (commune, rue, parcelle, coordonnées) sont également possibles, tout comme une impression.\n\nUne aide en ligne est mise à disposition.",
            contacts: [
              {
                email: 'jeanchristophe.sainte@spw.wallonie.be',
                lastName: '',
                organization: {
                  name: "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
                },
                role: 'point_of_contact',
              },
            ],
            contactsForResource: [
              {
                email: 'donnees.territoire@spw.wallonie.be',
                lastName: '',
                organization: {
                  name: "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
                },
                role: 'point_of_contact',
              },
              {
                email: 'jeanchristophe.sainte@spw.wallonie.be',
                lastName: '',
                organization: {
                  name: "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
                },
                role: 'custodian',
              },
              {
                email: '',
                lastName: '',
                organization: {
                  name: 'Service public de Wallonie (SPW)',
                  website: new URL('https://geoportail.wallonie.be/'),
                },
                role: 'owner',
              },
            ],
            defaultLanguage: 'fr',
            extras: {
              catalogUuid: 'metawal.wallonie.be',
              favoriteCount: 0,
              featureTypes: [],
              id: '1215',
              isHarvested: false,
              isOpenData: false,
              isPublishedToAll: true,
              edit: true,
              ownerInfo:
                'Admin_Metawal|Administrator_user de Stephane Ritz|Metawal|Administrator',
            },
            keywords: [
              {
                label: 'Aménagement du Territoire et Urbanisme',
                type: 'theme',
              },
              {
                label: 'Cahiers de Charges Urbanistiques et Environnementaux',
                type: 'theme',
              },
              {
                label: 'Campings',
                type: 'theme',
              },
              {
                label:
                  "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
                type: 'theme',
              },
              {
                label: 'Communes en décentralisation',
                type: 'theme',
              },
              {
                label: 'Lotissements',
                type: 'theme',
              },
              {
                label: 'Parcs Résidentiels de Week-End',
                type: 'theme',
              },
              {
                label: 'Périmètres de Reconnaissance Economique',
                type: 'theme',
              },
              {
                label: 'Plan de Secteur',
                type: 'theme',
              },
              {
                label: "Plans Communaux d'Aménagement",
                type: 'theme',
              },
              {
                label: "Plan d'Habitat Permanent",
                type: 'theme',
              },
              {
                label: 'Rapports Urbanistiques et Environnementaux',
                type: 'theme',
              },
              {
                label: 'Règlement Général sur les Bâtisses en Site Rural',
                type: 'theme',
              },
              {
                label: "Règlements Communaux d'Urbanisme",
                type: 'theme',
              },
              {
                label: 'Remembrement urbain',
                type: 'theme',
              },
              {
                label: 'Rénovation urbaine',
                type: 'theme',
              },
              {
                label: 'Revitalisation urbaine',
                type: 'theme',
              },
              {
                label: 'Schémas de Structure Communaux',
                type: 'theme',
              },
              {
                label: 'Sites À Réaménager',
                type: 'theme',
              },
              {
                label:
                  "Terrils à considérer en matière d'aménagement du territoire",
                type: 'theme',
              },
              {
                label: 'Zones agro-géographiques',
                type: 'theme',
              },
              {
                label: 'Zones franches urbaines',
                type: 'theme',
              },
              {
                label: "Zones Protégées en matière d'Urbanisme",
                type: 'theme',
              },
              {
                label: 'Logement',
                type: 'theme',
              },
              {
                label: "Zones d'Initiative Privilégiée",
                type: 'theme',
              },
              {
                label: 'Patrimoine',
                type: 'theme',
              },
              {
                label: 'Biens classés et zones de protection',
                type: 'theme',
              },
              {
                label: 'Biens exceptionnels',
                type: 'theme',
              },
              {
                label: 'Biens mondiaux',
                type: 'theme',
              },
              {
                label: 'Liste de sauvegarde',
                type: 'theme',
              },
              {
                label: 'Inventaire du patrimoine immobilier culturel',
                type: 'theme',
              },
              {
                label: "Application de l'article 127 du CWATUPE",
                type: 'theme',
              },
              {
                label: 'Cartes de Vander Maelen 1850',
                type: 'theme',
              },
              {
                label: 'PCA',
                type: 'theme',
              },
              {
                label: 'CCUE',
                type: 'theme',
              },
              {
                label: 'RGBSR',
                type: 'theme',
              },
              {
                label: 'PDS',
                type: 'theme',
              },
              {
                label: 'RUE',
                type: 'theme',
              },
              {
                label: 'RUE',
                type: 'theme',
              },
              {
                label: 'RCU',
                type: 'theme',
              },
              {
                label: 'SSC',
                type: 'theme',
              },
              {
                label: 'SAR',
                type: 'theme',
              },
              {
                label: 'ZIP',
                type: 'theme',
              },
              {
                label: 'cartographie en ligne',
                type: 'theme',
              },
              {
                label: 'application WebGIS',
                type: 'theme',
              },
              {
                label: 'visualisateur',
                type: 'theme',
              },
              {
                label: 'Reporting INSPIRENO',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.infraSIG',
                  name: 'Mots-clés InfraSIG',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.infraSIG'
                  ),
                },
              },
              {
                label: 'Cartes anciennes',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5040',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
                  name: 'Thèmes du géoportail wallon',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
                  ),
                },
              },
              {
                label: 'Aménagement du territoire',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/20',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
                  name: 'Thèmes du géoportail wallon',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
                  ),
                },
              },
              {
                label: 'Logement et habitat',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/6030',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
                  name: 'Thèmes du géoportail wallon',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
                  ),
                },
              },
              {
                label: 'Risques et contraintes',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2020',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
                  name: 'Thèmes du géoportail wallon',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
                  ),
                },
              },
              {
                label: 'Plans et règlements',
                type: 'theme',
                key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2010',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
                  name: 'Thèmes du géoportail wallon',
                  url: new URL(
                    'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
                  ),
                },
              },
            ],
            kind: 'reuse',
            landingPage: new URL(
              'http://my.catalog.org/metadata/83809bcd-1763-4d28-b820-2b9828083ba5'
            ),
            legalConstraints: [
              {
                text: "Aucune contrainte d'accès à l'application.",
              },
              {
                text: "Les mentions légales et contraintes accessibles depuis l'application s'appliquent",
              },
            ],
            licenses: [
              {
                text: "Aucune contrainte d'accès à l'application.",
              },
              {
                text: "Les mentions légales et contraintes accessibles depuis l'application s'appliquent",
              },
            ],
            lineage:
              "L'application a été développée sur base de l'API GeoViewer",
            onlineResources: [
              {
                description:
                  'Application permettant la visualisation cartographique par thématique des couches de référence de la DGO4 du SPW.',
                name: 'Application de consultation des couches de données de la DGO4',
                type: 'link',
                url: new URL('http://geoapps.wallonie.be/webgisdgo4'),
              },
              {
                description:
                  'Informations complémentaires sur les couches de données proposées par la DGO4',
                name: 'Données documentaires de la DGO4',
                type: 'link',
                url: new URL(
                  'http://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese'
                ),
              },
            ],
            otherConstraints: [
              {
                text: "L'utilisation des applications nécessite l'installation de trois plugins gratuits (PDF, DjVu et Flashplayer) pour la visualisation des données cartographiques, les informations documentaires alphanumériques qui y sont directement liées et les pièces scannées associées aux dossiers (dans les données documentaires). Téléchargement possible via l'application.",
              },
              {
                text: "Les mentions légales accessibles depuis l'application s'appliquent.",
              },
              {
                text: "Les limites d'utilisation des données et services s'appliquent.",
              },
              {
                text: "L'information peut être utilisée gratuitement pour un usage personnel ou dans un cadre administratif (par exemple afin de compléter un formulaire destiné à l'administration) et à condition de citer clairement la source.",
              },
              {
                text: 'Toute reproduction et/ou représentation et/ou rediffusion, en tout ou partie, sur tout support électronique ou non, présent ou futur, ayant un caractère commercial, est interdite sauf autorisation expresse et préalable.',
              },
              {
                text: "Les données géographiques disponibles au départ de l'application n'ont aucune valeur légale et sont mises à disposition de l'utilisateur à titre indicatif.",
              },
            ],
            otherLanguages: [],
            overviews: [
              {
                url: new URL(
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/83809bcd-1763-4d28-b820-2b9828083ba5/attachments/SPWTerritoire.PNG'
                ),
              },
            ],
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org/'),
            },
            recordCreated: new Date('2013-07-29T11:33:08.000Z'),
            recordPublished: null,
            recordUpdated: new Date('2024-07-22T11:52:39.049Z'),
            resourceCreated: new Date('2017-05-31T22:00:00.000Z'),
            resourcePublished: new Date('2018-03-31T22:00:00.000Z'),
            reuseType: 'application',
            securityConstraints: [],
            spatialExtents: [
              {
                description: 'Région wallonne',
                geometry: {
                  coordinates: [
                    [
                      [2.75, 49.45],
                      [6.5, 49.45],
                      [6.5, 50.85],
                      [2.75, 50.85],
                      [2.75, 49.45],
                    ],
                  ],
                  type: 'Polygon',
                },
              },
            ],
            status: null,
            temporalExtents: [],
            title: 'Cartographie des données du SPW territoire',
            topics: [],
            uniqueIdentifier: '83809bcd-1763-4d28-b820-2b9828083ba5',
          })
        })
      })

      describe('full record reuse (interactive map) metadata geo2france', () => {
        it('builds a complete record object', async () => {
          const record = await service.readRecord(
            elasticReuseMetadataHitsFixture().hits.hits[1] as Gn4Record
          )

          expect(record).toEqual({
            kind: 'reuse',
            status: null,
            lineage: null,
            recordUpdated: new Date('2024-09-26T13:34:25.803Z'),
            recordPublished: null,
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org/'),
            },
            licenses: [],
            legalConstraints: [],
            securityConstraints: [],
            otherConstraints: [],
            contacts: [
              {
                lastName: '',
                organization: {
                  name: 'Office français de la biodiversité',
                },
                email: 'cartotheque@ofb.gouv.fr',
                role: 'point_of_contact',
              },
            ],
            contactsForResource: [
              {
                lastName: '',
                organization: {
                  name: 'Réseau Ongulés sauvages OFB-FNC-FDC',
                },
                email: 'reseau.ongules-sauvages@ofb.gouv.fr',
                role: 'author',
              },
              {
                lastName: '',
                organization: {
                  name: 'Office France de la Biodiversité',
                },
                email: 'reseau.ongules-sauvages@ofb.gouv.fr',
                role: 'owner',
              },
              {
                lastName: '',
                organization: {
                  name: 'Fédération Nationale de la Chasse',
                },
                email: '',
                role: 'owner',
              },
              {
                lastName: '',
                organization: {
                  name: 'Fédération Départementale de la Chasse',
                },
                email: '',
                role: 'resource_provider',
              },
            ],
            keywords: [
              {
                label: 'espèce animale',
                type: 'theme',
                key: 'http://www.eionet.europa.eu/gemet/concept/10073',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
              },
              {
                label: 'chasse',
                type: 'theme',
                key: 'http://www.eionet.europa.eu/gemet/concept/4072',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.gemet',
                  name: 'GEMET',
                  url: new URL(
                    'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.gemet'
                  ),
                },
              },
              {
                label: 'Tableaux de chasse',
                type: 'theme',
              },
              {
                label: 'Ongulés',
                type: 'theme',
              },
              {
                label: 'Départements',
                type: 'theme',
              },
              {
                label: 'Répartition des espèces',
                type: 'theme',
                key: 'http://inspire.ec.europa.eu/theme/sd',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
                  name: 'GEMET - INSPIRE themes, version 1.0',
                  url: new URL(
                    'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme'
                  ),
                },
              },
              {
                label: 'Unités administratives',
                type: 'theme',
                key: 'http://inspire.ec.europa.eu/theme/au',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
                  name: 'GEMET - INSPIRE themes, version 1.0',
                  url: new URL(
                    'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme'
                  ),
                },
              },
              {
                label: 'France métropolitaine',
                type: 'theme',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.excel2skos-case-usage-geographie-2023-11-24',
                  name: 'Thesaurus géographique',
                  url: new URL(
                    'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.excel2skos-case-usage-geographie-2023-11-24'
                  ),
                },
              },
              {
                label: 'réseaux',
                type: 'theme',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.excel2skos-case-usage-thematique-2023-06-08',
                  name: 'Thématique OFB',
                  url: new URL(
                    'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.excel2skos-case-usage-thematique-2023-06-08'
                  ),
                },
              },
              {
                label: 'espèces',
                type: 'theme',
                thesaurus: {
                  id: 'geonetwork.thesaurus.external.theme.excel2skos-case-usage-thematique-2023-06-08',
                  name: 'Thématique OFB',
                  url: new URL(
                    'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.excel2skos-case-usage-thematique-2023-06-08'
                  ),
                },
              },
            ],
            topics: ['Répartition des espèces', 'Unités administratives'],
            spatialExtents: [
              {
                geometry: {
                  coordinates: [
                    [
                      [-7.3131, 40.4671],
                      [11.9303, 40.4671],
                      [11.9303, 51.7141],
                      [-7.3131, 51.7141],
                      [-7.3131, 40.4671],
                    ],
                  ],
                  type: 'Polygon',
                },
              },
            ],
            temporalExtents: [],
            overviews: [
              {
                url: new URL(
                  'https://data.ofb.fr/catalogue/Donnees-geographiques-OFB/api/records/7eb795c2-d612-4b5e-b15e-d985b0f4e697/attachments/OFB.png'
                ),
              },
            ],
            defaultLanguage: 'fr',
            otherLanguages: [],
            extras: {
              isPublishedToAll: true,
              id: '19436',
              qualityScore: 62,
              isHarvested: true,
              isOpenData: false,
              catalogUuid: 'c3f93209-4363-4e30-bec2-3cc43bd7a8a7',
              ownerInfo: 'vfabry|Fabry|Vincent|Administrator',
              favoriteCount: 0,
              edit: true,
            },
            recordCreated: new Date('2024-09-13T10:12:38.614Z'),
            resourceCreated: new Date('2024-05-27T00:00:00.000Z'),
            reuseType: 'map',
            uniqueIdentifier: '7eb795c2-d612-4b5e-b15e-d985b0f4e697',
            landingPage: new URL(
              'http://my.catalog.org/metadata/7eb795c2-d612-4b5e-b15e-d985b0f4e697'
            ),
            abstract:
              "----------------------------\nContexte & objectifs\n----------------------------\n\nDans le cadre de ses missions, l’OFB (anciennement l’ONC puis l’ONCFS) réalise le suivi des populations de grands ongulés sauvages en France métropolitaine. \nPour réaliser cette tâche complexe un réseau de correspondants départementaux, l’actuel réseau « Ongulés sauvages OFB-FNC-FDC » a été créée en 1985, et fonctionne grâce à la collaboration entre l’OFB et les fédérations nationale (FNC) et départementales des chasseurs (FDC). \n\nLes données ont été compilées à partir des données fournies par les Interlocuteurs techniques des FDC du Réseau Ongulés sauvages OFB-FNC-FDC pour toutes les espèces d'ongulés sauvages présentes en France métropolitaine.\n\n----------------------------\nLes espèces concernées\n----------------------------\n\nLes espèces concernées sont les suivantes : \nBouquetin des Alpes (Capra ibex)\nBouquetin ibérique (Capra pyrenaica)\nCerf élaphe (Cervus elaphus)\nCerf sika (Cervus nippon)\nChamois (Rupicapra rupicapra)\nDaim (Dama dama)\nIsard (Rupicapra pyrenaica)\nMouflon de Corse (Ovis gmelinii musimon)\nMouflon méditerranéen (Ovis gmelini musimon x Ovis sp.)\nMuntjac de Chine (Muntiacus reevesi)\net le Mouflon à manchettes (Ammotragus lervia).\n\n----------------------------\nProtocole et limites d'utilisations \n----------------------------\nLa méthode se basant sur des connaissances locales de la présence de populations établies par des professionnels connaissant bien leur territoire, la notion d’échantillonnage qualifiée d’\"exhaustif\" est crédible.\nLe travail est réalisé par unité de population, c’est-à-dire par secteur occupé par au minimum un groupe d’individus adultes susceptibles de se rencontrer et d’établir entre eux des rapports sociaux et génétiques (reproduction). Il peut donc exister des individus isolés présents en dehors des zones délimitées par ce programme.\nPour des raisons administratives l’inventaire est fait par département. Ainsi pour une population à cheval sur plusieurs départements chaque portion départementale constitue une zone. Un département peut abriter plusieurs zones. \nLes données sont vérifiées, harmonisées et validées par l’administrateur(rice) national(e) du réseau tous les 5 ans (avec un rythme différents selon les espèces).\n\n----------------------------\nFréquence de mise à jour\n----------------------------\n\npériodique \n\n----------------------------\nOutils\n----------------------------\n\nLes données de chacune de ces espèces sont consultables sur la carte interactive de l'espèce. créées à partir de l'outil Lizmap.",
            onlineResources: [
              {
                name: 'Carte dynamique de répartition du Cerf élaphe',
                type: 'link',
                url: new URL(
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=reseau_cerf_lizmap'
                ),
              },
              {
                name: 'Carte dynamique de répartition du Mouflon méditerranéen',
                type: 'link',
                url: new URL(
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_MOM'
                ),
              },
              {
                name: 'Carte dynamique de répartition du Mouflon de Corse',
                type: 'link',
                url: new URL(
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_MOC'
                ),
              },
              {
                name: "Carte dynamique de répartition de l'ISARD",
                type: 'link',
                url: new URL(
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_ISA'
                ),
              },
              {
                name: 'Carte dynamique de répartition du Chamois',
                type: 'link',
                url: new URL(
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_CHA'
                ),
              },
              {
                name: 'Carte dynamique de répartition du Bouquetin des Alpes',
                type: 'link',
                url: new URL(
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_BOQ'
                ),
              },
              {
                name: 'Carte dynamique de répartition du Bouquetin ibérique',
                type: 'link',
                url: new URL(
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_BOI'
                ),
              },
            ],
            title:
              'Carte dynamique sur la répartition des ongulés sauvages en France',
          })
        })
      })

      describe('full record reuse (static map) metadata georhena', () => {
        it('builds a complete record object', async () => {
          const record = await service.readRecord(
            elasticReuseMetadataHitsFixture().hits.hits[2] as Gn4Record
          )

          expect(record).toEqual({
            kind: 'reuse',
            status: 'completed',
            lineage: null,
            recordUpdated: new Date('2024-01-25T07:45:05.215Z'),
            recordPublished: null,
            recordCreated: new Date('2024-01-25T07:19:13.493Z'),
            resourcePublished: new Date('2023-12-20T14:23:54.000Z'),
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org/'),
            },
            licenses: [],
            legalConstraints: [],
            securityConstraints: [],
            otherConstraints: [],
            contacts: [
              {
                lastName: '',
                organization: {
                  name: 'TRION-climate / GeoRhena',
                },
                email: '',
                role: 'distributor',
              },
            ],
            contactsForResource: [
              {
                lastName: '',
                organization: {
                  name: 'GeoRhena',
                },
                email: 'contact@georhena.eu',
                role: 'point_of_contact',
              },
            ],
            keywords: [
              {
                label: 'Wasserstoff',
                type: 'theme',
              },
              {
                label: 'Innovation',
                type: 'theme',
              },
              {
                label: 'Mviewer',
                type: 'theme',
              },
            ],
            topics: ['Umwelt'],
            spatialExtents: [],
            temporalExtents: [],
            overviews: [
              {
                url: new URL(
                  'https://geoportal.georhena.eu/geonetwork/srv/api/records/be209d24-586f-48f5-b944-e284079b7823/attachments/hydrogene_mviewer.jpg'
                ),
              },
            ],
            defaultLanguage: 'fr',
            otherLanguages: ['de', 'en'],
            reuseType: 'map',
            title:
              'Herstellung, Verwendung, Forschung und Verteilung von Wasserstoff am Oberrhein',
            abstract:
              'Im Rahmen des Interreg-Projekts CO2-InnO hat TRION-climate rund 50 Wasserstoffprojekte am Oberrhein erfasst und beschrieben. Auf diese Weise findet man die verschiedenen Standorte der Wasserstoffproduktion, die wichtigsten Forschungsprojekte, die Transport- und Verteilungsnetze sowie die großen Abnehmer von grünem Wasserstoff in der Region. GeoRhena, das Geoinformationssystem des Oberrheins, präsentierte diese Anlagen auf einer interaktiven Karte der Wasserstoffanlagen und -projekte.',
            extras: {
              isHarvested: false,
              isOpenData: false,
              ownerInfo: 'sritzenthaler|Ritzenthaler|Stéphane|Administrator',
              isPublishedToAll: true,
              id: '8705',
              favoriteCount: 0,
              catalogUuid: 'ce008f24-8e0d-45a8-97f8-9f10399f0190',
              edit: true,
            },
            onlineResources: [
              {
                name: 'Carte interactive "Hydrogène" en français',
                type: 'link',
                url: new URL(
                  'https://geoportal.georhena.eu/mviewer/?config=apps/hydrogene.xml'
                ),
              },
              {
                name: 'Carte interactive "Hydrogène" en allemand',
                type: 'link',
                url: new URL(
                  'https://geoportal.georhena.eu/mviewer/?config=apps/wasserstoff.xml'
                ),
              },
            ],
            uniqueIdentifier: 'be209d24-586f-48f5-b944-e284079b7823',
            landingPage: new URL(
              'http://my.catalog.org/metadata/be209d24-586f-48f5-b944-e284079b7823'
            ),
          })
        })
      })

      describe('full record type foo (dummy data)', () => {
        it('sets the kind as a dataset and does not add reuseType property', async () => {
          const record = await service.readRecord(
            elasticReuseMetadataHitsFixture().hits.hits[3] as Gn4Record
          )

          expect(record.kind).toEqual('dataset')
          expect(record).not.toHaveProperty('reuseType')
        })
      })
    })
  })
})
