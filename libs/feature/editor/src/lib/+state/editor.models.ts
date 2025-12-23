import {
  EditorField,
  EditorFieldValue,
  EditorSection,
} from '../models/index.js'

export type SaveRecordError = Error

export interface EditorFieldWithValue {
  config: EditorField
  value: EditorFieldValue
}

export type EditorSectionWithValues = EditorSection & {
  fieldsWithValues: EditorFieldWithValue[]
}
