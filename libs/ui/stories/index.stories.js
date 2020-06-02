import {AutocompleteComponent} from '../src/lib/autocomplete/autocomplete.component'
import {of} from 'rxjs'
import {DropdownSelectorComponent} from '../src'
import {moduleMetadata, storiesOf} from '@storybook/angular'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {BrowserModule} from '@angular/platform-browser'

const moduleMetadatas = {
  declarations: [DropdownSelectorComponent, AutocompleteComponent],
  imports: [NgbModule, BrowserModule],
}

storiesOf('UI', module)
  .addDecorator(
    moduleMetadata(moduleMetadatas)
  )
  .add('DropdownSelectorComponent', () => ({
    component: DropdownSelectorComponent,
    props: {
      title: 'my title',
      ariaName: 'aria name',
      choices : [
        {
          label: 'last changed',
          value: 'lastUpdated',
        },
        {
          label: 'popularity',
          value: 'popularity',
        },
      ]
    },
  }))
  .add('AutocompleteComponent', () => ({
    component: AutocompleteComponent,
      props: {
        placeholder: 'Full text search',
        action: (term) => of(['Hello', 'World'])
      },
  })
  );
