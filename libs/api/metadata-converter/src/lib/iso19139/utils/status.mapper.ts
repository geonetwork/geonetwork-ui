import { RecordStatus } from '@geonetwork-ui/common/domain/model/record/index.js'

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
      return 'under_development'
    default:
      return 'under_development'
  }
}
