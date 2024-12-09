import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { MetadataInfoComponent } from './metadata-info.component'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Elements/MetadataInfoComponent',
  component: MetadataInfoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        UtilSharedModule,
      ],
    }),
    applicationConfig({
      providers: [],
    }),
  ],
} as Meta<MetadataInfoComponent>

export const Primary: StoryObj<MetadataInfoComponent> = {
  args: {
    metadata: datasetRecordsFixture()[0] as Partial<DatasetRecord>,
    incomplete: false,
  },
}
