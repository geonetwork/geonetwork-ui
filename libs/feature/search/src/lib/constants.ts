import { FieldName } from '@geonetwork-ui/common/domain/model/search'

export const DEFAULT_PAGE_SIZE = 10

export const FIELDS_SUMMARY: FieldName[] = [
  'uuid',
  'id',
  'title',
  'resource*',
  'resourceTitleObject',
  'resourceAbstractObject',
  'overview',
  'logo',
  'codelist_status_text',
  'link',
  'linkProtocol',
  'contactForResource*.organisation*',
  'contact*.organisation*',
  'contact*.email',
  'userSavedCount',
  'cl_topic',
  'cl_maintenanceAndUpdateFrequency',
  'MD_LegalConstraints*Object',
  'qualityScore',
  'allKeywords',
  'recordLink',
]

export const FIELDS_BRIEF: FieldName[] = [
  ...FIELDS_SUMMARY,
  'resourceTypeObject',
  'Org*',
]

export const QUERY_FIELDS: FieldName[] = [
  'resourceTitleObject.${searchLang}^5',
  'tag.${searchLang}^4',
  'resourceAbstractObject.${searchLang}^3',
  'lineageObject.${searchLang}^2',
  'any.${searchLang}',
  'uuid',
]
