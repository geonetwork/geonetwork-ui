import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import { TestBed } from '@angular/core/testing'
import { TranslateService } from '@ngx-translate/core'
import { MetadataUrlService } from './metadata-url.service'
import { Configuration } from '@geonetwork-ui/data-access/gn4'

setupZoneTestEnv()

const translateServiceMock = {
  currentLang: 'en',
}
describe('MetadataUrlService', () => {
  let service: MetadataUrlService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: Configuration,
          useValue: new Configuration({ basePath: '/geonetwork/srv/api' }),
        },
      ],
    })
    service = TestBed.inject(MetadataUrlService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('#getUrl', () => {
    const uuid = `500b154c-f99b-4235-97c5-7ef48dfc67d5`
    let apiPath
    describe('when remote api path', () => {
      beforeEach(() => {
        apiPath = 'https://apps.titellus.net/geonetwork/srv/api'
      })
      it('link to external gn metadata ui', () => {
        const url = service.getUrl(uuid, apiPath)
        expect(url).toBe(
          'https://apps.titellus.net/geonetwork/srv/api/../eng/catalog.search#/metadata/500b154c-f99b-4235-97c5-7ef48dfc67d5'
        )
      })
    })
    describe('when no api path', () => {
      it('link to /geonetwork metadata ui', () => {
        const url = service.getUrl(uuid)
        expect(url).toBe(
          '/geonetwork/srv/api/../eng/catalog.search#/metadata/500b154c-f99b-4235-97c5-7ef48dfc67d5'
        )
      })
    })
  })
})
