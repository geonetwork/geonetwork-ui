export interface SearchParams {
  any?: string
}

export interface RecordSimple {
  title: string
  abstract: string
  url: string
  thumbnailUrl: string
}

export interface SearchState {
  params: SearchParams
  sortBy?: string
  results: RecordSimple[]
  loadingMore: boolean
}

export interface RecordMetric {
  value: string
  recordCount: number
}

export const RESULTS_PAGE_SIZE = 10
