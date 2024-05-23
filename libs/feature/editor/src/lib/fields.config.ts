import { marker } from '@biesbjerg/ngx-translate-extract-marker'
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
  {
    model: 'licenses',
    formFieldConfig: {
      labelKey: marker('editor.record.form.license'),
      type: 'list',
    },
  },
  {
    model: 'resourceUpdated',
    formFieldConfig: {
      labelKey: marker('editor.record.form.resourceUpdated'),
      type: 'date',
    },
  },
  {
    model: 'updateFrequency',
    formFieldConfig: {
      labelKey: marker('editor.record.form.updateFrequency'),
      type: 'text',
    },
  },
]
