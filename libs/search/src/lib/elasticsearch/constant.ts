export enum ElasticsearchMetadataModels {
  SUMMARY,
  BRIEF,
  FULL,
}

export const ES_SOURCE_SUMMARY = [
  'uuid',
  'id',
  'title',
  'resource*',
  'resourceTitleObject',
  'resourceAbstractObject',
  'overview',
  'logo',
  'codelist_status_text',
]

export const ES_SOURCE_BRIEF = [
  ...ES_SOURCE_SUMMARY,
  'resourceTypeObject',
  'Org',
  'link',
]

export const ElasticSearchSources = {
  [ElasticsearchMetadataModels.SUMMARY]: ES_SOURCE_SUMMARY,
  [ElasticsearchMetadataModels.BRIEF]: ES_SOURCE_BRIEF,
}
