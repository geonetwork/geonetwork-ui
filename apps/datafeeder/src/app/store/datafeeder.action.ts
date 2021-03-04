import { Action } from '@ngrx/store'
import {
  PublishJobStatusApiModel,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'

export const SET_UPLOAD = '[datafeeder] Set upload status'
export const SET_PUBLICATION = '[datafeeder] Set publication status'

export class SetUpload implements Action {
  readonly type = SET_UPLOAD
  constructor(public payload: UploadJobStatusApiModel) {}
}

export class SetPublication implements Action {
  readonly type = SET_PUBLICATION
  constructor(public payload: PublishJobStatusApiModel) {}
}

export type DatafeederAction = SetUpload | SetPublication
