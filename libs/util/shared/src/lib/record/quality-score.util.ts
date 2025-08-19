import {
  CatalogRecord,
  RecordKind,
} from '@geonetwork-ui/common/domain/model/record'

type TValidatorMapper = {
  [key: string]: (metadata: Partial<CatalogRecord>) => boolean
}

const ValidatorMapper: TValidatorMapper = {
  title: (record) => !!record?.title,
  abstract: (record) => !!record?.abstract,
  keywords: (record) => (record?.keywords?.length ?? 0) > 0,
  legalConstraints: (record) => (record?.legalConstraints?.length ?? 0) > 0,
  contacts: (record) =>
    !!record?.contacts?.[0]?.email &&
    record.contacts[0].email !== 'missing@missing.com',
  updateFrequency: (record) =>
    !!record?.updateFrequency && record.updateFrequency !== 'unknown',
  topics: (record) => (record?.topics?.length ?? 0) > 0,
  organisation: (record) => !!record?.contacts?.[0]?.organization?.name,
  source: (record) => !!record?.extras?.sourcesIdentifiers,
} as const

export type ValidatorMapperKeys = keyof typeof ValidatorMapper & string

export function getAllKeysValidator() {
  return Object.keys(ValidatorMapper)
}

function getMappersFromKind(kind: RecordKind) {
  let kindKeys = <ValidatorMapperKeys[]>[]
  const commonsKeys = <ValidatorMapperKeys[]>[
    'title',
    'abstract',
    'keywords',
    'legalConstraints',
    'contacts',
  ]

  switch (kind) {
    case 'reuse':
      kindKeys = ['topics', 'organisation', 'source']
      break
    case 'service':
      kindKeys = []
      break
    case 'dataset':
    default:
      kindKeys = ['updateFrequency', 'topics', 'organisation']
  }

  return [...commonsKeys, ...kindKeys]
}

export function getQualityValidators(
  record: Partial<CatalogRecord>,
  propsToValidate: ValidatorMapperKeys[]
) {
  const filteredProps = propsToValidate.filter((prop) =>
    getMappersFromKind(record.kind).includes(prop)
  )

  return filteredProps.map((name) => ({
    name,
    validator: () => ValidatorMapper[name](record),
  }))
}
