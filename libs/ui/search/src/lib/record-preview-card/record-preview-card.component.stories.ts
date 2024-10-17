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
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Search/RecordPreviewCardComponent',
  component: RecordPreviewCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [ThumbnailComponent],
      imports: [UiDatavizModule, UtilSharedModule],
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
    record: datasetRecordsFixture()[0] as CatalogRecord,
    linkTarget: '_blank',
  },
}
