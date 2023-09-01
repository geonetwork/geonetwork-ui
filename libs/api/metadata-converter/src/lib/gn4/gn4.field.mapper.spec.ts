import 'jest-preset-angular/setup-jest'
import { TestBed } from '@angular/core/testing'
import { ES_LINK_FIXTURES } from '@geonetwork-ui/common/fixtures'
import { Gn4FieldMapper } from './gn4.field.mapper'
import { MetadataUrlService } from './metadata-url.service'
import { TranslateService } from '@ngx-translate/core'

class MetadataUrlServiceMock {
  translate = undefined
  getUrl = () => 'url'
}

const translateServiceMock = {
  currentLang: 'de',
}

describe('Gn4FieldMapper', () => {
  let service: Gn4FieldMapper

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MetadataUrlService, useClass: MetadataUrlServiceMock },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    })
    service = TestBed.inject(Gn4FieldMapper)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('methods', () => {
    beforeEach(() => {
      service = TestBed.inject(Gn4FieldMapper)
    })
    describe('#getLinkType', () => {
      it('correctly detects the fixtures types', () => {
        const allLinks = Object.keys(ES_LINK_FIXTURES).map(
          (key) => ES_LINK_FIXTURES[key]
        )
        const linkTypes = allLinks.map((fixture) =>
          service.getLinkType(fixture.url, fixture.protocol)
        )
        expect(linkTypes).toStrictEqual([
          'link',
          'link',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'download',
          'service',
          'service',
          'service',
          'service',
          'service',
          'service',
          'service',
          'link',
          'link',
          'download',
        ])
      })
    })
  })
})
