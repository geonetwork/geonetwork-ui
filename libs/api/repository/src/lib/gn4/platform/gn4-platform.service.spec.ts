import {
  MeApiService,
  RegistriesApiService,
  SiteApiService,
  ToolsApiService,
  UserfeedbackApiService,
  UserFeedbackDTOApiModel,
  UsersApiService,
} from '@geonetwork-ui/data-access/gn4'
import { TestBed } from '@angular/core/testing'
import { Gn4PlatformService } from './gn4-platform.service'
import { firstValueFrom, lastValueFrom, of, Subject, throwError } from 'rxjs'
import { AvatarServiceInterface } from '../auth/avatar.service.interface'
import { Gn4PlatformMapper } from './gn4-platform.mapper'
import { LangService } from '@geonetwork-ui/util/i18n'
import {
  someUserFeedbacksFixture,
  userFeedbackFixture,
} from '@geonetwork-ui/common/fixtures'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'

let geonetworkVersion: string

const userMock = {
  id: '21737',
  profile: 'Administrator',
  username: 'C2C-gravin',
  name: 'Florent',
  surname: 'Gravin',
  email: 'florent.gravin@camptocamp.com',
  hash: 'girafe',
  organisation: null,
  admin: true,
  groupsWithRegisteredUser: [],
  groupsWithEditor: [],
  groupsWithReviewer: [],
  groupsWithUserAdmin: [],
}

class MeApiMock {
  getMe() {
    return this._me$
  }

  _me$ = new Subject()
}

class AvatarServiceInterfaceMock {
  getPlaceholder = () => of('http://placeholder.com')
  getProfileIcon = (hash: string) => of(`http://icon_service.com/${hash}`)
}

class SiteApiServiceMock {
  getSiteOrPortalDescription = jest.fn(() =>
    of({
      'system/platform/version': geonetworkVersion,
    })
  )
}

class UsersApiServiceMock {
  getUsers() {
    return of([
      {
        username: 'ken',
        email: 'ken@sf2.com',
        id: 1,
      },
      {
        username: 'ryu',
        email: 'ryu@sf2.com',
        id: 2,
      },
    ])
  }
}

class ToolsApiServiceMock {
  getTranslationsPackage1 = jest.fn(() =>
    of({
      'First value': 'Translated first value',
      'Second value': 'Hello',
      'Third value': 'Bla',
    })
  )
}

class HttpClientMock {
  get = jest.fn(() =>
    of([
      [
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
      ],
    ])
  )
}
class RegistriesApiServiceMock {
  configuration = {
    basePath: 'https://demo.georchestra.org/geonetwork/srv/api',
  }
  searchKeywords = jest.fn(() =>
    of([
      {
        values: {
          fre: 'Adresses',
        },
        definitions: {
          fre: 'Localisation des propriétés fondée sur les identifiants des adresses, habituellement le nom de la rue, le numéro de la maison et le code postal.',
        },
        coordEast: '',
        coordWest: '',
        coordSouth: '',
        coordNorth: '',
        thesaurusKey: 'external.theme.httpinspireeceuropaeutheme-theme',
        // note how the uri can sometimes be prefixed by an "all thesaurus" uri
        uri: 'http://org.fao.geonet.thesaurus.all/external.theme.httpinspireeceuropaeutheme-theme@@@http://inspire.ec.europa.eu/theme/ad',
        definition: 'localization of properties',
        value: 'addresses',
      },
      {
        values: {
          fre: 'Altitude',
        },
        definitions: {
          fre: "Modèles numériques pour l'altitude des surfaces terrestres, glaciaires et océaniques. Comprend l'altitude terrestre, la bathymétrie et la ligne de rivage.",
        },
        coordEast: '',
        coordWest: '',
        coordSouth: '',
        coordNorth: '',
        thesaurusKey: 'external.theme.httpinspireeceuropaeutheme-theme',
        uri: 'http://inspire.ec.europa.eu/theme/el',
        definition: 'digital terrain models',
        value: 'altitude',
      },
    ])
  )
}

class LangServiceMock {
  iso3 = 'fre'
}

class UserfeedbackApiServiceMock {
  getUserComments = jest.fn(() => of(someUserFeedbacksFixture()))
  newUserFeedback = jest.fn(() => of(undefined))
}

