import { AutocompleteComponent } from '../src/lib/autocomplete/autocomplete.component'
import { of } from 'rxjs'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { select, text, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { ButtonComponent } from '../src/lib/button/button.component'
import { UiModule } from '../src'

const moduleMetadatas = {
  imports: [UiModule],
}

storiesOf('UI', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('AutocompleteComponent', () => ({
    component: AutocompleteComponent,
    props: {
      placeholder: 'Full text search',
      action: (term) => of(['Hello', 'World']),
    },
  }))
  .add('ButtonComponent', () => ({
    template: '<ui-button [type]="type">{{content}}</ui-button>',
    props: {
      type: select('buttonType', ['primary', 'secondary', 'default']),
      content: text('buttonContent', 'My Button'),
    },
  }))
