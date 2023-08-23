import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { RecordPreviewCardComponent } from './record-preview-card.component'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { importProvidersFrom } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

export default {
  title: 'Search/RecordPreviewCardComponent',
  component: RecordPreviewCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [ThumbnailComponent],
      imports: [UiDatavizModule, MatIconModule, UtilSharedModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
      ],
    }),
  ],
} as Meta<RecordPreviewCardComponent>

export const Primary: StoryObj<RecordPreviewCardComponent> = {
  args: {
    record: DATASET_RECORDS[0],
    linkTarget: '_blank',
  },
}
