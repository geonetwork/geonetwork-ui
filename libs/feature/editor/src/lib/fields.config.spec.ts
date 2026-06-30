import { INSPIRE_TOPICS } from './fields.config'

// Canonical ISO 19115 gmd:MD_TopicCategoryCode values, as used by the
// GeoNetwork backend. INSPIRE_TOPICS values are written verbatim into the
// metadata XML, so they must match these exactly (see issue #1615).
const ISO_TOPIC_CATEGORY_CODES = [
  'farming',
  'biota',
  'boundaries',
  'climatologyMeteorologyAtmosphere',
  'economy',
  'elevation',
  'environment',
  'geoscientificInformation',
  'health',
  'imageryBaseMapsEarthCover',
  'intelligenceMilitary',
  'inlandWaters',
  'location',
  'oceans',
  'planningCadastre',
  'society',
  'structure',
  'transportation',
  'utilitiesCommunication',
]

describe('INSPIRE_TOPICS', () => {
  it('exposes the same set of values as the ISO MD_TopicCategoryCode codelist', () => {
    expect(INSPIRE_TOPICS.map((topic) => topic.value).sort()).toEqual(
      [...ISO_TOPIC_CATEGORY_CODES].sort()
    )
  })
})
