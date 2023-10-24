import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { importProvidersFrom } from '@angular/core'
import { CheckboxComponent } from './checkbox.component'
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox'

export default {
  title: 'Inputs/CheckboxComponent',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      declarations: [MatCheckbox],
      imports: [],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(
          BrowserModule,
          BrowserAnimationsModule,
          CommonModule,
          MatCheckboxModule
        ),
      ],
    }),
  ],
} as Meta<CheckboxComponent>

export const Primary: StoryObj<CheckboxComponent> = {
  args: {
    checked: false,
    indeterminate: false,
  },
  argTypes: {
    changed: {
      action: 'changed',
    },
  },
}
