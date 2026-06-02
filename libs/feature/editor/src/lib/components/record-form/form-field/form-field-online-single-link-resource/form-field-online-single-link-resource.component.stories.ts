import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { FormFieldOnlineSingleLinkResourceComponent } from './form-field-online-single-link-resource.component'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Editor/FormFieldOnlineSingleLinkResourceComponent',
  component: FormFieldOnlineSingleLinkResourceComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
  argTypes: {
    valueChange: { action: 'valueChange' },
  },
} as Meta<FormFieldOnlineSingleLinkResourceComponent>

export const Empty: StoryObj<FormFieldOnlineSingleLinkResourceComponent> = {
  args: {
    value: [],
  },
}

export const WithExistingLink: StoryObj<FormFieldOnlineSingleLinkResourceComponent> =
  {
    args: {
      value: [aSetOfLinksFixture().readmeLink()],
    },
  }

export const WithMultipleResources: StoryObj<FormFieldOnlineSingleLinkResourceComponent> =
  {
    args: {
      value: [
        aSetOfLinksFixture().readmeLink(),
        aSetOfLinksFixture().doiLink(),
        aSetOfLinksFixture().dataCsv(),
      ],
    },
  }
