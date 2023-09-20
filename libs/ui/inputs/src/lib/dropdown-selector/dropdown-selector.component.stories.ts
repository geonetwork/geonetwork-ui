import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { DropdownSelectorComponent } from './dropdown-selector.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { MatIcon } from '@angular/material/icon'
import { ButtonComponent } from '../button/button.component'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Inputs/DropdownSelectorComponent',
  component: DropdownSelectorComponent,
  decorators: [
    moduleMetadata({
      declarations: [MatIcon, ButtonComponent],
      imports: [UtilI18nModule, OverlayModule, TranslateModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[250px] w-[600px] p-[10px]" style="resize: both; overflow: auto">${story}</div>`
    ),
  ],
} as Meta<DropdownSelectorComponent>

export const Primary: StoryObj<DropdownSelectorComponent> = {
  args: {
    title: 'my title',
    ariaName: 'select-dropdown',
    choices: [
      {
        label: 'My Choice 1',
        value: 'choice1',
      },
      {
        label: 'My Choice 2, second choice',
        value: 'choice2',
      },
      {
        label: 'My Choice 3, very very very very very very long text',
        value: 'choice3',
      },
    ],
    selected: 'choice1',
    showTitle: true,
  },
  argTypes: {
    selectValue: {
      action: 'selectValue',
    },
  },
}
