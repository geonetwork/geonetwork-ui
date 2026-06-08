import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { ContactPillComponent } from './contact-pill.component'

const wrap = (contact: Individual): StoryObj<ContactPillComponent> => ({
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
  args: { contact },
  render: (args) => ({
    props: args,
    template: `<div style="max-width: 400px">
      <gn-ui-contact-pill [contact]="contact"></gn-ui-contact-pill>
    </div>`,
  }),
})

export default {
  title: 'Elements/ContactPillComponent',
  component: ContactPillComponent,
} as Meta<ContactPillComponent>

/** Full contact with org logo */
export const WithLogo = wrap({
  firstName: 'Alice',
  lastName: 'Smith',
  email: 'alice@hautsdefrance.fr',
  role: 'author',
  position: 'Directrice des données',
  phone: '+33 3 20 00 00 00',
  address: '151 avenue du Président Hoover, 59555 Lille, France',
  organization: {
    name: 'Région Hauts-de-France',
    website: new URL('https://www.hautsdefrance.fr/'),
    logoUrl: new URL('https://placehold.co/100x100/c8d6e5/2d3436?text=HdF'),
  },
})

/** Org without logo */
export const WithoutLogo = wrap({
  firstName: 'Bob',
  lastName: 'Martin',
  email: 'bob@agence.fr',
  role: 'custodian',
  phone: '+33 4 00 00 00 00',
  address: '10 rue de la Paix, 75001 Paris',
  organization: {
    name: 'Agence Nationale des Données',
    website: new URL('https://www.agence-nationale.fr/'),
  },
})

/** Person without organisation */
export const NoOrganization = wrap({
  firstName: 'Claire',
  lastName: 'Dupont',
  email: 'claire@example.com',
  role: 'point_of_contact',
  phone: '+33 6 12 34 56 78',
  address: '5 avenue des Oliviers, 69001 Lyon',
})

/** Only email — disabled icons for phone, address */
export const EmptyFields = wrap({
  email: 'contact@example.com',
  role: 'point_of_contact',
})

/** Super long data */
export const LongData = wrap({
  firstName: 'Jean-Baptiste-Emmanuel',
  lastName: 'Volfoni-Extraordinaire',
  email:
    'jean-baptiste-emmanuel.volfoni@tres-longue-adresse-organisation.gouv.fr',
  role: 'point_of_contact',
  phone: '+33 3 20 12 34 56',
  address:
    '1234 très longue rue avec un nom de voie excessivement détaillé, Bâtiment C, 59000 Lille, Hauts-de-France, France',
  organization: {
    name: 'Collectivité Territoriale avec un Très Long Nom Institutionnel',
    website: new URL(
      'https://www.collectivite-tres-longue-adresse-web.gouv.fr/donnees/catalogue'
    ),
    logoUrl: new URL('https://placehold.co/100x100/dfe6e9/2d3436?text=CT'),
  },
})
