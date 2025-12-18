import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import '../../../../jest.setup'

import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface.js'
import { TranslateModule } from '@ngx-translate/core'
import { ngMocks } from 'ng-mocks'
import { BehaviorSubject } from 'rxjs'
import { SearchFacade } from './lib/state/search.facade.js'
import { SearchService } from './lib/utils/service/search.service.js'

setupZoneTestEnv({ teardown: { destroyAfterEach: false } })

// ng-mocks global configuration
ngMocks.autoSpy('jest')

ngMocks.globalKeep(CommonModule, true)
ngMocks.globalKeep(BrowserModule, true)
ngMocks.globalKeep(TranslateModule, true)

ngMocks.defaultMock(RecordsRepositoryInterface, () => ({
  clearRecordDraft: jest.fn(),
  recordHasDraft: jest.fn(),
}))

ngMocks.defaultMock(SearchFacade, () => ({
  results$: new BehaviorSubject([]),
}))

ngMocks.defaultMock(SearchService, () => ({
  setSortBy: jest.fn(),
}))
