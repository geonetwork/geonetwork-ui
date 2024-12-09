import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { RecordPreviewTextComponent } from './record-preview-text.component'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { importProvidersFrom } from '@angular/core'
import { RecordPreviewTitleComponent } from '../record-preview-title/record-preview-title.component'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Search/RecordPreviewTextComponent',
  component: RecordPreviewTextComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        UtilSharedModule,
        UiDatavizModule,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
      ],
    }),
  ],
} as Meta<RecordPreviewTextComponent>

export const Primary: StoryObj<RecordPreviewTitleComponent> = {
  args: {
    record: datasetRecordsFixture()[0] as CatalogRecord,
    linkTarget: '_blank',
  },
}
