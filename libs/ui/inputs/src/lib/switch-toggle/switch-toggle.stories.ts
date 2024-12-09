import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { SwitchToggleComponent } from './switch-toggle.component'
import { importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { HttpClientModule } from '@angular/common/http'

export default {
  title: 'Inputs/SwitchToggle',
  component: SwitchToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [SwitchToggleComponent],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
        importProvidersFrom(HttpClientModule),
      ],
    }),
  ],
} as Meta<SwitchToggleComponent>

export const Primary: StoryObj<SwitchToggleComponent> = {
  args: {
    options: [
      { label: 'city', checked: true },
      { label: 'municipality', checked: false },
      { label: 'state', checked: false },
    ],
    extraClasses: 'grow',
  },
  render: (args) => ({
    props: { ...args },
  }),
}
