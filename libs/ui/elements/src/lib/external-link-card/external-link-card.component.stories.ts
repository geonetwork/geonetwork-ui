import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { ExternalLinkCardComponent } from './external-link-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Elements/ExternalLinkCardComponent',
  component: ExternalLinkCardComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule), provideI18n()],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<ExternalLinkCardComponent>

export const SizeXS: StoryObj<ExternalLinkCardComponent> = {
  args: {
    size: 'XS',
    link: {
      type: 'link',
      name: 'Consulter sur Géoclip',
      description:
        'Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.',
      url: new URL('https://example.com/someurlpath'),
      mimeType: 'application/json',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
      <gn-ui-external-link-card [link]="link" size="XS"></gn-ui-external-link-card>
    </div>`,
  }),
}

export const SizeS: StoryObj<ExternalLinkCardComponent> = {
  args: {
    size: 'S',
    link: {
      type: 'link',
      name: 'Consulter sur Géoclip',
      description:
        'Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.',
      url: new URL('https://example.com/someurlpath'),
      mimeType: 'application/json',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
      <gn-ui-external-link-card [link]="link" size="S"></gn-ui-external-link-card>
    </div>`,
  }),
}

export const SizeM: StoryObj<ExternalLinkCardComponent> = {
  args: {
    size: 'M',
    link: {
      type: 'link',
      name: 'Consulter sur Géoclip',
      description:
        'Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.',
      url: new URL('https://example.com/someurlpath'),
      mimeType: 'application/json',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
      <gn-ui-external-link-card [link]="link" size="M"></gn-ui-external-link-card>
    </div>`,
  }),
}

export const SizeL: StoryObj<ExternalLinkCardComponent> = {
  args: {
    size: 'L',
    link: {
      type: 'link',
      name: 'Consulter sur Géoclip',
      description:
        'Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.',
      url: new URL('https://example.com/someurlpath'),
      mimeType: 'application/json',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
      <gn-ui-external-link-card [link]="link" size="L"></gn-ui-external-link-card>
    </div>`,
  }),
}
