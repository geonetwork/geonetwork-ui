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
    chartType: { control: { type: 'select', options: CHART_TYPE_VALUES } },
  },
} as Meta<ChartComponent>

const Template: Story<ChartComponent> = (args: ChartComponent) => ({
  component: ChartComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  data: [
    {
      id: '0001',
      firstName: 'John',
      lastName: 'Lennon',
      discsSold: '10',
    },
    {
      id: '0002',
      firstName: 'Ozzy',
      lastName: 'Osbourne',
      discsSold: '8',
    },
    {
      id: '0003',
      firstName: 'Claude',
      lastName: 'François',
      discsSold: '5',
    },
    {
      id: '0004',
      firstName: 'Michael',
      lastName: 'Jackson',
      discsSold: '15',
    },
  ],
  xAxis: 'firstName',
  yAxis: 'discsSold',
  chartType: 'bar',
}
