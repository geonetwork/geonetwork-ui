import { EditorField, EditorFieldValue, EditorSection } from '../models'

export type SaveRecordError = string

export interface EditorFieldWithValue {
  config: EditorField
  value: EditorFieldValue
}

export type EditorSectionWithValues = EditorSection & {
  fieldsWithValues: EditorFieldWithValue[]
}
