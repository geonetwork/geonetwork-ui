import 'jest-preset-angular/setup-jest'
import '../../../jest.setup'

import { CommonModule } from '@angular/common'
import { getTestBed } from '@angular/core/testing'
import { BrowserModule } from '@angular/platform-browser'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'
import { RouterModule } from '@angular/router'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { ngMocks } from 'ng-mocks'
import { BehaviorSubject, EMPTY } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'

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
ngMocks.globalKeep(RouterModule, true)
ngMocks.globalKeep(TranslateModule, true)

ngMocks.defaultMock(AvatarServiceInterface, () => ({
  getPlaceholder: jest.fn(),
}))

ngMocks.defaultMock(PlatformServiceInterface, () => ({
  getMe: jest.fn(() => EMPTY),
}))

ngMocks.defaultMock(RecordsRepositoryInterface, () => ({
  deleteRecord: jest.fn(() => EMPTY),
  draftsChanged$: EMPTY,
}))

ngMocks.defaultMock(SearchFacade, () => ({
  results$: new BehaviorSubject([]),
}))
