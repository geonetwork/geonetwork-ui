import { provideI18n } from '@geonetwork-ui/util/i18n'
import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { ApiCardComponent } from './api-card.component'

export default {
  title: 'Elements/ApiCardComponent',
  component: ApiCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<ApiCardComponent>

export const SizeXS: StoryObj<ApiCardComponent> = {
  args: {
    link: {
      type: 'service',
      accessServiceProtocol: 'wfs',
      description: "Scot en cours d'élaboration ou de révision",
      name: 'A file that contains all roads',
      url: new URL('https://roads.com/wfs'),
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
      <gn-ui-api-card [link]="link" size="XS" [currentLink]="link" [title]="link.description"></gn-ui-api-card>
    </div>`,
  }),
}

export const SizeS: StoryObj<ApiCardComponent> = {
  args: {
    link: {
      type: 'service',
      accessServiceProtocol: 'wfs',
      description: "Scot en cours d'élaboration ou de révision",
      name: 'A file that contains all roads',
      url: new URL('https://roads.com/wfs'),
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
    <gn-ui-api-card [link]="link" size="S" [currentLink]="link" [title]="link.description"></gn-ui-api-card>
  </div>`,
  }),
}

export const SizeM: StoryObj<ApiCardComponent> = {
  args: {
    link: {
      type: 'service',
      accessServiceProtocol: 'wfs',
      description: "Scot en cours d'élaboration ou de révision",
      name: 'A file that contains all roads',
      url: new URL('https://roads.com/wfs'),
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
      <gn-ui-api-card [link]="link" size="M" [currentLink]="link" [title]="link.description"></gn-ui-api-card>
    </div>`,
  }),
}

export const SizeL: StoryObj<ApiCardComponent> = {
  args: {
    link: {
      type: 'service',
      accessServiceProtocol: 'wfs',
      description: "Scot en cours d'élaboration ou de révision",
      name: 'A file that contains all roads',
      url: new URL('https://roads.com/wfs'),
    },
  },
  render: (args) => ({
    props: args,
    template: `
    
    <div class='border border-black inline-block rounded'>
      <gn-ui-api-card [link]="link" size="L" [currentLink]="link" [title]="link.description"></gn-ui-api-card>
    </div>`,
  }),
}
