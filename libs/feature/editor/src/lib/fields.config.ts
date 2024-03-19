import { EditorFieldsConfig } from './models/fields.model'

export const DEFAULT_FIELDS: EditorFieldsConfig = [
  {
    model: 'title',
    formFieldConfig: {
      labelKey: 'Metadata title',
      type: 'text',
    },
  },
  {
    model: 'abstract',
    formFieldConfig: {
      labelKey: 'Abstract',
      type: 'rich',
    },
  },
  {
    model: 'uniqueIdentifier',
    formFieldConfig: {
      labelKey: 'Unique identifier',
      type: 'text',
      locked: true,
    },
  },
  {
    model: 'recordUpdated',
    formFieldConfig: {
      labelKey: 'Record Updated',
      type: 'text',
      locked: true,
    },
    onSaveProcess: '${dateNow()}',
  },
]
