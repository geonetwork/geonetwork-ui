const TRANSLATABLE_GN4_FIELDS = [
  'abstract',
  'constraint',
  'keywords',
  'lineage',
  'onlineResources',
  'spatialExtents',
  'title',
  // TODO, also add these fields in writers
  // 'contact',
  // 'pointOfContact'
  // 'extent'
] as const

export function isFieldTranslatable(fieldName: string) {
  return (TRANSLATABLE_GN4_FIELDS as unknown as string[]).includes(fieldName)
}
