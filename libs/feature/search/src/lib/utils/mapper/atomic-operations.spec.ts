import { LINK_FIXTURES } from '@geonetwork-ui/util/shared/fixtures'
import { getLinkType } from './atomic-operations'

describe('atomic operations', () => {
  describe('getLinkType', () => {
    it('correctly detects the fixtures types', () => {
      Object.keys(LINK_FIXTURES)
        .map((key) => LINK_FIXTURES[key])
        .forEach((fixture) =>
          expect(getLinkType(fixture.url, fixture.protocol)).toBe(fixture.type)
        )
    })
  })
})
