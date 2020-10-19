import { TestBed } from '@angular/core/testing'

import { CommonService } from './common.service'
import { of } from 'rxjs'
import { SiteApiService } from '@lib/gn-api'

const siteInfoMock = {
  get4: () =>
    of({
      'system/site/name': 'GeoNetwork 4',
      'system/site/organization': 'titellus',
      'system/site/siteId': '04fe602b-fc46-4e6b-ac5a-138c6153eceb',
      'system/platform/version': '4.0.0',
      'system/platform/subVersion': '0',
    }),
}

describe('CommonService', () => {
  let service: CommonService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommonService,
        {
          provide: SiteApiService,
          useValue: siteInfoMock,
        },
      ],
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
