type BaseFormFieldType =
  | 'text'
  | 'number'
  | 'rich'
  | 'date'
  | 'list'
  | 'spatial_extent'
  | 'temporal_extent'
  | 'url'
  | 'file'
  | 'toggle'

type AllFormFieldType = BaseFormFieldType | 'object' | 'array'

interface FormFieldConfigBase {
  model?: string
  type: AllFormFieldType
  labelKey: string
  hintKey?: string
  tooltipKey?: string
  required?: boolean
  locked?: boolean
  invalid?: boolean
  invalidHintKey?: string
}

export interface FormFieldConfigSimple extends FormFieldConfigBase {
  type: BaseFormFieldType
}

export interface FormFieldConfigArray extends FormFieldConfigBase {
  type: 'array'
  items: FormFieldConfig
}

export interface FormFieldConfigObject extends FormFieldConfigBase {
  type: 'object'
  fields: Array<FormFieldConfig>
}

export type FormFieldConfig =
  | FormFieldConfigSimple
  | FormFieldConfigArray
  | FormFieldConfigObject
