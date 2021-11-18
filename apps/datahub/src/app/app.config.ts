import {
  ResultsLayoutConfigItem,
  ResultsLayoutConfigModel,
} from '@geonetwork-ui/ui/search'
import { RecordPreviewDatahubComponent } from './record-preview-datahub/record-preview-datahub.component'

export const DATAHUB_RESULTS_LAYOUT_CONFIG: ResultsLayoutConfigModel = {
  DATAHUB: new ResultsLayoutConfigItem(
    RecordPreviewDatahubComponent,
    'py-7',
    '',
    'grid grid-cols-1 divide-y divide-gray-500'
  ),
}

export const APPLICATION_CONFIG = {
  catalogTitleHtml: `
      <div><span class="text-white">Toutes les <span class="text-primary">données</span></div> 
      <div><span class="text-primary">publiques </span><span class="text-white">des Hauts de France</span></div>
      `,
}
