import {
  ResultsLayoutConfigItem,
  ResultsLayoutConfigModel,
} from '@geonetwork-ui/ui/search'
import { RecordPreviewDatahubComponent } from './home/search/record-preview-datahub/record-preview-datahub.component'

export const DATAHUB_RESULTS_LAYOUT_CONFIG: ResultsLayoutConfigModel = {
  DATAHUB: new ResultsLayoutConfigItem(
    RecordPreviewDatahubComponent,
    'pt-4 pb-5 sm:py-7',
    '',
    'grid grid-cols-1 divide-y divide-gray-300'
  ),
}
