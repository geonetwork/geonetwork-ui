import { RecordStatus } from '@geonetwork-ui/common/domain/model/record'

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
      return 'planned'
    case 'required':
      return 'required'
    case 'underDevelopment':
    default:
      return 'under_development'
  }
}
