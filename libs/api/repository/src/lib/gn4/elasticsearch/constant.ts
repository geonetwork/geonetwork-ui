export const ES_SOURCE_SUMMARY = [
  'uuid',
  'id',
  'title',
  'resource*',
  'resourceTitleObject',
  'resourceAbstractObject',
  'overview',
  'logo',
  'link',
  'linkProtocol',
  'contactForResource*.organisation*',
  'contact*.organisation*',
  'contact*.email',
  'userSavedCount',
  'cl_topic',
  'cl_maintenanceAndUpdateFrequency',
  'cl_presentationForm',
  'MD_LegalConstraints*Object',
  'qualityScore',
  'allKeywords',
  'recordLink',
]

export type EsQueryFieldsPriorityType = Record<string, number>
export const ES_QUERY_FIELDS_PRIORITY = {
  'resourceTitleObject.${searchLang}': 5,
  'tag.${searchLang}': 4,
  'resourceAbstractObject.${searchLang}': 3,
  'lineageObject.${searchLang}': 2,
  'any.${searchLang}': 1,
  uuid: 1,
}

// This prefix is part of the category names stored in GeoNetwork: changing it
// would silently drop the flags already set on existing catalogs.
export const RECORD_FLAG_CATEGORY_PREFIX = 'geonetwork-ui-flag:'
