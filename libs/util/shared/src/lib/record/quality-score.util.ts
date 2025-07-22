import {
  CatalogRecord,
  RecordKind,
} from '@geonetwork-ui/common/domain/model/record'

type TValidatorMapper = {
  [key: string]: (metadata: Partial<CatalogRecord>) => boolean
}

const ValidatorMapper: TValidatorMapper = {
  title: (record) => !!record?.title,
  description: (record) => !!record?.abstract,
  keywords: (record) => (record?.keywords?.length ?? 0) > 0,
  legalConstraints: (record) => (record?.legalConstraints?.length ?? 0) > 0,
  contact: (record) => !!record?.contacts?.[0]?.email,
  updateFrequency: (record) => !!record?.updateFrequency,
  topic: (record) => (record?.topics?.length ?? 0) > 0,
  organisation: (record) => !!record?.contacts?.[0]?.organization?.name,
  capabilities: (record) =>
    record?.onlineResources?.some((resource) =>
      resource?.url?.href.toLowerCase().includes('capabilities')
    ),
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
    'description',
    'keywords',
    'legalConstraints',
    'contact',
  ]

  switch (kind) {
    case 'service':
      kindKeys = ['capabilities']
      break
    case 'reuse':
      kindKeys = ['topic', 'organisation', 'source']
      break
    case 'dataset':
    default:
      kindKeys = ['updateFrequency', 'topic', 'organisation']
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
