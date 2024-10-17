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
import { EditorFacade } from './lib/+state/editor.facade'
import { EMPTY } from 'rxjs'

getTestBed().resetTestEnvironment()
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: false } }
)

// ng-mocks global configuration
ngMocks.autoSpy('jest')

ngMocks.globalKeep(CommonModule, true)
ngMocks.globalKeep(BrowserModule, true)
ngMocks.globalKeep(TranslateModule, true)

ngMocks.defaultMock(EditorFacade, () => ({
  record$: EMPTY,
}))
