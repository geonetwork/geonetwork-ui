import { WizardFieldType } from './wizard-field.type'

export interface WizardFieldModel {
  id: string
  label: string
  icon: string
  type: WizardFieldType
  options?: any
  required?: boolean
}
