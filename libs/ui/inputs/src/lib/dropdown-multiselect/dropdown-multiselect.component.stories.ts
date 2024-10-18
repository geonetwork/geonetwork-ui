import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { DropdownMultiselectComponent } from './dropdown-multiselect.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonComponent } from '../button/button.component'

export default {
  title: 'Inputs/DropdownMultiselectComponent',
  component: DropdownMultiselectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ButtonComponent,
        OverlayModule,
        MatCheckboxModule,
        TranslateModule.forRoot(),
      ],
    }),
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 p-2" style="width: 600px; height:400px; resize: both; overflow: auto">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  ${story}
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</p>
</div>`
    ),
  ],
} as Meta<DropdownMultiselectComponent>

export const Primary: StoryObj<DropdownMultiselectComponent> = {
  args: {
    title: 'my title',
    choices: [
      {
        label: 'My Choice 1',
        value: 'choice1',
      },
      {
        label:
          'My Choice 2 (very, very, very, very, very, very long text coming up)',
        value: 'choice2',
      },
      {
        label: 'My Choice 3 (very long text coming up)',
        value: { name: 'choice3' },
      },
      {
        label: 'My Numerical choice',
        value: 1234,
      },
      {
        label: 'My boolean choice',
        value: false,
      },
    ],
    selected: ['choice1'],
    allowSearch: true,
    maxRows: 4,
  },
  argTypes: {
    selectValues: {
      action: 'selectValues',
    },
  },
}
