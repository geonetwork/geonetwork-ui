import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordInternalLinksComponent } from './record-internal-links.component'
import { MockBuilder } from 'ng-mocks'

jest.mock('@geonetwork-ui/util/app-config', () => {
  let _disableAuth = false
  return {
    getMetadataQualityConfig: () => ({ ENABLED: false }),
    getOptionalSearchConfig: () => ({
      LIMIT: 20,
    }),
    getGlobalConfig: () => ({
      DISABLE_AUTH: _disableAuth,
    }),
    _setDisableAuth: (value) => {
      _disableAuth = value
    },
  }
})

describe('RecordInternalLinksComponent', () => {
  let component: RecordInternalLinksComponent
  let fixture: ComponentFixture<RecordInternalLinksComponent>

  beforeEach(() => MockBuilder(RecordInternalLinksComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordInternalLinksComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    const mockAppConfig = jest.requireMock('@geonetwork-ui/util/app-config')
    mockAppConfig._setDisableAuth(false)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('auth disable functionality', () => {
    it('should enable the favorite toggle when auth is enabled', () => {
      const mockAppConfig = jest.requireMock('@geonetwork-ui/util/app-config')
      mockAppConfig._setDisableAuth(false)

      fixture = TestBed.createComponent(RecordInternalLinksComponent)
      component = fixture.componentInstance

      expect(component.shouldShowFavorites).toBe(true)
    })

    it('should disable the favorite toggle when auth is disabled', () => {
      const mockAppConfig = jest.requireMock('@geonetwork-ui/util/app-config')
      mockAppConfig._setDisableAuth(true)

      fixture = TestBed.createComponent(RecordInternalLinksComponent)
      component = fixture.componentInstance

      expect(component.shouldShowFavorites).toBe(false)
    })
  })
})
