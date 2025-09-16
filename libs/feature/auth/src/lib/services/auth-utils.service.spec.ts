import { TestBed } from '@angular/core/testing'
import { AuthUtilsService } from './auth-utils.service'

describe('AuthUtilsService', () => {
  let service: AuthUtilsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthUtilsService],
    })
    service = TestBed.inject(AuthUtilsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('isAuthDisabled', () => {
    it('should return false when config is not loaded', () => {
      expect(service.isAuthDisabled()).toBe(false)
    })
  })
})
