import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { AutocompleteComponent } from './autocomplete.component'
import { of } from 'rxjs'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

export default {
  title: 'AutocompleteComponent',
  component: AutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [MatAutocompleteModule, MatIconModule, ReactiveFormsModule],
    }),
  ],
} as Meta<AutocompleteComponent>

type AutocompleteComponentWithActionResult = AutocompleteComponent & {
  actionResult: string[]
}

const Template: Story<AutocompleteComponentWithActionResult> = (args) => ({
  component: AutocompleteComponent,
  props: { ...args, action: (term) => of(args.actionResult) },
})

export const Primary = Template.bind({})
Primary.args = {
  placeholder: 'Full text search',
  actionResult: ['Hello', 'world'],
}
Primary.argTypes = {
  changed: {
    action: 'changed',
  },
}
