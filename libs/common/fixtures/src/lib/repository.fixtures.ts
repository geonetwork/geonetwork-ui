import { SearchResults } from '@geonetwork-ui/common/domain/model/search'
import { datasetRecordsFixture } from './records.fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export const searchResultsFixture = (): SearchResults => ({
  count: 123,
  records: datasetRecordsFixture() as CatalogRecord[],
})
