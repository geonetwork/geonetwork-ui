import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { ContactPillComponent } from './contact-pill.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Elements/ContactPillComponent',
  component: ContactPillComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<ContactPillComponent>

export const Primary: StoryObj<ContactPillComponent> = {
  args: {
    contact: {
      email: 'alice@organization.com',
      role: 'author',
      organization: { name: 'Région Hauts-de-France' },
      firstName: 'Alice',
      lastName: 'Smith',
    },
  },
  render: (args) => ({
    props: args,
    template: `<div style="max-width: 400px">
      <gn-ui-contact-pill [contact]="contact"></gn-ui-contact-pill>
    </div>`,
  }),
}
