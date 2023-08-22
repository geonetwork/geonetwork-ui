import 'jest-preset-angular/setup-jest'
import '../../../../jest.setup'
import { getTestBed } from '@angular/core/testing'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'
import fetch from 'fetch-mock-jest'

global.fetch = fetch as never

getTestBed().resetTestEnvironment()
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: false } }
)
