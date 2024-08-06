import { Organization } from './organization.model'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

export const RoleValues = [
  'unspecified',
  'other',
  'author', // Party who authored the resource
  'collaborator', // party who assists with the generation of the resource other than the principal investigator
  'contributor', // party contributing to the resource
  'custodian', // Party that accepts accountability and responsibility for the data and ensures appropriate care and maintenance of the resource
  'distributor', // Party who distributes the resource
  'editor', // party who reviewed or modified the resource to improve the content
  'funder', // party providing monetary support for the resource
  'mediator', // a class of entity that mediates access to the resource and for whom the resource is intended or useful
  'originator', // Party who created the resource
  'owner', // Party that owns the resource
  'point_of_contact', // Party who can be contacted for acquiring knowledge about or acquisition of the resource
  'principal_investigator', // Key party responsible for gathering information and conducting research
  'processor', // Party who has processed the data in a manner such that the resource has been modified
  'publisher', // Party who published the resource
  'resource_provider', // Party that supplies the resource
  'rights_holder', // party owning or managing rights over the resource
  'sponsor', // party that sponsors the resource
  'stakeholder', // party who has an interest in the resource or the use of the resource
  'user', // Party who uses the resource
]

export const RoleLabels = new Map<string, string>([
  ['unspecified', marker('metadata.contactForResource.role.unspecified')],
  ['other', marker('metadata.contactForResource.role.other')],
  ['author', marker('metadata.contactForResource.role.author')],
  ['collaborator', marker('metadata.contactForResource.role.collaborator')],
  ['contributor', marker('metadata.contactForResource.role.contributor')],
  ['custodian', marker('metadata.contactForResource.role.custodian')],
  ['distributor', marker('metadata.contactForResource.role.distributor')],
  ['editor', marker('metadata.contactForResource.role.editor')],
  ['funder', marker('metadata.contactForResource.role.funder')],
  ['mediator', marker('metadata.contactForResource.role.mediator')],
  ['originator', marker('metadata.contactForResource.role.originator')],
  ['owner', marker('metadata.contactForResource.role.owner')],
  [
    'point_of_contact',
    marker('metadata.contactForResource.role.point_of_contact'),
  ],
  [
    'principal_investigator',
    marker('metadata.contactForResource.role.principal_investigator'),
  ],
  ['processor', marker('metadata.contactForResource.role.processor')],
  ['publisher', marker('metadata.contactForResource.role.publisher')],
  [
    'resource_provider',
    marker('metadata.contactForResource.role.resource_provider'),
  ],
  ['rights_holder', marker('metadata.contactForResource.role.rights_holder')],
  ['sponsor', marker('metadata.contactForResource.role.sponsor')],
  ['stakeholder', marker('metadata.contactForResource.role.stakeholder')],
  ['user', marker('metadata.contactForResource.role.user')],
])

export type Role = typeof RoleValues[number]

export interface Individual {
  firstName?: string
  lastName?: string
  email: string
  role: Role
  position?: string
  organization: Organization
  address?: string
  phone?: string
}
