export const ES_FIXTURE_AGGS_REQ_TERM = {
  tag: { terms: { field: 'tag', include: '.*', size: 10 } },
}
