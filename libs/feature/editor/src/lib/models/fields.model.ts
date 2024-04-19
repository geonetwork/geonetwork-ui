import { FormFieldConfig } from '../components/record-form/form-field'

// Expressions should be enclosed in `${}` to be recognized as such
// eg. ${dateNow()}
export type EditorFieldExpression = `$\{${string}}`

export interface EditorFieldConfig {
  // configuration of the form field used as presentation; optional, nothing shown if not defined
  formFieldConfig?: FormFieldConfig

  // name of the target field in the record; will not change the record directly if not defined
  model?: string

  // a hidden field won't show but can still be used to modify the record
  // FIXME: currently this is redundant with an absence of formFieldConfig but necessary for clarity
  hidden?: boolean

  // the result of this expression will replace the field value on save
  onSaveProcess?: EditorFieldExpression
}

export type EditorFieldsConfig = EditorFieldConfig[]

export type EditorFieldValue = string | number | boolean | unknown

export interface EditorFieldState {
  config: EditorFieldConfig
  value: string | number | boolean | unknown
}
