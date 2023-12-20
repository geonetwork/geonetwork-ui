import 'jest-preset-angular/setup-jest'
import '../../../jest.setup'

class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
}

;(window as any).ResizeObserver = ResizeObserverMock
