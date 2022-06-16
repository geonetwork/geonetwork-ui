import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { AutocompleteComponent } from './autocomplete.component'
import { of, throwError } from 'rxjs'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'

export default {
  title: 'Inputs/AutocompleteComponent',
  component: AutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        MatAutocompleteModule,
        MatIconModule,
        ReactiveFormsModule,
      ],
    }),
  ],
} as Meta<AutocompleteComponent>

type AutocompleteComponentWithActionResult = AutocompleteComponent & {
  actionResult: string[]
  actionThrowsError: boolean
}

const Template: Story<AutocompleteComponentWithActionResult> = (args) => ({
  component: AutocompleteComponent,
  props: {
    ...args,
    action: () =>
      args.actionThrowsError
        ? throwError(new Error('Something went terribly wrong!'))
        : of(args.actionResult),
  },
})

export const Primary = Template.bind({})
Primary.args = {
  placeholder: 'Full text search',
  actionResult: ['Hello', 'world'],
  actionThrowsError: false,
}
Primary.argTypes = {
  itemSelected: {
    action: 'itemSelected',
  },
  inputSubmitted: {
    action: 'inputSubmitted',
  },
  actionThrowsError: {
    type: 'boolean',
  },
}
