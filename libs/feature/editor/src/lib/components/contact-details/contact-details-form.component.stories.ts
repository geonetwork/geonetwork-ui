import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { CommonModule } from '@angular/common'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { ContactDetailsFormComponent } from './contact-details-form.component'

export default {
  title: 'Elements/ContactDetailsFormComponent',
  component: ContactDetailsFormComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ContactDetailsFormComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule), provideI18n()],
    }),
  ],
  argTypes: {
    contactChange: { action: 'contactChange' },
  },
} as Meta<ContactDetailsFormComponent>

export const Empty: StoryObj<ContactDetailsFormComponent> = {
  args: {
    contact: {
      firstName: '',
      lastName: '',
      organization: {
        name: '',
        email: '',
      },
      email: '',
      role: 'unspecified',
    },
  },
}

export const WithExistingContact: StoryObj<ContactDetailsFormComponent> = {
  args: {
    contact: {
      firstName: 'John',
      lastName: 'Doe',
      organization: {
        name: 'Example Organization',
        email: 'john.doe@example.com',
      },
      email: '',
      role: 'unspecified',
    },
  },
}
