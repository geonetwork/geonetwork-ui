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
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'

export default {
  title: 'Elements/MetadataInfoComponent',
  component: MetadataInfoComponent,
  decorators: [
    moduleMetadata({
      declarations: [ContentGhostComponent],
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
    metadata: RECORDS_FULL_FIXTURE[0],
    incomplete: false,
  },
}
