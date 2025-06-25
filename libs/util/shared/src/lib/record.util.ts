import {
  BaseRecord,
  CatalogRecord,
  Constraint,
  DatasetDownloadDistribution,
  DatasetServiceDistribution,
  DatasetSpatialExtent,
  Keyword,
  LanguageCode,
  OnlineLinkResource,
  Organization,
  ServiceEndpoint,
} from '@geonetwork-ui/common/domain/model/record'

type TranslatedRecordObjects =
  | BaseRecord
  | Constraint
  | Keyword
  | DatasetServiceDistribution
  | DatasetDownloadDistribution
  | OnlineLinkResource
  | ServiceEndpoint
  | DatasetSpatialExtent
  | Organization

export function updateLanguages<T extends CatalogRecord>(
  record: T,
  defaultLanguage: LanguageCode,
  otherLanguages: LanguageCode[]
): T {
  function updateFieldTranslations<T extends TranslatedRecordObjects>(
    target: T,
    fieldName: string
  ): T {
    const fieldTranslations = {}
    for (const lang of otherLanguages) {
      const prevValue =
        record.defaultLanguage === lang
          ? target[fieldName]
          : target.translations?.[fieldName]?.[lang]
      fieldTranslations[lang] = prevValue ?? ''
    }
    const defaultPrevValue =
      record.defaultLanguage === defaultLanguage
        ? target[fieldName]
        : target.translations?.[fieldName]?.[defaultLanguage]
    return {
      ...target,
      [fieldName]: defaultPrevValue ?? '',
      translations: {
        ...target.translations,
        [fieldName]: fieldTranslations,
      },
    }
  }
  function updateTranslations<T extends TranslatedRecordObjects>(
    target: T,
    fieldNames: string[]
  ): T {
    let result: T = target
    for (const field of fieldNames) {
      result = updateFieldTranslations(result, field)
    }
    return result
  }

  const updatedRecord = updateTranslations(record, [
    'title',
    'abstract',
    'lineage',
  ])
  updatedRecord.keywords = updatedRecord.keywords.map((k) =>
    updateTranslations(k, ['label', 'description'])
  )
  updatedRecord.onlineResources = updatedRecord.onlineResources.map((o) =>
    updateTranslations(o, ['name', 'description'])
  )
  updatedRecord.licenses = updatedRecord.licenses.map((l) =>
    updateTranslations(l, ['text'])
  )
  updatedRecord.legalConstraints = updatedRecord.legalConstraints.map((c) =>
    updateTranslations(c, ['text'])
  )
  updatedRecord.securityConstraints = updatedRecord.securityConstraints.map(
    (c) => updateTranslations(c, ['text'])
  )
  updatedRecord.otherConstraints = updatedRecord.otherConstraints.map((c) =>
    updateTranslations(c, ['text'])
  )
  updatedRecord.contacts = updatedRecord.contacts.map((c) => ({
    ...c,
    organization: updateTranslations(c.organization, ['name']),
  }))
  updatedRecord.contactsForResource = updatedRecord.contactsForResource.map(
    (c) => ({
      ...c,
      organization: updateTranslations(c.organization, ['name']),
    })
  )
  updatedRecord.ownerOrganization = updateTranslations(
    updatedRecord.ownerOrganization,
    ['name']
  )

  if (updatedRecord.kind === 'dataset') {
    updatedRecord.spatialExtents = updatedRecord.spatialExtents.map((e) =>
      updateTranslations(e, ['description'])
    )
  }

  updatedRecord.defaultLanguage = defaultLanguage
  updatedRecord.otherLanguages = otherLanguages
  return updatedRecord
}
