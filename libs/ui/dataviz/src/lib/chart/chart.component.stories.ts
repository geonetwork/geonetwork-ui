import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { ChartComponent } from './chart.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CHART_TYPE_VALUES } from './chart.model'
import { UiDatavizModule } from '../ui-dataviz.module'

export default {
  title: 'Dataviz/ChartComponent',
  component: ChartComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UiDatavizModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 700px">${story}</div>`
    ),
  ],
  argTypes: {
    type: { control: { type: 'select', options: CHART_TYPE_VALUES } },
  },
} as Meta<ChartComponent>

const Template: Story<ChartComponent> = (args: ChartComponent) => ({
  component: ChartComponent,
  props: args,
})

const SAMPLE_DATA = [
  {
    id: '0001',
    firstName: 'John',
    lastName: 'Lennon',
    discsSold: 10,
    age: 65,
  },
  {
    id: '0002',
    firstName: 'Ozzy',
    lastName: 'Osbourne',
    discsSold: 8,
    age: 45,
  },
  {
    id: '0003',
    firstName: 'Claude',
    lastName: 'François',
    discsSold: 5,
    age: 72,
  },
  {
    id: '0004',
    firstName: 'Michael',
    lastName: 'Jackson',
    discsSold: 15,
    age: 48,
  },
]

export const Primary = Template.bind({})
Primary.args = {
  data: SAMPLE_DATA,
  labelProperty: 'firstName',
  valueProperty: 'discsSold',
  secondaryValueProperty: '',
  type: 'bar',
}
const options = Object.keys(SAMPLE_DATA[0])
Primary.argTypes = {
  labelProperty: { control: { type: 'select', options } },
  valueProperty: { control: { type: 'select', options } },
  secondaryValueProperty: {
    control: { type: 'select', options: [''].concat(options) },
  },
}
