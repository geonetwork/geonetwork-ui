import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { LinkCardComponent } from './link-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

export default {
  title: 'Elements/LinkCardComponent',
  component: LinkCardComponent,
  decorators: [
    moduleMetadata({
      imports: [LinkCardComponent, TranslateModule.forRoot()],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<LinkCardComponent>

export const SizeXS: StoryObj<LinkCardComponent> = {
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
      <gn-ui-link-card [link]="link" size="XS"></gn-ui-link-card>
    </div>`,
  }),
}

export const SizeS: StoryObj<LinkCardComponent> = {
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
      <gn-ui-link-card [link]="link" size="S"></gn-ui-link-card>
    </div>`,
  }),
}

export const SizeM: StoryObj<LinkCardComponent> = {
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
      <gn-ui-link-card [link]="link" size="M"></gn-ui-link-card>
    </div>`,
  }),
}

export const SizeL: StoryObj<LinkCardComponent> = {
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
      <gn-ui-link-card [link]="link" size="L"></gn-ui-link-card>
    </div>`,
  }),
}
