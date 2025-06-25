import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { RecordPreviewTextComponent } from './record-preview-text.component'
import { importProvidersFrom } from '@angular/core'
import { RecordPreviewTitleComponent } from '../record-preview-title/record-preview-title.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Search/RecordPreviewTextComponent',
  component: RecordPreviewTextComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule), provideI18n()],
    }),
  ],
} as Meta<RecordPreviewTextComponent>

export const Primary: StoryObj<RecordPreviewTitleComponent> = {
  args: {
    record: datasetRecordsFixture()[0] as CatalogRecord,
    linkTarget: '_blank',
  },
}
