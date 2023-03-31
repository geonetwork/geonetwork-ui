import { Role } from '@geonetwork-ui/util/types/metadata'

export function getRoleFromRoleCode(roleCode: string): Role {
  if (!roleCode) return Role.UNSPECIFIED
  switch (roleCode) {
    case 'author':
    case 'coAuthor':
      return Role.AUTHOR
    case 'originator':
      return Role.ORIGINATOR
    case 'principalInvestigator':
      return Role.PRINCIPAL_INVESTIGATOR
    case 'resourceProvider':
      return Role.RESOURCE_PROVIDER
    case 'processor':
      return Role.PROCESSOR
    case 'custodian':
      return Role.CUSTODIAN
    case 'owner':
      return Role.OWNER
    case 'pointOfContact':
      return Role.POINT_OF_CONTACT
    case 'publisher':
      return Role.PUBLISHER
    case 'distributor':
      return Role.DISTRIBUTOR
    case 'user':
      return Role.USER
    case 'collaborator':
      return Role.COLLABORATOR
    case 'editor':
      return Role.EDITOR
    case 'contributor':
      return Role.CONTRIBUTOR
    case 'stakeholder':
      return Role.STAKEHOLDER
    case 'sponsor':
      return Role.SPONSOR
    case 'funder':
      return Role.FUNDER
    case 'rightsHolder':
      return Role.RIGHTS_HOLDER
    case 'mediator':
      return Role.MEDIATOR
    default:
      return Role.OTHER
  }
}
