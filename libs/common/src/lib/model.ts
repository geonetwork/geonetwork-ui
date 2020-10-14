export interface SearchParams {
  any?: string
}

export interface RecordSimple {
  title: string
  abstract: string
  url: string
  thumbnailUrl: string
}

export interface RecordMetric {
  value: string
  recordCount: number
}

export enum ResultsListLayout {
  'BLOCK' = 'BLOCK',
  'LIST' = 'LIST',
  'LIST-TEXT' = 'LIST-TEXT',
}

export const RESULTS_PAGE_SIZE = 10
