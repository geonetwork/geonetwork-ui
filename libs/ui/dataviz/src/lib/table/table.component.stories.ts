import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { TableComponent } from './table.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiDatavizModule } from '../ui-dataviz.module'

export default {
  title: 'Layout/TableComponent',
  component: TableComponent,
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
} as Meta<TableComponent>

const Template: Story<TableComponent> = (args: TableComponent) => ({
  component: TableComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  data: [
    {
      id: '0001',
      firstName: 'John',
      lastName: 'Lennon',
    },
    {
      id: '0002',
      firstName: 'Ozzy',
      lastName: 'Osbourne',
    },
    {
      id: '0003',
      firstName: 'Claude',
      lastName: 'François',
    },
  ],
}
