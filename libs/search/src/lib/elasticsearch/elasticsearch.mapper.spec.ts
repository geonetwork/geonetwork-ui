import { TestBed } from '@angular/core/testing'
import { MetadataUrlService } from '@lib/common'
import { ElasticsearchMapper, hitsOnly } from '@lib/search'

const metadataUrlServiceMock = {
  translate: undefined,
  getUrl: () => 'url',
}
describe('ElasticsearchMapper', () => {
  let service: ElasticsearchMapper

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MetadataUrlService,
          useValue: metadataUrlServiceMock,
        },
      ],
    })
    service = TestBed.inject(ElasticsearchMapper)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#toRecordSummaries', () => {
    it('Output records', () => {
      const hit = hitsOnly.hits.hits[0]
      const summary = service.toRecordSummaries(hitsOnly, 'path')
      expect(summary).toEqual([
        {
          abstract: 'The grid is based on proposal ',
          downloadable: false,
          id: '12456',
          logoUrl:
            '/geonetwork/images/logos/e6826118-7280-4638-b1f9-d898e9efe281.png',
          metadataUrl: 'url',
          thumbnailUrl: 'data:image/png;base64, ',
          title: 'EEA reference grid for Germany (10km), May 2013',
          uuid: '20e9e1a1-83c1-4f13-89ef-c19767d6ee18f',
          viewable: false,
        },
        {
          abstract: 'Reference layer of the rivers sensitive areas, ',
          downloadable: false,
          id: '12442',
          logoUrl:
            '/geonetwork/images/logos/e6826118-7280-4638-b1f9-d898e9efe281.png',
          metadataUrl: 'url',
          thumbnailUrl: 'data:image/png;base64, ',
          title:
            'Urban Waste Water Treatment Directive, Sensitive areas - rivers reported under UWWTD data call 2015, Nov. 2017',
          uuid: '5b35f06e-8c6b-4907-b8f4-39541d170360',
          viewable: false,
        },
      ])
    })
  })

  describe('#toRecordSummary', () => {
    let hit
    beforeEach(() => {
      hit = hitsOnly.hits.hits[0]
    })

    describe('overview', () => {
      it('when data', () => {
        const summary = service.toRecordSummary(hit, '')
        expect(summary.thumbnailUrl).toBe('data:image/png;base64, ')
      })
      it('when no data and url', () => {
        hit._source.overview = {
          url: 'imgUrl',
        }
        const summary = service.toRecordSummary(hit, '')
        expect(summary.thumbnailUrl).toBe('imgUrl')
      })
      it('when no data no url', () => {
        hit._source.overview = {}
        const summary = service.toRecordSummary(hit, '')
        expect(summary.thumbnailUrl).toBe('')
      })
    })
  })
})
