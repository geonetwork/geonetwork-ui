import {
  ResultsLayoutConfigItem,
  ResultsLayoutConfigModel,
} from '@geonetwork-ui/ui/search'
import { RecordPreviewDatahubComponent } from './record-preview-datahub/record-preview-datahub.component'

export const DATAHUB_RESULTS_LAYOUT_CONFIG: ResultsLayoutConfigModel = {
  DATAHUB: new ResultsLayoutConfigItem(RecordPreviewDatahubComponent),
}
