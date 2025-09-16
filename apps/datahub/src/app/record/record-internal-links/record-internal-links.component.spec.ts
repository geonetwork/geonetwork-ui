import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordInternalLinksComponent } from './record-internal-links.component'
import { MockBuilder } from 'ng-mocks'
import { AuthUtilsService } from '@geonetwork-ui/feature/auth'

describe('RecordInternalLinksComponent', () => {
  let component: RecordInternalLinksComponent
  let fixture: ComponentFixture<RecordInternalLinksComponent>
  let authUtilsService: AuthUtilsService

  beforeEach(() => MockBuilder(RecordInternalLinksComponent))

  beforeEach(async () => {
    const authUtilsServiceSpy = {
      isAuthDisabled: jest.fn().mockReturnValue(false),
    }

    await TestBed.configureTestingModule({
      providers: [{ provide: AuthUtilsService, useValue: authUtilsServiceSpy }],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordInternalLinksComponent)
    component = fixture.componentInstance
    authUtilsService = TestBed.inject(AuthUtilsService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('auth disable functionality', () => {
    it('should return false for isAuthDisabled when auth is enabled', () => {
      jest.spyOn(authUtilsService, 'isAuthDisabled').mockReturnValue(false)

      expect(component.isAuthDisabled).toBe(false)
      expect(component.shouldShowFavorites).toBe(true)
    })

    it('should return true for isAuthDisabled when auth is disabled', () => {
      jest.spyOn(authUtilsService, 'isAuthDisabled').mockReturnValue(true)

      expect(component.isAuthDisabled).toBe(true)
      expect(component.shouldShowFavorites).toBe(false)
    })
  })
})
