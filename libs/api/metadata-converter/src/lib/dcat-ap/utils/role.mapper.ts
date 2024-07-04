import { Role } from '@geonetwork-ui/common/domain/model/record'

export function getRoleFromRoleCode(roleCode: string): Role {
  if (!roleCode) return 'unspecified'
  switch (roleCode) {
    case 'author':
    case 'coAuthor':
      return 'author'
    case 'originator':
      return 'originator'
    case 'principalInvestigator':
      return 'principal_investigator'
    case 'resourceProvider':
      return 'resource_provider'
    case 'processor':
      return 'processor'
    case 'custodian':
      return 'custodian'
    case 'owner':
      return 'owner'
    case 'pointOfContact':
      return 'point_of_contact'
    case 'publisher':
      return 'publisher'
    case 'distributor':
      return 'distributor'
    case 'user':
      return 'user'
    case 'collaborator':
      return 'collaborator'
    case 'editor':
      return 'editor'
    case 'contributor':
      return 'contributor'
    case 'stakeholder':
      return 'stakeholder'
    case 'sponsor':
      return 'sponsor'
    case 'funder':
      return 'funder'
    case 'rightsHolder':
      return 'rights_holder'
    case 'mediator':
      return 'mediator'
    default:
      return 'other'
  }
}
