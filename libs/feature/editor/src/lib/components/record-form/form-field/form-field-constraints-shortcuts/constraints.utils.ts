import { Constraint } from '@geonetwork-ui/common/domain/model/record'

export const NOT_APPLICABLE_CONSTRAINT: Constraint = {
  text: 'No conditions apply to access and use',
  url: new URL(
    'http://inspire.ec.europa.eu/metadata-codelist/ConditionsApplyingToAccessAndUse/noConditionsApply'
  ),
}
export const NOT_KNOWN_CONSTRAINT: Constraint = {
  text: 'Conditions unknown',
  url: new URL(
    'http://inspire.ec.europa.eu/metadata-codelist/ConditionsApplyingToAccessAndUse/conditionsUnknown'
  ),
}

export function matchesNoApplicableConstraint(constraint: Constraint): boolean {
  if (constraint.url?.toString() === NOT_APPLICABLE_CONSTRAINT.url.toString()) {
    return true
  }
  const match = (text: string) => {
    if (!text) return false
    const trimmed = text.toLowerCase().trim()
    return (
      trimmed == 'no conditions apply' ||
      trimmed == 'no conditions apply to access and use' ||
      trimmed == "aucune condition ne s'applique"
    )
  }
  return match(constraint.text) || match(constraint.translations?.text?.en)
}

export function matchesNoKnownConstraint(constraint: Constraint): boolean {
  if (constraint.url?.toString() === NOT_KNOWN_CONSTRAINT.url.toString()) {
    return true
  }
  const match = (text: string) => {
    if (!text) return false
    const trimmed = text.toLowerCase().trim()
    return trimmed == 'conditions unknown' || trimmed == 'conditions inconnues'
  }
  return match(constraint.text) || match(constraint.translations?.text?.en)
}
