import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ConstraintCardComponent } from './constraint-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { CommonModule } from '@angular/common'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Elements/ConstraintCardComponent',
  component: ConstraintCardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ConstraintCardComponent],
    }),
    applicationConfig({
      providers: [provideI18n(), importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  argTypes: {
    constraintChange: {
      action: 'constraintChange',
    },
  },
} as Meta<ConstraintCardComponent>

type ConstraintCardComponentProps = {
  label: string
  constraint: {
    text: string
    url: string
  }
}

export const WithUrl: StoryObj<ConstraintCardComponent> = {
  args: {
    label: 'My constraint',
    constraint: {
      text: `This is a multiline and **formatted** constraint text.

## introduction

It covers:
- things
- other things

_and it's great_.`,
      url: new URL('https://example.com/my-license.pdf'),
    },
  },
}
export const WithoutUrl: StoryObj<ConstraintCardComponent> = {
  args: {
    label: 'My constraint',
    constraint: {
      text: `This is a multiline and **formatted** constraint text.`,
    },
  },
}
