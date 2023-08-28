import { TestBed } from '@angular/core/testing'

import { GravatarService } from './gravatar.service'

describe('GravatarService', () => {
  let service: GravatarService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(GravatarService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  it('returns correct Url without data', () => {
    expect(service.getUserProfileIconFromHash('', '')).toEqual(
      'https://www.gravatar.com/avatar/?d=mp'
    )
  })
  it('returns correct Url with data but without placeholder', () => {
    expect(service.getUserProfileIconFromHash('abc', '')).toEqual(
      'https://www.gravatar.com/avatar/abc?d=mp'
    )
  })
  it('returns correct Url with data and placeholder', () => {
    expect(service.getUserProfileIconFromHash('abc', 'icon')).toEqual(
      'https://www.gravatar.com/avatar/abc?d=icon'
    )
  })
  it('returns correct Url with removing gravatar', () => {
    expect(service.getUserProfileIconFromHash('abc', 'gravatar:icon')).toEqual(
      'https://www.gravatar.com/avatar/abc?d=icon'
    )
  })
})
