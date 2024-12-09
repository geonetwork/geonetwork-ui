import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FigureContainerComponent } from './figure-container.component'
import {
  someHabTableItemFixture,
  tableItemFixture,
  UiDatavizModule,
} from '@geonetwork-ui/ui/dataviz'
import { importProvidersFrom } from '@angular/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'

export default {
  title: 'Dataviz/FigureContainerComponent',
  component: FigureContainerComponent,
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
<div class="border border-gray-300 p-4" style="width: 400px">
  ${story}
</div>`
    ),
  ],
} as Meta<FigureContainerComponent>

type Story = StoryObj<FigureContainerComponent>

export const Sum: Story = {
  args: {
    title: 'Sum of inhabitants',
    icon: 'maps_home_work',
    unit: 'hab.',
    expression: 'sum|pop',
    dataset: someHabTableItemFixture(),
  },
}

export const Average: Story = {
  args: {
    title: 'Average age of the population',
    icon: 'group',
    unit: 'years old',
    expression: 'average|age',
    digits: 3,
    dataset: tableItemFixture(),
  },
}
