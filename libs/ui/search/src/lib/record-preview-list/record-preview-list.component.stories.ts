import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { RecordPreviewListComponent } from './record-preview-list.component'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

export default {
  title: 'Search/RecordPreviewListComponent',
  component: RecordPreviewListComponent,
  decorators: [
    moduleMetadata({
      declarations: [ThumbnailComponent],
      imports: [
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        UtilSharedModule,
        UiDatavizModule,
      ],
    }),
  ],
} as Meta<RecordPreviewListComponent>

export const Primary: StoryObj<RecordPreviewListComponent> = {
  args: {
    record: DATASET_RECORDS[0],
    linkTarget: '_blank',
  },
}
