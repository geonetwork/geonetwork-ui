import { TestBed } from '@angular/core/testing'
import { GravatarService } from './gravatar.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Gn4SettingsService } from '../settings/gn4-settings.service'
import { BehaviorSubject, firstValueFrom } from 'rxjs'

class Gn4SettingsServiceMock {
  identicon$ = new BehaviorSubject('404')
}

describe('GravatarService', () => {
  let service: GravatarService
  let settingsService: Gn4SettingsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Gn4SettingsService, useClass: Gn4SettingsServiceMock },
      ],
    })
    service = TestBed.inject(GravatarService)
    settingsService = TestBed.inject(Gn4SettingsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('#getProfileIcon', () => {
    it('returns correct Url without data', async () => {
      const icon = await firstValueFrom(service.getProfileIcon(''))
      expect(icon).toEqual('https://www.gravatar.com/avatar/?d=404')
    })
    it('returns correct Url with data but without placeholder', async () => {
      const icon = await firstValueFrom(service.getProfileIcon('abc'))
      expect(icon).toEqual('https://www.gravatar.com/avatar/abc?d=404')
    })
  })
  describe('#getPlaceholder', () => {
    it('returns url with identicon value, without hash', async () => {
      const placeholder = await firstValueFrom(service.getPlaceholder())
      expect(placeholder).toEqual('https://www.gravatar.com/avatar/?d=404')
    })
    it('returns placeholder to be mp if no identicon value', async () => {
      settingsService.identicon$.next('')
      const placeholder = await firstValueFrom(service.getPlaceholder())
      expect(placeholder).toEqual('https://www.gravatar.com/avatar/?d=mp')
    })
  })
  describe('#getProfileIconUrl', () => {
    it('returns url with identicon value, without hash', async () => {
      const placeholder = await service.getProfileIconUrl('12345')
      expect(placeholder).toEqual('https://www.gravatar.com/avatar/12345?d=404')
    })
    it('returns placeholder to be mp if no identicon value', async () => {
      settingsService.identicon$.next('')
      const placeholder = await service.getProfileIconUrl('12345')
      expect(placeholder).toEqual('https://www.gravatar.com/avatar/12345?d=mp')
    })
  })
})
