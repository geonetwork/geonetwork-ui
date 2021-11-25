import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { MetadataInfoComponent } from './metadata-info.component'
import { UiElementsModule } from '../ui-elements.module'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/ui/search'

export default {
  title: 'Elements/MetadataInfoComponent',
  component: MetadataInfoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UiElementsModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
} as Meta<MetadataInfoComponent>

const Template: Story<MetadataInfoComponent> = (
  args: MetadataInfoComponent
) => ({
  component: MetadataInfoComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  metadata: RECORDS_FULL_FIXTURE[0],
  incomplete: false,
}
