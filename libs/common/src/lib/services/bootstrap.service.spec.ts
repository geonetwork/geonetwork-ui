import { TestBed } from '@angular/core/testing'

import { BootstrapService } from './bootstrap.service'
import { of } from 'rxjs'
import { SITE_FIXTURES, SiteApiService } from '@lib/gn-api'

const siteInfoMock = {
  get4: jest.fn(() => of(SITE_FIXTURES)),
}

describe('CommonService', () => {
  let service: BootstrapService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SiteApiService,
          useValue: siteInfoMock,
        },
      ],
    })
    service = TestBed.inject(BootstrapService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
