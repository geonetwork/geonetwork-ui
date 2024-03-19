import { FormFieldConfig } from '@geonetwork-ui/ui/inputs'

export interface FormField {
  config: FormFieldConfig
  value: string | number | boolean | unknown
}
