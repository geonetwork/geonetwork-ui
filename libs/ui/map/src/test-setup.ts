import 'jest-preset-angular/setup-jest'
import '../../../../jest.setup'

import { getTestBed } from '@angular/core/testing'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'
import { ngMocks } from 'ng-mocks'
import {
  BASEMAP_LAYERS,
  DO_NOT_USE_DEFAULT_BASEMAP,
  MAP_VIEW_CONSTRAINTS,
} from './lib/components/map-container/map-settings.token'

getTestBed().resetTestEnvironment()
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: false } }
)

ngMocks.globalKeep(DO_NOT_USE_DEFAULT_BASEMAP)
ngMocks.globalKeep(BASEMAP_LAYERS)
ngMocks.globalKeep(MAP_VIEW_CONSTRAINTS)
