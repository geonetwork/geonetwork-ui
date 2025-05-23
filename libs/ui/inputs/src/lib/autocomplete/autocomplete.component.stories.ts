import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import {
  AutocompleteComponent,
  AutocompleteItem,
} from './autocomplete.component'
import { Observable, of, throwError } from 'rxjs'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Inputs/AutocompleteComponent',
  component: AutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [AutocompleteComponent, BrowserAnimationsModule],
    }),
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<AutocompleteComponent>

type AutocompleteComponentWithActionResult = AutocompleteComponent & {
  actionResult: (value: string) => Observable<AutocompleteItem[]>
  actionThrowsError: boolean
  value: AutocompleteItem
}

const initialItems = ['Hello', 'world', 'from', 'storybook']
function filterResults(value: string) {
  return initialItems.filter((item) => {
    return item.toLowerCase().includes(value?.toLowerCase())
  })
}

export const SubmitAllowed: StoryObj<AutocompleteComponentWithActionResult> = {
  args: {
    placeholder: 'Full text search',
    minCharacterCount: 3,
    actionThrowsError: false,
    clearOnSelection: false,
    allowSubmit: true,
    enterButton: false,
  },
  argTypes: {
    itemSelected: {
      action: 'itemSelected',
    },
    inputSubmitted: {
      action: 'inputSubmitted',
    },
    actionThrowsError: {
      type: 'boolean',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      action: (value: string) =>
        args.actionThrowsError
          ? throwError(() => new Error('Something went terribly wrong!'))
          : of(filterResults(value)),
    },
  }),
}

export const NoSubmit: StoryObj<AutocompleteComponentWithActionResult> = {
  args: {
    placeholder: 'This will only show suggestions, there is no submit button',
    minCharacterCount: 3,
    actionThrowsError: false,
    clearOnSelection: false,
    allowSubmit: false,
    enterButton: false,
  },
  argTypes: {
    itemSelected: {
      action: 'itemSelected',
    },
    inputSubmitted: {
      action: 'inputSubmitted',
    },
    actionThrowsError: {
      type: 'boolean',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      action: (value: string) =>
        args.actionThrowsError
          ? throwError(() => new Error('Something went terribly wrong!'))
          : of(filterResults(value)),
    },
  }),
}

export const WithCustomStyle: StoryObj<AutocompleteComponentWithActionResult> =
  {
    ...NoSubmit,
    render: (args) => ({
      props: args,
      styles: [
        ':host { --gn-ui-text-input-rounded: 10px; --gn-ui-text-input-padding: 20px; --gn-ui-text-input-font-size: 18px }',
      ],
    }),
  }

export const NoMinimumCharacterCount: StoryObj<AutocompleteComponentWithActionResult> =
  {
    args: {
      placeholder:
        'Click to show suggestions! selecting one should clear this field',
      minCharacterCount: 0,
      clearOnSelection: true,
      enterButton: false,
    },
    argTypes: {
      itemSelected: {
        action: 'itemSelected',
      },
      inputSubmitted: {
        action: 'inputSubmitted',
      },
    },
    render: (args) => ({
      props: {
        ...args,
        action: (value: string) => of(filterResults(value)),
      },
    }),
  }

export const WithEnterButtonAndSubmit: StoryObj<AutocompleteComponentWithActionResult> =
  {
    args: {
      placeholder: 'Full text search',
      minCharacterCount: 3,
      actionThrowsError: false,
      clearOnSelection: false,
      allowSubmit: true,
      enterButton: true,
    },
    argTypes: {
      itemSelected: {
        action: 'itemSelected',
      },
      inputSubmitted: {
        action: 'inputSubmitted',
      },
      actionThrowsError: {
        type: 'boolean',
      },
    },
    render: (args) => ({
      props: {
        ...args,
        action: (value: string) => of(filterResults(value)),
      },
    }),
  }
