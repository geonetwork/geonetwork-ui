import { SortByField } from './search.model'

export const SortByEnum: Record<string, SortByField> = {
  POPULARITY: ['desc', 'userSavedCount'],
  RELEVANCY: ['desc', '_score'],
  QUALITY_SCORE: ['desc', 'qualityScore'],
  RESOURCE_DATES: [
    ['desc', 'revisionDateForResource'],
    ['desc', 'publicationDateForResource'],
    ['desc', 'creationDateForResource'],
  ],
}
