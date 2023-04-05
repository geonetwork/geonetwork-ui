import { RecordStatus } from '@geonetwork-ui/util/types/metadata'

export function getStatusFromStatusCode(statusCode: string): RecordStatus {
  switch (statusCode) {
    case 'completed':
      return RecordStatus.COMPLETED
    case 'historicalArchive':
      return RecordStatus.REMOVED
    case 'obsolete':
      return RecordStatus.DEPRECATED
    case 'onGoing':
      return RecordStatus.ON_GOING
    case 'planned':
    case 'required':
    case 'underDevelopment':
    default:
      return RecordStatus.UNDER_DEVELOPMENT
  }
}
