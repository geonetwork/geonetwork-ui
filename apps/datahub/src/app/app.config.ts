import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'

export const globalConfigFilters: FieldFilters = {
  resourceType: {
    service: false,
    map: false,
    'map/static': false,
    mapDigital: false,
  },
}
