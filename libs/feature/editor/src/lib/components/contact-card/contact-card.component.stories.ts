import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ContactCardComponent } from './contact-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

export default {
  title: 'Elements/ContactCardComponent',
  component: ContactCardComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatIconModule,
        ButtonComponent,
        ContactCardComponent,
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 400px; margin: auto;">${story}</div>`
    ),
  ],
} as Meta<ContactCardComponent>

export const Primary: StoryObj<ContactCardComponent> = {
  args: {
    contact: {
      firstName: 'John',
      lastName: 'Doe',
      organization: {
        name: 'Example Organization',
      },
      email: 'john.doe@example.com',
      role: 'Developer',
      address: '123 Main St',
      phone: '123-456-7890',
      position: 'Senior Developer',
    },
  },
}
