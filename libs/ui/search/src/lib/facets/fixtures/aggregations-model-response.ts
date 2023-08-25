import { ModelBlock, ModelItem } from '../facets.model'

export const BLOCK_MODEL_FIXTURE: ModelBlock = {
  key: 'tag',
  items: [
    { value: 'Hungary', count: 20, path: ['tag', 'Hungary'] },
    { value: 'Austria', count: 17, path: ['tag', 'Austria'] },
    { value: 'Belgium', count: 17, path: ['tag', 'Belgium'] },
    { value: 'Bulgaria', count: 17, path: ['tag', 'Bulgaria'] },
    { value: 'Croatia', count: 17, path: ['tag', 'Croatia'] },
    { value: 'Cyprus', count: 17, path: ['tag', 'Cyprus'] },
    { value: 'Czechia', count: 17, path: ['tag', 'Czechia'] },
    { value: 'Denmark', count: 17, path: ['tag', 'Denmark'] },
    { value: 'Estonia', count: 17, path: ['tag', 'Estonia'] },
    { value: 'Finland', count: 17, path: ['tag', 'Finland'] },
    { value: 'France', count: 17, path: ['tag', 'France'] },
    { value: 'Germany', count: 17, path: ['tag', 'Germany'] },
    { value: 'Italy', count: 17, path: ['tag', 'Italy'] },
    { value: 'Latvia', count: 17, path: ['tag', 'Latvia'] },
    { value: 'Luxembourg', count: 17, path: ['tag', 'Luxembourg'] },
    { value: 'Malta', count: 17, path: ['tag', 'Malta'] },
    { value: 'Netherlands', count: 17, path: ['tag', 'Netherlands'] },
    { value: 'Poland', count: 17, path: ['tag', 'Poland'] },
    { value: 'Portugal', count: 17, path: ['tag', 'Portugal'] },
    { value: 'Romania', count: 17, path: ['tag', 'Romania'] },
    { value: 'Slovakia', count: 17, path: ['tag', 'Slovakia'] },
  ],
  path: ['tag'],
  type: 'terms',
  size: 21,
  more: true,
  includeFilter: true,
  excludeFilter: false,
}
export const EMPTY_BLOCK_MODEL_FIXTURE: ModelBlock = {
  key: 'emptytag',
  items: [],
  path: ['emptytag'],
  type: 'terms',
  size: 21,
  more: true,
  includeFilter: false,
  excludeFilter: false,
}

export const FACET_ITEM_FIXTURE: ModelItem = {
  path: ['tag.default', 'land use'],
  value: 'land use',
  count: 500,
  selected: true,
  inverted: false,
}
