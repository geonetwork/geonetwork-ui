import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { RecordPreviewCardComponent } from './record-preview-card.component'
import { importProvidersFrom } from '@angular/core'
import { provideHttpClient } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Search/RecordPreviewCardComponent',
  component: RecordPreviewCardComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideHttpClient(),
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
