import { TestBed } from '@angular/core/testing'

import { GravatarService } from './gravatar.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Gn4SettingsService } from '@geonetwork-ui/api/repository/gn4'
import { BehaviorSubject } from 'rxjs'

class Gn4SettingsServiceMock {
  identicon$ = new BehaviorSubject('404')
}

describe('GravatarService', () => {
  let service: GravatarService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Gn4SettingsService, useClass: Gn4SettingsServiceMock },
      ],
    })
    service = TestBed.inject(GravatarService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  it('returns correct Url without data', () => {
    expect(service.getProfileIcon('')).toEqual(
      'https://www.gravatar.com/avatar/?d=404'
    )
  })
  it('returns correct Url with data but without placeholder', () => {
    expect(service.getProfileIcon('abc')).toEqual(
      'https://www.gravatar.com/avatar/abc?d=404'
    )
  })
  it('returns plaholder to be mp', () => {
    expect(service.placeholder).toEqual('https://www.gravatar.com/avatar/?d=mp')
  })
})
