export const ES_FIXTURE_AGGS_REQ_TERM = {
  'tag.default': { terms: { field: 'tag.default', include: '.*', size: 10 } },
}
