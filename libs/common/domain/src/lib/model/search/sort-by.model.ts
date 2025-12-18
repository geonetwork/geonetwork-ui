import { SortByField } from './search.model.js'

export const SortByEnum: Record<string, SortByField> = {
  CREATE_DATE: ['desc', 'createDate'],
  POPULARITY: ['desc', 'userSavedCount'],
  RELEVANCY: ['desc', '_score'],
  QUALITY_SCORE: ['desc', 'qualityScore'],
  CHANGE_DATE: ['desc', 'changeDate'],
  RESOURCE_DATES: [
    ['desc', 'revisionDateForResource'],
    ['desc', 'publicationDateForResource'],
    ['desc', 'creationDateForResource'],
  ],
}
