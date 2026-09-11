import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import '../../../../jest.setup'
import { ngMocks } from 'ng-mocks'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MediaMatcher } from '@angular/cdk/layout'
import { FocusMonitor } from '@angular/cdk/a11y'

setupZoneTestEnv({ teardown: { destroyAfterEach: false } })

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
// MatTooltip now checks prefers-reduced-motion on construction via
// MediaMatcher; auto-mocking it returns undefined and crashes rendering.
ngMocks.globalKeep(MediaMatcher, true)
ngMocks.globalKeep(FocusMonitor, true)
