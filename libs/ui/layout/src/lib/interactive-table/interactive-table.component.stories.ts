import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { InteractiveTableComponent } from './interactive-table.component'
import { InteractiveTableColumnComponent } from './interactive-table-column/interactive-table-column.component'
import { CommonModule } from '@angular/common'
import { action } from '@storybook/addon-actions'

const meta: Meta<InteractiveTableComponent> = {
  component: InteractiveTableComponent,
  title: 'Layout/InteractiveTableComponent',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        InteractiveTableComponent,
        InteractiveTableColumnComponent,
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[500px] w-[800px]" style="resize: both; overflow: auto">${story}</div>`
    ),
  ],
}
export default meta
type Story = StoryObj<InteractiveTableComponent>

export const Primary: Story = {
  args: {
    items: [
      {
        id: '0001',
        firstName: 'John',
        lastName: 'Lennon',
        selected: true,
      },
      {
        id: '0002',
        firstName: 'Ozzy',
        lastName: 'Osbourne',
        selected: false,
      },
      {
        id: '0003',
        firstName: 'Claude',
        lastName: 'François',
        selected: false,
      },
      {
        id: '0004',
        firstName: 'Bob',
        lastName: 'Dylan',
        selected: false,
      },
    ],
  },
  render: (args) => ({
    props: {
      ...args,
      itemClick: action('item clicked'),
      sortByName: action('sort by name'),
      sortById: action('sort by id'),
    },
    template: `
<gn-ui-interactive-table [items]='items' (itemClick)='itemClick($event)'>
  <gn-ui-interactive-table-column>
    <ng-template #header>
      <gn-ui-checkbox
        type="primary"
        class='-m-2 mr-3'
      >
      </gn-ui-checkbox>
    </ng-template>
    <ng-template #cell let-item>
      <gn-ui-checkbox
        class='-m-2'
        [checked]="item.selected"
        type="default"
      >
      </gn-ui-checkbox>
    </ng-template>
  </gn-ui-interactive-table-column>
  <gn-ui-interactive-table-column [grow]='true' [sortable]='true' (sortChange)='sortByName($event)'>
    <ng-template #header>full name</ng-template>
    <ng-template #cell let-item>{{item.firstName}} {{item.lastName}}</ng-template>
  </gn-ui-interactive-table-column>
  <gn-ui-interactive-table-column [sortable]='true' (sortChange)='sortById($event)'>
    <ng-template #header>id</ng-template>
    <ng-template #cell let-item>{{item.id}}</ng-template>
  </gn-ui-interactive-table-column>
</gn-ui-interactive-table>`,
  }),
}
