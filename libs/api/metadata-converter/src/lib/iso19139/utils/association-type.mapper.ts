import {
  AssociationType,
  associationTypeValues,
} from '@geonetwork-ui/common/domain/model/record'

export function getAssociationTypeFromCode(
  associationTypeCode: string
): AssociationType {
  return associationTypeValues.includes(associationTypeCode as AssociationType)
    ? (associationTypeCode as AssociationType)
    : 'crossReference'
}
