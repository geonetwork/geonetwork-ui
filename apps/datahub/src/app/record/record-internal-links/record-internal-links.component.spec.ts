import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordInternalLinksComponent } from './record-internal-links.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

describe('RecordInternalLinksComponent', () => {
  let component: RecordInternalLinksComponent
  let fixture: ComponentFixture<RecordInternalLinksComponent>

  beforeEach(() => MockBuilder(RecordInternalLinksComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(PlatformServiceInterface, {
          supportsAuthentication: jest.fn(() => true),
        }),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordInternalLinksComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('auth disable functionality', () => {
    it('should enable the favorite toggle when auth is enabled', () => {
      const platformService = TestBed.inject(PlatformServiceInterface)
      jest
        .spyOn(platformService, 'supportsAuthentication')
        .mockReturnValue(true)

      expect(component.shouldShowFavorites).toBe(true)
    })

    it('should disable the favorite toggle when auth is disabled', () => {
      const platformService = TestBed.inject(PlatformServiceInterface)
      jest
        .spyOn(platformService, 'supportsAuthentication')
        .mockReturnValue(false)

      expect(component.shouldShowFavorites).toBe(false)
    })
  })
})
