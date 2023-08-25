import { deepFreeze } from './utils/freeze'
import { SearchResults } from '@geonetwork-ui/common/domain/search'
import { DATASET_RECORDS } from './records.fixtures'

export const SAMPLE_SEARCH_RESULTS: SearchResults = deepFreeze({
  count: 123,
  records: DATASET_RECORDS,
})
