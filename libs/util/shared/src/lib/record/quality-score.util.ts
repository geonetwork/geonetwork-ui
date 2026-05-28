import {
  CatalogRecord,
  RecordKind,
} from '@geonetwork-ui/common/domain/model/record'

type TValidatorEntry = {
  validator: (metadata: Partial<CatalogRecord>) => boolean
  alias?: string
}

type TValidatorMapper = {
  [key: string]: TValidatorEntry
}

const ValidatorMapper: TValidatorMapper = {
  title: { validator: (record) => !!record?.title },
  abstract: { validator: (record) => !!record?.abstract },
  keywords: { validator: (record) => (record?.keywords?.length ?? 0) > 0 },
  legalConstraints: {
    validator: (record) =>
      !!(
        record?.legalConstraints?.length &&
        record.legalConstraints.some((c) => c?.text?.trim().length > 0)
      ),
  },
  contacts: {
    validator: (record) =>
      !!record?.contacts?.[0]?.email &&
      record.contacts[0].email !== 'missing@missing.com',
  },
  updateFrequency: {
    validator: (record) =>
      !!record?.updateFrequency && record.updateFrequency !== 'unknown',
  },
  topics: { validator: (record) => (record?.topics?.length ?? 0) > 0 },
  organisation: {
    validator: (record) => !!record?.contacts?.[0]?.organization?.name,
    alias: 'contacts',
  },
  source: { validator: (record) => !!record?.extras?.sourcesIdentifiers },
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
    validator: () => ValidatorMapper[name].validator(record),
    alias: ValidatorMapper[name].alias,
  }))
}
