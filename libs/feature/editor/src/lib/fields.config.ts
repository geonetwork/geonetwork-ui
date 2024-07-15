import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { EditorFieldsConfig } from './models/fields.model'

export const DEFAULT_FIELDS: EditorFieldsConfig = [
  {
    model: 'title',
    formFieldConfig: {
      labelKey: marker('editor.record.form.metadata.title'),
      type: 'text',
    },
  },
  {
    model: 'abstract',
    formFieldConfig: {
      labelKey: marker('editor.record.form.abstract'),
      type: 'rich',
    },
  },
  {
    model: 'uniqueIdentifier',
    formFieldConfig: {
      labelKey: marker('editor.record.form.unique.identifier'),
      type: 'text',
      locked: true,
    },
  },
  {
    model: 'recordUpdated',
    formFieldConfig: {
      labelKey: marker('editor.record.form.record.updated'),
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
  {
    model: 'temporalExtents',
    formFieldConfig: {
      labelKey: marker('editor.record.form.temporalExtents'),
      type: 'list',
    },
  },
  {
    model: 'keywords',
    formFieldConfig: {
      labelKey: marker('editor.record.form.keywords'),
      type: 'list',
    },
  },
]
