export const editorConfigFixture = () => ({
  pages: [
    {
      labelKey: 'Resource description',
      sections: [editorSectionAboutFixture()],
    },
    {
      labelKey: 'Resources',
      sections: [editorSectionClassificationFixture()],
    },
    {
      labelKey: 'Access and contact',
      sections: [
        editorSectionUseAndAccessConditionsFixture(),
        editorSectionDataManagerFixture(),
      ],
    },
  ],
})

export const editorSectionAboutFixture = () => ({
  labelKey: 'About the resource',
  descriptionKey: 'This section describes the resource.',
  hidden: false,
  fields: [
    editorFieldTitleFixture(),
    editorFieldAbstractFixture(),
    editorFieldResourceCreatedFixture(),
    editorFieldResourceUpdatedFixture(),
    editorFieldRecordUpdatedFixture(),
    editorFieldUpdateFrequencyFixture(),
    editorFieldTemporalExtentsFixture(),
  ],
})

export const editorSectionDataManagerFixture = () => ({
  labelKey: 'Data manager',
  descriptionKey: '',
  hidden: false,
  fields: [],
})

export const editorSectionUseAndAccessConditionsFixture = () => ({
  labelKey: 'Data manager',
  descriptionKey: '',
  hidden: false,
  fields: [editorFieldLicenseFixture()],
})

export const editorSectionClassificationFixture = () => ({
  labelKey: 'Classification',
  descriptionKey: 'The classification has an impact on the access to the data.',
  hidden: false,
  fields: [editorFieldKeywordsFixture(), editorFieldUniqueIdentifierFixture()],
})

export const editorFieldTitleFixture = () => ({
  model: 'title',
  hidden: false,
  value: 'Accroches vélos MEL',
  formFieldConfig: {
    labelKey: 'editor.record.form.field.title',
  },
})

export const editorFieldAbstractFixture = () => ({
  model: 'abstract',
  hidden: false,
  value: 'Abstract',
  formFieldConfig: {
    labelKey: 'editor.record.form.field.abstract',
  },
})

export const editorFieldResourceCreatedFixture = () => ({
  model: 'resourceCreated',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.resourceCreated',
  },
})

export const editorFieldResourceUpdatedFixture = () => ({
  model: 'resourceUpdated',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.resourceUpdated',
  },
})

export const editorFieldRecordUpdatedFixture = () => ({
  model: 'recordUpdated',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.recordUpdated',
  },
  value: '2024-07-16T05:18:53.000Z',
  onSaveProcess: '${dateNow()}',
})

export const editorFieldUpdateFrequencyFixture = () => ({
  model: 'updateFrequency',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.updateFrequency',
  },
  value: 'unknown',
})

export const editorFieldTemporalExtentsFixture = () => ({
  model: 'temporalExtents',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.temporalExtents',
  },
  value: [],
})

export const editorFieldSpatialExtentsFixture = () => ({
  model: 'spatialExtents',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.spatialExtents',
  },
})

export const editorFieldKeywordsFixture = () => ({
  model: 'keywords',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.keywords',
  },
})

export const editorFieldUniqueIdentifierFixture = () => ({
  model: 'uniqueIdentifier',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.uniqueIdentifier',
  },
  value: 'accroche_velos',
})

export const editorFieldLicenseFixture = () => ({
  model: 'licenses',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.license',
  },
})

export const editorFieldsFixture = () => [
  editorFieldTitleFixture(),
  editorFieldAbstractFixture(),
  editorFieldResourceUpdatedFixture(),
  editorFieldResourceCreatedFixture(),
  editorFieldRecordUpdatedFixture(),
  editorFieldUpdateFrequencyFixture(),
  editorFieldTemporalExtentsFixture(),
  editorFieldSpatialExtentsFixture(),
  editorFieldKeywordsFixture(),
  editorFieldUniqueIdentifierFixture(),
]
