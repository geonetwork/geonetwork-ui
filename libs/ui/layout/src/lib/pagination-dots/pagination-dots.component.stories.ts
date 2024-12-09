import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { PaginationDotsComponent } from './pagination-dots.component'
import { MockListComponent } from '../pagination/pagination.component.stories'

export default {
  title: 'Layout/Pagination/PaginationDotsComponent',
  component: PaginationDotsComponent,
  decorators: [
    moduleMetadata({
      imports: [MockListComponent],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 w-[600px] p-[10px]" style="resize: both; overflow: auto">${story}</div>`
    ),
  ],
} as Meta<PaginationDotsComponent>

export const Primary: StoryObj<PaginationDotsComponent> = {
  render: () => ({
    template: `
<gn-ui-pagination-dots [listComponent]="list"></gn-ui-pagination-dots>
<gn-ui-mock-list #list></gn-ui-mock-list>`,
  }),
}
