import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import '../../../../jest.setup'

setupZoneTestEnv({ teardown: { destroyAfterEach: false } })

class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
}

;(window as any).ResizeObserver = ResizeObserverMock
