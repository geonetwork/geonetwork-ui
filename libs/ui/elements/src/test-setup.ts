import 'jest-preset-angular/setup-jest'
import '../../../../jest.setup'

import { getTestBed } from '@angular/core/testing'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'
import { ngMocks } from 'ng-mocks'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { MatTooltipModule } from '@angular/material/tooltip'

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

// ng-mocks global configuration
ngMocks.autoSpy('jest')

ngMocks.globalKeep(CommonModule, true)
ngMocks.globalKeep(BrowserModule, true)
ngMocks.globalKeep(TranslateModule, true)
ngMocks.globalKeep(MatTooltipModule, true)
