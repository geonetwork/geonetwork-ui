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
  'linkProtocol',
  'contact.organisation',
]

export const ES_SOURCE_BRIEF = [
  ...ES_SOURCE_SUMMARY,
  'resourceTypeObject',
  'Org',
]

export const ElasticSearchSources = {
  [ElasticsearchMetadataModels.SUMMARY]: ES_SOURCE_SUMMARY,
  [ElasticsearchMetadataModels.BRIEF]: ES_SOURCE_BRIEF,
}

export const ES_QUERY_STRING_FIELDS = [
  'resourceTitleObject.*^5',
  'tag.*^4',
  'resourceAbstractObject.*^3',
  'lineageObject.*^2',
  'any',
]
