import { KeywordType } from '@geonetwork-ui/common/domain/model/thesaurus/index.js'

export function getKeywordTypeFromKeywordTypeCode(
  typeCode: string
): KeywordType {
  if (!typeCode) return 'other'
  switch (typeCode) {
    case 'theme':
    case 'place':
    case 'temporal':
    case 'other':
      return typeCode
    default:
      return 'other'
  }
}
