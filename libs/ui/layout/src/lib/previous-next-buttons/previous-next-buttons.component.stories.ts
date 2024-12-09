import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { PreviousNextButtonsComponent } from './previous-next-buttons.component'
import { MockListComponent } from '../pagination/pagination.component.stories'

export default {
  title: 'Layout/Pagination/PreviousNextButtonsComponent',
  component: PreviousNextButtonsComponent,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MockListComponent],
    }),
  ],
} as Meta<PreviousNextButtonsComponent>

export const Primary: StoryObj<PreviousNextButtonsComponent> = {
  render: () => ({
    template: `
<gn-ui-previous-next-buttons [listComponent]="list"></gn-ui-previous-next-buttons>
<gn-ui-mock-list #list></gn-ui-mock-list>`,
  }),
}
