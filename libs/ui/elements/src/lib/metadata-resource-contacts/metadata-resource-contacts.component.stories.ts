import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { MetadataResourceContactsComponent } from './metadata-resource-contacts.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Elements/MetadataResourceContactsComponent',
  component: MetadataResourceContactsComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<MetadataResourceContactsComponent>

const sampleContacts: Individual[] = [
  {
    email: 'alice@org-a.com',
    role: 'author',
    organization: { name: 'Organization A' },
    firstName: 'Alice',
    lastName: 'Smith',
  },
  {
    email: 'bob@org-b.com',
    role: 'author',
    organization: { name: 'Organization B' },
    firstName: 'Bob',
    lastName: 'Jones',
  },
  {
    email: 'carol@other.com',
    role: 'custodian',
    organization: { name: 'Organization C' },
    firstName: 'Carol',
    lastName: 'White',
  },
  {
    email: 'dave@publisher.com',
    role: 'publisher',
    organization: { name: 'Publishing House' },
    firstName: 'Dave',
    lastName: 'Brown',
  },
]

export const Primary: StoryObj<MetadataResourceContactsComponent> = {
  args: {
    contacts: sampleContacts,
  },
}
