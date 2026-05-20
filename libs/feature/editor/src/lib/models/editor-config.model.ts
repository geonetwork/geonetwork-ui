import { CatalogRecordKeys } from '@geonetwork-ui/common/domain/model/record'

// Expressions should be enclosed in `${}` to be recognized as such
// eg. ${dateNow()}
export type EditorFieldExpression = `$\{${string}}`

export type EditorFieldValue = string | number | boolean | unknown

export interface FormFieldConfig {
  labelKey?: string
  hintKey?: string
  tooltipKey?: string
  required?: boolean
  invalid?: boolean
  invalidHintKey?: string
}

// Specifiers let us use specific components
// This is used for instance to target only certain online resources in a field
type OnlineLinkResourceSpecifier = `onlineResourceType:link`
type DatasetDistributionsSpecifier = `onlineResourceType:!link`
export type FieldModelSpecifier =
  | OnlineLinkResourceSpecifier
  | DatasetDistributionsSpecifier

export type FormFieldComponentName =
  | 'form-field-constraints-shortcuts'
  | 'form-field-spatial-toggle'

export interface EditorFieldIdentification {
  // name of the target field in the record; will not change the record directly if not defined
  model?: CatalogRecordKeys
  modelSpecifier?: FieldModelSpecifier

  // if no model is given, a component can be shown instead
  componentName?: FormFieldComponentName
}

export interface EditorField extends EditorFieldIdentification {
  // configuration of the form field used as presentation
  formFieldConfig: FormFieldConfig

  // grid column span; if unspecified, full width will be used
  gridColumnSpan?: number

  // a hidden field won't show but can still be used to modify the record
  // FIXME: currently this is redundant with an absence of formFieldConfig but necessary for clarity
  hidden?: boolean

  // the result of this expression will replace the field value on save
  onSaveProcess?: EditorFieldExpression
}

export interface EditorSection {
  labelKey?: string
  descriptionKey?: string
  hidden: boolean
  fields: EditorField[]
}

export interface EditorFieldPage {
  labelKey?: string
  sections: EditorSection[]
}

export interface EditorConfig {
  pages: EditorFieldPage[]
}

export interface EditorFieldState {
  model: string
  value: EditorFieldValue
}
