import { provideI18n } from '@geonetwork-ui/util/i18n'
import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { MetadataDoiComponent } from './metadata-doi.component.js'

export default {
  title: 'Elements/MetadataDoiComponent',
  component: MetadataDoiComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<MetadataDoiComponent>

export const WithLink: StoryObj<MetadataDoiComponent> = {
  args: {
    code: '10.1234/example.doi.12345',
    link: 'https://doi.org/10.1234/example.doi.12345',
  },
}

export const WithoutLink: StoryObj<MetadataDoiComponent> = {
  args: {
    code: '10.5678/another.example.doi',
  },
}

export const LongDoi: StoryObj<MetadataDoiComponent> = {
  args: {
    code: '10.1234/very.long.doi.identifier.that.should.be.truncated.with.ellipsis.doi.identifier.doi.identifier.doi.identifier.doi.identifier.doi.identifier',
    link: 'https://doi.org/10.1234/very.long.doi.identifier.that.should.be.truncated.with.ellipsis',
  },
}
