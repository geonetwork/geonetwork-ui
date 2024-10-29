import { SortByField } from './search.model'

export const SortByEnum: Record<string, SortByField> = {
  CREATE_DATE: ['desc', 'createDate'],
  POPULARITY: ['desc', 'userSavedCount'],
  RELEVANCY: ['desc', '_score'],
  QUALITY_SCORE: ['desc', 'qualityScore'],
  CHANGE_DATE: ['desc', 'changeDate'],
}
