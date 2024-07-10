import { EditorConfig, EditorField, EditorSection } from '../models'

export const EDITOR_CONFIG = (): EditorConfig => ({
  pages: [
    {
      labelKey: 'Resource description',
      sections: [EDITOR_SECTION_ABOUT()],
    },
    {
      labelKey: 'Resources',
      sections: [EDITOR_SECTION_CLASSIFICATION()],
    },
    {
      labelKey: 'Access and contact',
      sections: [
        EDITOR_SECTION_USE_AND_ACCESS_CONDITIONS(),
        EDITOR_SECTION_DATA_MANAGER(),
      ],
    },
  ],
})

export const EDITOR_SECTION_ABOUT = (): EditorSection => ({
  labelKey: 'About the resource',
  descriptionKey: 'This section describes the resource.',
  hidden: false,
  fields: [
    EDITOR_FIELD_TITLE(),
    EDITOR_FIELD_ABSTRACT(),
    EDITOR_FIELD_RESOURCE_UPDATED(),
    EDITOR_FIELD_RECORD_UPDATED(),
    EDITOR_FIELD_UPDATE_FREQUENCY(),
    EDITOR_FIELD_TEMPORAL_EXTENTS(),
  ],
})

export const EDITOR_SECTION_DATA_MANAGER = (): EditorSection => ({
  labelKey: 'Data manager',
  descriptionKey: '',
  hidden: false,
  fields: [],
})

export const EDITOR_SECTION_USE_AND_ACCESS_CONDITIONS = (): EditorSection => ({
  labelKey: 'Data manager',
  descriptionKey: '',
  hidden: false,
  fields: [EDITOR_FIELD_LICENSE()],
})

export const EDITOR_SECTION_CLASSIFICATION = (): EditorSection => ({
  labelKey: 'Classification',
  descriptionKey: 'The classification has an impact on the access to the data.',
  hidden: false,
  fields: [EDITOR_FIELD_KEYWORDS(), EDITOR_FIELD_UNIQUE_IDENTIFIER()],
})

export const EDITOR_FIELD_TITLE = (): EditorField => ({
  model: 'title',
  hidden: false,
  value: 'Accroches vélos MEL',
  formFieldConfig: {
    labelKey: 'editor.record.form.field.title',
  },
})

export const EDITOR_FIELD_ABSTRACT = (): EditorField => ({
  model: 'abstract',
  hidden: false,
  value: 'Abstract',
  formFieldConfig: {
    labelKey: 'editor.record.form.field.abstract',
  },
})

export const EDITOR_FIELD_RESOURCE_UPDATED = (): EditorField => ({
  model: 'resourceUpdated',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.resourceUpdated',
  },
})

export const EDITOR_FIELD_RECORD_UPDATED = (): EditorField => ({
  model: 'recordUpdated',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.recordUpdated',
    locked: true,
  },
  value: '2024-07-16T05:18:53.000Z',
  onSaveProcess: '${dateNow()}',
})

export const EDITOR_FIELD_UPDATE_FREQUENCY = (): EditorField => ({
  model: 'updateFrequency',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.updateFrequency',
  },
  value: 'unknown',
})

export const EDITOR_FIELD_TEMPORAL_EXTENTS = (): EditorField => ({
  model: 'temporalExtents',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.temporalExtents',
  },
  value: [],
})

export const EDITOR_FIELD_SPATIAL_EXTENTS = (): EditorField => ({
  model: 'spatialExtents',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.spatialExtents',
  },
})

export const EDITOR_FIELD_KEYWORDS = (): EditorField => ({
  model: 'keywords',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.keywords',
  },
})

export const EDITOR_FIELD_UNIQUE_IDENTIFIER = (): EditorField => ({
  model: 'uniqueIdentifier',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.uniqueIdentifier',
    locked: true,
  },
  value: 'accroche_velos',
})

export const EDITOR_FIELD_LICENSE = (): EditorField => ({
  model: 'licenses',
  hidden: false,
  formFieldConfig: {
    labelKey: 'editor.record.form.field.license',
    locked: true,
  },
})

export const EDITOR_FIELDS = (): EditorField[] => [
  EDITOR_FIELD_TITLE(),
  EDITOR_FIELD_ABSTRACT(),
  EDITOR_FIELD_RESOURCE_UPDATED(),
  EDITOR_FIELD_RECORD_UPDATED(),
  EDITOR_FIELD_UPDATE_FREQUENCY(),
  EDITOR_FIELD_TEMPORAL_EXTENTS(),
  EDITOR_FIELD_SPATIAL_EXTENTS(),
  EDITOR_FIELD_KEYWORDS(),
  EDITOR_FIELD_UNIQUE_IDENTIFIER(),
]
