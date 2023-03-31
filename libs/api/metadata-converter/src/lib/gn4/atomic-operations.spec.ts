import { getLinkType } from './atomic-operations'
import { LINK_FIXTURES } from '@geonetwork-ui/util/types/metadata/gn4/metadata-links.fixtures'
import { Link } from '@geonetwork-ui/util/types/metadata'

let links: Record<string, Link>
describe('atomic operations', () => {
  beforeAll(() => {
    links = LINK_FIXTURES()
  })
  describe('getLinkType', () => {
    it('correctly detects the fixtures types', () => {
      const linkTypes = Object.keys(links)
        .map((key) => links[key])
        .map((fixture) => getLinkType(fixture.url, fixture.protocol))
      expect(linkTypes).toStrictEqual([
        'other',
        'other',
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
        'other',
        'link',
        'download',
      ])
    })
  })
})
