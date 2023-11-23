import { RecordStatus } from 'libs/common/domain/src/lib/model/record'

export function getStatusFromStatusCode(statusCode: string): RecordStatus {
  switch (statusCode) {
    case 'completed':
      return 'completed'
    case 'historicalArchive':
      return 'removed'
    case 'obsolete':
      return 'deprecated'
    case 'onGoing':
      return 'ongoing'
    case 'planned':
    case 'required':
    case 'underDevelopment':
    default:
      return 'under_development'
  }
}
