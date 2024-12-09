import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { FigureComponent } from './figure.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiDatavizModule } from '../ui-dataviz.module'
import { importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Dataviz/FigureComponent',
  component: FigureComponent,
  decorators: [
    moduleMetadata({
      imports: [UiDatavizModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
      ],
    }),
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 flex items-center justify-center" style="width: 450px; height: 100px; resize: both; overflow: auto">
  ${story}
</div>`
    ),
  ],
} as Meta<FigureComponent>

export const Primary: StoryObj<FigureComponent> = {
  args: {
    title: 'Average population in European countries',
    icon: 'group',
    figure: '1020500',
    unit: 'hab.',
    color: 'primary',
  },
  argTypes: {
    color: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
}
