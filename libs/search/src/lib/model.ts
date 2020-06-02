export interface SearchParams {
  any?: string
}

export interface RecordSimple {
  name: string;
  abstract: string;
  url: string;
  thumbnailUrl: string;
}

export interface SearchState {
  params: SearchParams
  sortBy?: string
  results: RecordSimple[]
  loadingMore: boolean
}

export const RESULTS_PAGE_SIZE = 10
