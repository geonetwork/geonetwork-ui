import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { RecordPreviewTitleComponent } from './record-preview-title.component'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Search/RecordPreviewTitleComponent',
  component: RecordPreviewTitleComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        UtilSharedModule,
        UiDatavizModule,
      ],
    }),
  ],
} as Meta<RecordPreviewTitleComponent>

export const Primary: StoryObj<RecordPreviewTitleComponent> = {
  args: {
    record: datasetRecordsFixture()[0] as CatalogRecord,
    linkTarget: '_blank',
  },
}
