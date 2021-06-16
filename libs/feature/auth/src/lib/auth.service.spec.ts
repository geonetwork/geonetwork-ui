import { AuthService } from './auth.service'
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
    service = new AuthService(meApiMock)
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
