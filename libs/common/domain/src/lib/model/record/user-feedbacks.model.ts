export interface UserFeedback {
  uuid: string
  comment: string
  metadataUUID: string
  authorUserId: string
  authorName: string
  authorEmail: string
  published: boolean
  parentUuid?: string
  date: Date
}

export interface UserFeedbackViewModel extends UserFeedback {
  avatarUrl: string
}
