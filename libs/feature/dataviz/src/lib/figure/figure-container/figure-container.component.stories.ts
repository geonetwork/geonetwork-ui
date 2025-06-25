import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FigureContainerComponent } from './figure-container.component'
import { importProvidersFrom } from '@angular/core'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import {
  someFigureItemFixture,
  someHabFigureItemFixture,
} from '../figure.fixtures'

export default {
  title: 'Dataviz/FigureContainerComponent',
  component: FigureContainerComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule), provideI18n()],
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
    dataset: someHabFigureItemFixture(),
  },
}

export const Average: Story = {
  args: {
    title: 'Average age of the population',
    icon: 'group',
    unit: 'years old',
    expression: 'average|age',
    digits: 3,
    dataset: someFigureItemFixture(),
  },
}
