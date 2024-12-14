import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { PaginationButtonsComponent } from './pagination-buttons.component'
import { MockListComponent } from '../pagination/pagination.component.stories'

export default {
  title: 'Layout/Pagination/PaginationButtonsComponent',
  component: PaginationButtonsComponent,
  decorators: [
    moduleMetadata({
      imports: [MockListComponent],
    }),
  ],
} as Meta<PaginationButtonsComponent>

export const Primary: StoryObj<PaginationButtonsComponent> = {
  render: () => ({
    template: `
<gn-ui-pagination-buttons [listComponent]="list"></gn-ui-pagination-buttons>
<gn-ui-mock-list #list></gn-ui-mock-list>`,
  }),
}
