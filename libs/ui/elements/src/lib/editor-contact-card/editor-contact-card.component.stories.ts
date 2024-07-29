import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { EditorContactCardComponent } from './editor-contact-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Elements/LinkCardComponent',
  component: EditorContactCardComponent,
  decorators: [
    moduleMetadata({
      imports: [EditorContactCardComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<EditorContactCardComponent>

export const Primary: StoryObj<EditorContactCardComponent> = {
  args: {
    compact: false,
    link: {
      type: 'link',
      name: 'Consulter sur Géoclip',
      description:
        'Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.',
      url: new URL('https://example.com/someurlpath'),
    },
  },
}
