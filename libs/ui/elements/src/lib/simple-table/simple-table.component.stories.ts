import { Meta, StoryObj, moduleMetadata } from '@storybook/angular'
import { SimpleTableComponent } from './simple-table.component'
import { TranslateModule } from '@ngx-translate/core'

export default {
  title: 'Elements/SimpleTableComponent',
  component: SimpleTableComponent,
  decorators: [
    moduleMetadata({
      imports: [SimpleTableComponent, TranslateModule.forRoot()],
    }),
  ],
} as Meta<SimpleTableComponent>

export const Default: StoryObj<SimpleTableComponent> = {
  args: {
    data: [
      {
        type: 'OID',
        name: 'OBJECTID',
        code: 'OBJECTID',
        description: 'Sample description',
      },
    ],
    columns: [
      { key: 'type', label: 'Type', width: '15%' },
      { key: 'name', label: 'Name', width: '25%' },
      { key: 'code', label: 'Code', width: '20%' },
      { key: 'description', label: 'Description', width: '40%' },
    ],
  },
}
