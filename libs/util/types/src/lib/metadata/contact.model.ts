import { Organization } from './organisation.model'

export enum Role {
  UNSPECIFIED = 'UNSPECIFIED',
  OTHER = 'OTHER',
  AUTHOR = 'AUTHOR', // Party who authored the resource
  COLLABORATOR = 'COLLABORATOR', // party who assists with the generation of the resource other than the principal investigator
  CONTRIBUTOR = 'CONTRIBUTOR', // party contributing to the resource
  CUSTODIAN = 'CUSTODIAN', // Party that accepts accountability and responsibility for the data and ensures appropriate care and maintenance of the resource
  DISTRIBUTOR = 'DISTRIBUTOR', // Party who distributes the resource
  EDITOR = 'EDITOR', // party who reviewed or modified the resource to improve the content
  FUNDER = 'FUNDER', // party providing monetary support for the resource
  MEDIATOR = 'MEDIATOR', // a class of entity that mediates access to the resource and for whom the resource is intended or useful
  ORIGINATOR = 'ORIGINATOR', // Party who created the resource
  OWNER = 'OWNER', // Party that owns the resource
  POINT_OF_CONTACT = 'POINT_OF_CONTACT', // Party who can be contacted for acquiring knowledge about or acquisition of the resource
  PRINCIPAL_INVESTIGATOR = 'PRINCIPAL_INVESTIGATOR', // Key party responsible for gathering information and conducting research
  PROCESSOR = 'PROCESSOR', // Party who has processed the data in a manner such that the resource has been modified
  PUBLISHER = 'PUBLISHER', // Party who published the resource
  RESOURCE_PROVIDER = 'RESOURCE_PROVIDER', // Party that supplies the resource
  RIGHTS_HOLDER = 'RIGHTS_HOLDER', // party owning or managing rights over the resource
  SPONSOR = 'SPONSOR', // party that sponsors the resource
  STAKEHOLDER = 'STAKEHOLDER', // party who has an interest in the resource or the use of the resource
  USER = 'USER', // Party who uses the resource
}

export interface Individual {
  firstName?: string
  lastName?: string
  email: string
  role: Role
  position?: string
  organization: Organization
  // to add: address, phone
}
