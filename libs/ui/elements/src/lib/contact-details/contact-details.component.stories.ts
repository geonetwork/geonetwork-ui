import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { ContactDetailsComponent } from './contact-details.component'

const wrap = (contact: unknown): StoryObj<ContactDetailsComponent> => ({
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
  args: { contact: contact as any },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:480px;padding:16px;background:#f3f4f6">
      <gn-ui-contact-details [contact]="contact"></gn-ui-contact-details>
    </div>`,
  }),
})

export default {
  title: 'Elements/ContactDetailsComponent',
  component: ContactDetailsComponent,
} as Meta<ContactDetailsComponent>

/** All fields + org with logo */
export const FullWithLogo = wrap({
  firstName: 'Alice',
  lastName: 'Smith',
  email: 'alice@hautsdefrance.fr',
  role: 'point_of_contact',
  position: 'Directrice des données',
  phone: '+33 3 20 00 00 00',
  address: '151 avenue du Président Hoover, 59555 Lille, France',
  organization: {
    name: 'Région Hauts-de-France',
    website: new URL('https://www.hautsdefrance.fr/'),
    logoUrl: new URL('https://placehold.co/100x100/c8d6e5/2d3436?text=HdF'),
  },
})

/** All fields + org without logo */
export const FullWithoutLogo = wrap({
  firstName: 'Bob',
  lastName: 'Martin',
  email: 'bob.martin@agence.fr',
  role: 'custodian',
  position: 'Responsable SIG',
  phone: '+33 4 00 00 00 00',
  address: '10 rue de la Paix, 75001 Paris, France',
  organization: {
    name: 'Agence Nationale des Données',
    website: new URL('https://www.agence-nationale.fr/'),
  },
})

/** Person without organisation */
export const NoOrganization = wrap({
  firstName: 'Claire',
  lastName: 'Dupont',
  email: 'claire.dupont@example.com',
  role: 'author',
  phone: '+33 6 12 34 56 78',
  address: '5 avenue des Oliviers, 69001 Lyon, France',
})

/** Only email — all other rows shown with disabled icons */
export const EmptyFields = wrap({
  email: 'contact@example.com',
  role: 'point_of_contact',
})

/** Org exists but has no website, no phone, no address — disabled icons for empty rows */
export const PartiallyFilled = wrap({
  email: 'info@org.com',
  role: 'distributor',
  organization: {
    name: 'OpenData Corp',
  },
})

/** Super-long email, address and website */
export const LongData = wrap({
  firstName: 'Jean-Baptiste-Emmanuel',
  lastName: 'Volfoni-Extraordinaire',
  email:
    'jean-baptiste-emmanuel.volfoni-extraordinaire@tres-longue-adresse-organisation-regionale.gouv.fr',
  role: 'point_of_contact',
  position: 'Chargé de mission données géographiques ouvertes et durables',
  phone: '+33 3 20 12 34 56',
  address:
    '1234 très longue rue avec un nom de voie excessivement détaillé et sans abréviation aucune, Bâtiment C, Porte 42, 59000 Lille, Nord, Hauts-de-France, France',
  organization: {
    name: 'Collectivité Territoriale avec un Très Long Nom Institutionnel',
    website: new URL(
      'https://www.collectivite-territoriale-tres-longue-adresse-web.gouv.fr/donnees-ouvertes/geographiques/catalogue'
    ),
    logoUrl: new URL('https://placehold.co/100x100/dfe6e9/2d3436?text=CT'),
  },
})
