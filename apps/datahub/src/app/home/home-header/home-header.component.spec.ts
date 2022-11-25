import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { SortByEnum } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { readFirst } from '@nrwl/angular/testing'
import { BehaviorSubject } from 'rxjs'
import { HeaderBadgeButtonComponent } from '../header-badge-button/header-badge-button.component'
import { HomeHeaderComponent } from './home-header.component'
import resetAllMocks = jest.resetAllMocks

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
  }),
}))

const routerFacadeMock = {
  goToMetadata: jest.fn(),
  anySearch$: new BehaviorSubject('scot'),
}

const searchFacadeMock = {
  setFavoritesOnly: jest.fn(),
  setSortBy: jest.fn(),
}

const searchServiceMock = {
  updateSearchFilters: jest.fn(),
  setSearch: jest.fn(),
  setSortBy: jest.fn(),
  setSortAndFilters: jest.fn(),
}

class AuthServiceMock {
  authReady = jest.fn(() => this._authSubject$)
  _authSubject$ = new BehaviorSubject({})
}

describe('HeaderComponent', () => {
  let component: HomeHeaderComponent
  let fixture: ComponentFixture<HomeHeaderComponent>
  let authService: AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [HomeHeaderComponent, HeaderBadgeButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RouterFacade,
          useValue: routerFacadeMock,
        },
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
        {
          provide: SearchService,
          useValue: searchServiceMock,
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compileComponents()
    authService = TestBed.inject(AuthService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })
  afterEach(() => {
    resetAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('favorites badge', () => {
    describe('isAuthenticated$', () => {
      describe('user is authenticated', () => {
        beforeEach(() => {
          ;(authService as any)._authSubject$.next({
            id: 'user-id',
            name: 'testuser',
          })
        })
        it('displays favoriteBadge when authenticated', async () => {
          const isAuthenticated = await readFirst(component.isAuthenticated$)
          expect(isAuthenticated).toEqual(true)
        })
      })
      describe('user is NOT authenticated', () => {
        beforeEach(() => {
          ;(authService as any)._authSubject$.next(null)
        })
        it('does NOT display favoriteBadge when NOT authenticated', async () => {
          const isAuthenticated = await readFirst(component.isAuthenticated$)
          expect(isAuthenticated).toEqual(false)
        })
      })
    })
    describe('#listFavorites', () => {
      beforeEach(() => {
        component.listFavorites(true)
      })
      it('calls searchFacade setFavoritesOnly with correct value', () => {
        expect(searchFacadeMock.setFavoritesOnly).toHaveBeenCalledWith(true)
      })
    })
  })
  describe('sort badges', () => {
    describe('enable sort on CREATE_DATE', () => {
      beforeEach(() => {
        const latestBadge = fixture.debugElement.queryAll(
          By.css('.badge-btn')
        )[0]
        latestBadge.nativeElement.click()
      })
      it('resets filters and sort', () => {
        expect(searchServiceMock.setSortAndFilters).toHaveBeenCalledWith(
          {},
          SortByEnum.CREATE_DATE
        )
      })
    })
    describe('enable sort on USER_SAVED_COUNT', () => {
      beforeEach(() => {
        const mostPopularBadge = fixture.debugElement.queryAll(
          By.css('.badge-btn')
        )[1]
        mostPopularBadge.nativeElement.click()
      })
      it('resets filters and sort', () => {
        expect(searchServiceMock.setSortAndFilters).toHaveBeenCalledWith(
          {},
          SortByEnum.POPULARITY
        )
      })
    })
  })
})
