import 'jest-preset-angular/setup-jest'
import '../../../../jest.setup'

import { getTestBed } from '@angular/core/testing'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'

getTestBed().resetTestEnvironment()
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: false } }
)

class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
}

;(window as any).ResizeObserver = ResizeObserverMock
