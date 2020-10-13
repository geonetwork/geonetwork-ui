import { TestBed } from '@angular/core/testing'
import { AuthService } from './auth.service'
import { MeApiService } from '@lib/gn-api'
import { Subject } from 'rxjs'

describe('AuthService', () => {
  let service: AuthService
  let meApiMock
  let me$

  beforeEach(() => {
    me$ = new Subject()
    meApiMock = {
      getMe: () => me$,
    }

    TestBed.configureTestingModule({
      providers: [
        {
          provide: MeApiService,
          useValue: meApiMock,
        },
      ],
    })
    service = TestBed.inject(AuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#authReady', () => {
    it('emits a value on subscribe after auth was queried', () => {
      let emitted = false
      service.authReady().subscribe(() => (emitted = true))
      me$.next()
      expect(emitted).toBeTruthy()
    })
  })
})
