import { Organization } from './organization.model'
import _default from 'chart.js/dist/plugins/plugin.tooltip'

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
