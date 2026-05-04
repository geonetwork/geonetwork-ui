import { InjectionToken } from '@angular/core'

export interface EditorSettings {
  /** When true, the auto-save draft system is completely disabled. Default: false
   *  This setting primarily targets external apps using the lib
   *  and does not affect the UI of the gn-ui metadata editor app.
   */
  disableDraft?: boolean
}

export const EDITOR_SETTINGS = new InjectionToken<EditorSettings>(
  'EDITOR_SETTINGS',
  { factory: () => ({}) }
)
