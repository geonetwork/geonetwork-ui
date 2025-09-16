import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordInternalLinksComponent } from './record-internal-links.component'
import { MockBuilder } from 'ng-mocks'

// Mock getGlobalConfig
jest.mock('@geonetwork-ui/util/app-config', () => ({
  ...jest.requireActual('@geonetwork-ui/util/app-config'),
  getGlobalConfig: jest.fn(),
}))

import { getGlobalConfig } from '@geonetwork-ui/util/app-config'

describe('RecordInternalLinksComponent', () => {
  let component: RecordInternalLinksComponent
  let fixture: ComponentFixture<RecordInternalLinksComponent>
  let mockGetGlobalConfig: jest.MockedFunction<typeof getGlobalConfig>

  beforeEach(() => MockBuilder(RecordInternalLinksComponent))

  beforeEach(async () => {
    mockGetGlobalConfig = getGlobalConfig as jest.MockedFunction<
      typeof getGlobalConfig
    >

    fixture = TestBed.createComponent(RecordInternalLinksComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('auth disable functionality', () => {
    it('should return false for isAuthDisabled when DISABLE_AUTH is false', () => {
      mockGetGlobalConfig.mockReturnValue({ DISABLE_AUTH: false } as ReturnType<
        typeof getGlobalConfig
      >)

      expect(component.isAuthDisabled).toBe(false)
      expect(component.shouldShowFavorites).toBe(true)
    })

    it('should return true for isAuthDisabled when DISABLE_AUTH is true', () => {
      mockGetGlobalConfig.mockReturnValue({ DISABLE_AUTH: true } as ReturnType<
        typeof getGlobalConfig
      >)

      expect(component.isAuthDisabled).toBe(true)
      expect(component.shouldShowFavorites).toBe(false)
    })

    it('should return false for isAuthDisabled when config throws error', () => {
      mockGetGlobalConfig.mockImplementation(() => {
        throw new Error('Config not available')
      })

      expect(component.isAuthDisabled).toBe(false)
      expect(component.shouldShowFavorites).toBe(true)
    })

    it('should return false for isAuthDisabled when DISABLE_AUTH is undefined', () => {
      mockGetGlobalConfig.mockReturnValue(
        {} as ReturnType<typeof getGlobalConfig>
      )

      expect(component.isAuthDisabled).toBe(false)
      expect(component.shouldShowFavorites).toBe(true)
    })
  })
})
