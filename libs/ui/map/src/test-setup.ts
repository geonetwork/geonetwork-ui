import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import '../../../../jest.setup'
import { ngMocks } from 'ng-mocks'
import {
  BASEMAP_LAYERS,
  DO_NOT_USE_DEFAULT_BASEMAP,
  MAP_VIEW_CONSTRAINTS,
} from './lib/components/map-container/map-settings.token'

setupZoneTestEnv({ teardown: { destroyAfterEach: false } })

ngMocks.globalKeep(DO_NOT_USE_DEFAULT_BASEMAP)
ngMocks.globalKeep(BASEMAP_LAYERS)
ngMocks.globalKeep(MAP_VIEW_CONSTRAINTS)
