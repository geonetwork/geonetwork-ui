import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { TableComponent } from './table.component'
import { UiLayoutModule } from '../ui-layout.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Layout/TableComponent',
  component: TableComponent,
  decorators: [
    moduleMetadata({
      imports: [UiLayoutModule, BrowserAnimationsModule],
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
