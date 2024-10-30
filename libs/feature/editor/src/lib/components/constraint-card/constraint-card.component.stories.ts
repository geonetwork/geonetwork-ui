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
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

export default {
  title: 'Elements/ContactCardComponent',
  component: ContactCardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonComponent, ContactCardComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[200px] w-[500px] p-[10px]" style="resize: both; overflow: auto; margin: auto;">${story}</div>`
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
