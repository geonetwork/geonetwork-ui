import { SearchResults } from '@geonetwork-ui/common/domain/model/search/index.js'
import { datasetRecordsFixture } from './records.fixtures.js'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record/index.js'

export const searchResultsFixture = (): SearchResults => ({
  count: 123,
  records: datasetRecordsFixture() as CatalogRecord[],
})
