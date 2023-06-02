import { TestBed } from '@angular/core/testing'
import { LINK_FIXTURES } from '@geonetwork-ui/util/shared/fixtures'
import { ElasticsearchFieldMapper } from './elasticsearch.field.mapper'
import { MetadataUrlService } from '../service/metadata-url.service'

class MetadataUrlServiceMock {
  translate = undefined
  getUrl = () => 'url'
}

describe('ElasticsearchFieldMapper', () => {
  let service: ElasticsearchFieldMapper

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MetadataUrlService, useClass: MetadataUrlServiceMock },
      ],
    })
    service = TestBed.inject(ElasticsearchFieldMapper)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('methods', () => {
    beforeEach(() => {
      service = TestBed.inject(ElasticsearchFieldMapper)
    })
    describe('#getLinkType', () => {
      it('correctly detects the fixtures types', () => {
        Object.keys(LINK_FIXTURES)
          .map((key) => LINK_FIXTURES[key])
          .forEach((fixture) =>
            expect(service.getLinkType(fixture.url, fixture.protocol)).toBe(
              fixture.type
            )
          )
      })
    })
  })
})
