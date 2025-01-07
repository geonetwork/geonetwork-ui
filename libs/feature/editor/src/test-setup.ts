import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import '../../../../jest.setup'
import { ngMocks } from 'ng-mocks'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { EditorFacade } from './lib/+state/editor.facade'
import { EMPTY } from 'rxjs'

setupZoneTestEnv({ teardown: { destroyAfterEach: false } })

// ng-mocks global configuration
ngMocks.autoSpy('jest')

ngMocks.globalKeep(CommonModule, true)
ngMocks.globalKeep(BrowserModule, true)
ngMocks.globalKeep(TranslateModule, true)

ngMocks.defaultMock(EditorFacade, () => ({
  record$: EMPTY,
}))
