import {
  MeApiService,
  RegistriesApiService,
  SiteApiService,
  ToolsApiService,
  UsersApiService,
} from '@geonetwork-ui/data-access/gn4'
import { TestBed } from '@angular/core/testing'
import { Gn4PlatformService } from './gn4-platform.service'
import { firstValueFrom, lastValueFrom, of, Subject } from 'rxjs'
import { AvatarServiceInterface } from '../auth/avatar.service.interface'
import { Gn4PlatformMapper } from './gn4-platform.mapper'

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

class RegistriesApiServiceMock {
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
        uri: 'http://inspire.ec.europa.eu/theme/ad',
        definition:
          'Localisation des propriétés fondée sur les identifiants des adresses, habituellement le nom de la rue, le numéro de la maison et le code postal.',
        value: 'Adresses',
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
        definition:
          "Modèles numériques pour l'altitude des surfaces terrestres, glaciaires et océaniques. Comprend l'altitude terrestre, la bathymétrie et la ligne de rivage.",
        value: 'Altitude',
      },
    ])
  )
}

describe('Gn4PlatformService', () => {
  let service: Gn4PlatformService
  let meApiService: MeApiService
  let toolsApiService: ToolsApiService
  let registriesApiService: RegistriesApiService

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
      ],
    })
    service = TestBed.inject(Gn4PlatformService)
    meApiService = TestBed.inject(MeApiService)
    toolsApiService = TestBed.inject(ToolsApiService)
    registriesApiService = TestBed.inject(RegistriesApiService)
  })

  it('creates', () => {
    expect(service).toBeTruthy()
  })

  it('fetches version from settings', async () => {
    geonetworkVersion = '4.2.0'
    const version = await firstValueFrom(service.getApiVersion())
    expect(version).toEqual('4.2.0')
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
  })
  describe('#getThesaurusByLang', () => {
    it('calls api service ', async () => {
      service.getThesaurusByLang('inspire', 'fre')
      expect(registriesApiService.searchKeywords).toHaveBeenCalledWith(
        null,
        'fre',
        1000,
        0,
        null,
        ['inspire']
      )
    })
    it('returns mapped thesaurus ', async () => {
      const thesaurusDomain = await lastValueFrom(
        service.getThesaurusByLang('inspire', 'fre')
      )
      expect(thesaurusDomain).toEqual([
        { key: 'http://inspire.ec.europa.eu/theme/ad', label: 'Adresses' },
        { key: 'http://inspire.ec.europa.eu/theme/el', label: 'Altitude' },
      ])
    })
  })
})