describe('Gn4PlatformService', () => {
  let service: Gn4PlatformService
  let meApiService: MeApiService
  let toolsApiService: ToolsApiService
  let registriesApiService: RegistriesApiService
  let userFeedbackApiService: UserfeedbackApiServiceMock

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Gn4PlatformService,
        Gn4PlatformMapper,
        {
          provide: SiteApiService,
          useClass: SiteApiServiceMock,
        },
        {
          provide: UsersApiService,
          useClass: UsersApiServiceMock,
        },
        {
          provide: MeApiService,
          useClass: MeApiMock,
        },
        {
          provide: AvatarServiceInterface,
          useClass: AvatarServiceInterfaceMock,
        },
        {
          provide: ToolsApiService,
          useClass: ToolsApiServiceMock,
        },
        {
          provide: RegistriesApiService,
          useClass: RegistriesApiServiceMock,
        },
        {
          provide: LangService,
          useClass: LangServiceMock,
        },
        {
          provide: UserfeedbackApiService,
          useClass: UserfeedbackApiServiceMock,
        },
        {
          provide: HttpClient,
          useClass: HttpClientMock,
        },
      ],
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(Gn4PlatformService)
    meApiService = TestBed.inject(MeApiService)
    toolsApiService = TestBed.inject(ToolsApiService)
    registriesApiService = TestBed.inject(RegistriesApiService)
    userFeedbackApiService = TestBed.inject(UserfeedbackApiService as any)
    TestBed.inject(HttpTestingController)
  })

  it('creates', () => {
    expect(service).toBeTruthy()
  })

  describe('version', () => {
    describe('when version is lower than 4.2.2', () => {
      beforeEach(() => {
        geonetworkVersion = '4.2.0'
      })
      it('throws an error', async () => {
        let error
        await firstValueFrom(service.getApiVersion()).catch((e) => (error = e))
        expect(error).toEqual(
          new Error(
            'Gn4 API version is not compatible.\nMinimum: 4.2.2\nYour version: 4.2.0'
          )
        )
      })
    })
    describe('when version is euqal or greater than 4.2.2', () => {
      beforeEach(() => {
        geonetworkVersion = '4.2.2'
      })
      it('fetches version from settings', async () => {
        const version = await firstValueFrom(service.getApiVersion())
        expect(version).toEqual('4.2.2')
      })
    })
  })

  it('fetches users from api', async () => {
    const users = await firstValueFrom(service.getUsers())
    expect(users).toEqual([
      {
        username: 'ken',
        email: 'ken@sf2.com',
        id: '1',
      },
      {
        username: 'ryu',
        email: 'ryu@sf2.com',
        id: '2',
      },
    ])
  })
  it('is of type GeoNetwork', async () => {
    expect(service.getType()).toEqual('GeoNetwork')
  })
  describe('MeService', () => {
    let me
    beforeEach(() => {
      service.getMe().subscribe((response) => (me = response))
    })
    describe('When user is logged in', () => {
      beforeEach(() => {
        ;(meApiService as any)._me$.next(userMock)
      })
      it('returns mapped user ', async () => {
        expect(me).toEqual({
          id: '21737',
          profile: 'Administrator',
          username: 'C2C-gravin',
          name: 'Florent',
          surname: 'Gravin',
          email: 'florent.gravin@camptocamp.com',
          profileIcon: 'http://icon_service.com/girafe',
          organisation: null,
        })
      })
      it('is not anonymous ', async () => {
        const isAnonymous = await firstValueFrom(service.isAnonymous())
        expect(isAnonymous).toBe(false)
      })
    })
    describe('When no user is logged in', () => {
      beforeEach(() => {
        ;(meApiService as any)._me$.next({})
      })
      it('returns no user ', async () => {
        const me = await firstValueFrom(service.getMe())
        expect(me).toEqual({ profileIcon: 'http://icon_service.com/undefined' })
      })
      it('is anonymous ', async () => {
        const isAnonymous = await firstValueFrom(service.isAnonymous())
        expect(isAnonymous).toBe(true)
      })
    })
  })
  describe('#translateKey', () => {
    it('returns translation ', async () => {
      const translation = await lastValueFrom(
        service.translateKey('First value')
      )
      expect(translation).toEqual('Translated first value')
    })
    it('fetch api translations once ', async () => {
      await lastValueFrom(service.translateKey('First value'))
      await lastValueFrom(service.translateKey('Second value'))
      expect(toolsApiService.getTranslationsPackage1).toHaveBeenCalledTimes(1)
    })
    describe('if key is a URI', () => {
      beforeEach(() => {
        jest.spyOn(service, 'getKeywordsByUri')
      })
      it('calls getKeywordsByUri using the thesaurus base path', async () => {
        await lastValueFrom(
          service.translateKey(
            'https://www.eionet.europa.eu/gemet/concept/15028?abc#123'
          )
        )
        expect(service.getKeywordsByUri).toHaveBeenCalledWith(
          'https://www.eionet.europa.eu/gemet/concept/'
        )
      })
      it('returns translation if found', async () => {
        const translation = await lastValueFrom(
          service.translateKey('http://inspire.ec.europa.eu/theme/ad')
        )
        expect(translation).toEqual('Adresses')
      })
      it('returns key if not found', async () => {
        const translation = await lastValueFrom(
          service.translateKey(
            'http://www.eionet.europa.eu/gemet/concept/15028'
          )
        )
        expect(translation).toEqual(
          'http://www.eionet.europa.eu/gemet/concept/15028'
        )
      })
    })
  })
  describe('#searchKeywords', () => {
    beforeEach(() => {
      jest.spyOn(service, 'searchKeywords')
    })
    it('calls api service with qeury', () => {
      service.searchKeywords('road', ['theme']).subscribe()
      expect(registriesApiService.searchKeywords).toHaveBeenCalledWith(
        'road',
        'fre',
        10,
        0,
        null,
        ['external.theme.httpinspireeceuropaeutheme-theme'],
        null,
        '*road*'
      )
    })
    it('returns mapped thesaurus with translated values', async () => {
      const keywords = await lastValueFrom(
        service.searchKeywords('road', ['theme'])
      )
      expect(keywords).toEqual([
        {
          description:
            'Localisation des propriétés fondée sur les identifiants des adresses, habituellement le nom de la rue, le numéro de la maison et le code postal.',
          key: 'http://inspire.ec.europa.eu/theme/ad',
          label: 'Adresses',
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
          description:
            "Modèles numériques pour l'altitude des surfaces terrestres, glaciaires et océaniques. Comprend l'altitude terrestre, la bathymétrie et la ligne de rivage.",
          key: 'http://inspire.ec.europa.eu/theme/el',
          label: 'Altitude',
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
      ])
    })
    describe('if translations are unavailable', () => {
      it('uses default values', async () => {
        service['langService']['iso3'] = 'ger'
        const keywords = await lastValueFrom(
          service.searchKeywords('road', ['theme'])
        )
        expect(keywords).toEqual([
          {
            description: 'localization of properties',
            key: 'http://inspire.ec.europa.eu/theme/ad',
            label: 'addresses',
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
            description: 'digital terrain models',
            key: 'http://inspire.ec.europa.eu/theme/el',
            label: 'altitude',
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
        ])
      })
    })
    describe('if keywordType is empty Array', () => {
      it('calls api service with empty array and returns keywords from all thesauri', async () => {
        service.searchKeywords('road', ['theme']).subscribe()
        const keywords = await lastValueFrom(
          service.searchKeywords('road', ['theme'])
        )

        expect(registriesApiService.searchKeywords).toHaveBeenCalledWith(
          'road',
          'fre',
          10,
          0,
          null,
          ['external.theme.httpinspireeceuropaeutheme-theme'],
          null,
          '*road*'
        )

        expect(keywords).toEqual([
          {
            description:
              'Localisation des propriétés fondée sur les identifiants des adresses, habituellement le nom de la rue, le numéro de la maison et le code postal.',
            key: 'http://inspire.ec.europa.eu/theme/ad',
            label: 'Adresses',
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
            description:
              "Modèles numériques pour l'altitude des surfaces terrestres, glaciaires et océaniques. Comprend l'altitude terrestre, la bathymétrie et la ligne de rivage.",
            key: 'http://inspire.ec.europa.eu/theme/el',
            label: 'Altitude',
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
        ])
      })
    })
  })
  describe('#getKeywordsByUri', () => {
    it('calls api service ', async () => {
      service.getKeywordsByUri('http://inspire.ec.europa.eu/theme/')
      expect(registriesApiService.searchKeywords).toHaveBeenCalledWith(
        null,
        'fre',
        1000,
        0,
        null,
        null,
        null,
        'http://inspire.ec.europa.eu/theme/*'
      )
    })
    it('returns mapped thesaurus with translated values', async () => {
      const thesaurusDomain = await lastValueFrom(
        service.getKeywordsByUri('http://inspire.ec.europa.eu/theme/')
      )
      expect(thesaurusDomain).toEqual([
        {
          description:
            'Localisation des propriétés fondée sur les identifiants des adresses, habituellement le nom de la rue, le numéro de la maison et le code postal.',
          key: 'http://inspire.ec.europa.eu/theme/ad',
          label: 'Adresses',
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
          description:
            "Modèles numériques pour l'altitude des surfaces terrestres, glaciaires et océaniques. Comprend l'altitude terrestre, la bathymétrie et la ligne de rivage.",
          key: 'http://inspire.ec.europa.eu/theme/el',
          label: 'Altitude',
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
      ])
    })
    describe('if translations are unavailable', () => {
      it('uses default values', async () => {
        service['langService']['iso3'] = 'ger'
        const thesaurusDomain = await lastValueFrom(
          service.getKeywordsByUri('http://inspire.ec.europa.eu/theme/')
        )
        expect(thesaurusDomain).toEqual([
          {
            description: 'localization of properties',
            key: 'http://inspire.ec.europa.eu/theme/ad',
            label: 'addresses',
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
            description: 'digital terrain models',
            key: 'http://inspire.ec.europa.eu/theme/el',
            label: 'altitude',
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
        ])
      })
    })
    describe('getUserFeedbacks', () => {
      it('should call getUserComments with correct UUID and map results', (done) => {
        const mockUuid = '1234'
        const mockFeedbacks = someUserFeedbacksFixture()

        service.getUserFeedbacks(mockUuid).subscribe({
          next: (results) => {
            expect(results).toEqual(mockFeedbacks)
            expect(userFeedbackApiService.getUserComments).toHaveBeenCalledWith(
              mockUuid
            )
            done()
          },
          error: done,
        })
      })

      it('should handle errors', (done) => {
        const mockUuid = '1234'
        const errorResponse = new Error('Failed to fetch')
        userFeedbackApiService.getUserComments.mockReturnValue(
          throwError(() => errorResponse)
        )

        service.getUserFeedbacks(mockUuid).subscribe({
          next: (result) => {
            expect(result).toBeUndefined()
            done()
          },
          error: () => {
            done('Expected success, but got error')
          },
        })
      })
    })

    describe('postUserFeedbacks', () => {
      it('should process and post user feedbacks correctly', (done) => {
        const expected: UserFeedbackDTOApiModel = {
          ...userFeedbackFixture(),
          authorUserId: expect.any(Number),
          date: expect.any(String),
        }

        service.postUserFeedbacks(userFeedbackFixture()).subscribe({
          next: () => {
            expect(userFeedbackApiService.newUserFeedback).toHaveBeenCalledWith(
              expected
            )
            done()
          },
          error: done,
        })
      })
    })
  })
  describe('#searchKeywordsInThesaurus', () => {
    it('calls api service and strips thesaurus id of the geonetwork prefix', async () => {
      await firstValueFrom(
        service.searchKeywordsInThesaurus(
          'Bla',
          'geonetwork.thesaurus.external.place.regions'
        )
      )
      expect(registriesApiService.searchKeywords).toHaveBeenCalledWith(
        'Bla',
        'fre',
        100,
        0,
        null,
        ['external.place.regions'],
        null
      )
    })
    it('returns mapped thesaurus with translated values', async () => {
      const keywords = await lastValueFrom(
        service.searchKeywordsInThesaurus(
          'Bla',
          'geonetwork.thesaurus.external.place.regions'
        )
      )
      expect(keywords).toEqual([
        {
          description:
            'Localisation des propriétés fondée sur les identifiants des adresses, habituellement le nom de la rue, le numéro de la maison et le code postal.',
          key: 'http://inspire.ec.europa.eu/theme/ad',
          label: 'Adresses',
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
          description:
            "Modèles numériques pour l'altitude des surfaces terrestres, glaciaires et océaniques. Comprend l'altitude terrestre, la bathymétrie et la ligne de rivage.",
          key: 'http://inspire.ec.europa.eu/theme/el',
          label: 'Altitude',
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
      ])
    })
    it('returns an empty array if the thesaurus is unknown', async () => {
      const keywords = await firstValueFrom(
        service.searchKeywordsInThesaurus('Bla', 'abcd')
      )
      expect(keywords).toEqual([])
    })
  })
})
