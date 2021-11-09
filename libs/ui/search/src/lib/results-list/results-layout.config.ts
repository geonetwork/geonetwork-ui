import { InjectionToken, Type } from '@angular/core'
import { ResultsListLayout } from '@geonetwork-ui/util/shared'
import { RecordPreviewCardComponent } from '../record-preview-card/record-preview-card.component'
import { RecordPreviewListComponent } from '../record-preview-list/record-preview-list.component'
import { RecordPreviewTextComponent } from '../record-preview-text/record-preview-text.component'
import { RecordPreviewTitleComponent } from '../record-preview-title/record-preview-title.component'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

const DEFAULT_ITEM_CLS = 'pb-4'
const DEFAULT_CONTAINER_CLS = 'gap-4 p-4'

export class ResultsLayoutConfigItem {
  constructor(
    public component: Type<RecordPreviewComponent>,
    public itemClass: string = DEFAULT_ITEM_CLS,
    public containerClass: string = DEFAULT_CONTAINER_CLS
  ) {}
}
export type ResultsLayoutConfigModel = Record<string, ResultsLayoutConfigItem>

export const RESULTS_LAYOUT_CONFIG =
  new InjectionToken<ResultsLayoutConfigModel>('results-layout.config')

export const DEFAULT_RESULTS_LAYOUT_CONFIG: ResultsLayoutConfigModel = {
  [ResultsListLayout.CARD]: new ResultsLayoutConfigItem(
    RecordPreviewCardComponent,
    'h-24',
    'grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'
  ),
  [ResultsListLayout.LIST]: new ResultsLayoutConfigItem(
    RecordPreviewListComponent
  ),
  [ResultsListLayout.TEXT]: new ResultsLayoutConfigItem(
    RecordPreviewTextComponent
  ),
  [ResultsListLayout.TITLE]: new ResultsLayoutConfigItem(
    RecordPreviewTitleComponent
  ),
}
