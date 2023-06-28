import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthService } from '@geonetwork-ui/feature/auth'
import {
  RouterFacade,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { SortByEnum } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { readFirst } from '@nrwl/angular/testing'
import { BehaviorSubject } from 'rxjs'
import { ROUTER_ROUTE_NEWS } from '../../router/constants'
import { HeaderBadgeButtonComponent } from '../header-badge-button/header-badge-button.component'
import { HomeHeaderComponent } from './home-header.component'
import resetAllMocks = jest.resetAllMocks

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
  }),
  getOptionalSearchConfig: () => ({
    SEARCH_PRESET: [
      {
        _sort: '-createDate',
        name: 'sortCeatedDateAndOrg',
        OrgForResource: ['DREAL'],
      },
      {
        _sort: '-createDate',
        name: 'filterCarto',
        any: 'Cartographie',
      },
    ],
  }),
}))

class routerFacadeMock {
  goToMetadata = jest.fn()
  anySearch$ = new BehaviorSubject('scot')
  currentRoute$ = new BehaviorSubject({})
}

class searchFacadeMock {
  setFavoritesOnly = jest.fn()
  setSortBy = jest.fn()
}

class searchServiceMock {
  updateSearchFilters = jest.fn()
  setSearch = jest.fn()
  setSortBy = jest.fn()
  setSortAndFilters = jest.fn()
}

class AuthServiceMock {
  authReady = jest.fn(() => this._authSubject$)
  _authSubject$ = new BehaviorSubject({})
}

describe('HeaderComponent', () => {
  let component: HomeHeaderComponent
  let fixture: ComponentFixture<HomeHeaderComponent>
  let authService: AuthService
  let searchService: SearchService
  let searchFacade: SearchFacade
  let routerFacade: RouterFacade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [HomeHeaderComponent, HeaderBadgeButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RouterFacade,
          useClass: routerFacadeMock,
        },
        {
          provide: SearchFacade,
          useClass: searchFacadeMock,
        },
        {
          provide: SearchService,
          useClass: searchServiceMock,
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compileComponents()
    authService = TestBed.inject(AuthService)
    searchService = TestBed.inject(SearchService)
    searchFacade = TestBed.inject(SearchFacade)
    routerFacade = TestBed.inject(RouterFacade)
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
        expect(searchFacade.setFavoritesOnly).toHaveBeenCalledWith(true)
      })
    })
  })
  describe('sort badges', () => {
    describe('navigate to search route', () => {
      beforeEach(() => {
        ;(routerFacade.currentRoute$ as any).next({
          url: [{ path: ROUTER_ROUTE_SEARCH }],
        })
      })
      it('displays sort badges on search route', async () => {
        const displaySortBadges = await readFirst(component.displaySortBadges$)
        expect(displaySortBadges).toEqual(true)
      })
    })
    describe('navigate to news route', () => {
      beforeEach(() => {
        ;(routerFacade.currentRoute$ as any).next({
          url: [{ path: ROUTER_ROUTE_NEWS }],
        })
      })
      it('displays sort badges on news route', async () => {
        const displaySortBadges = await readFirst(component.displaySortBadges$)
        expect(displaySortBadges).toEqual(true)
      })

      describe('enable sort on CREATE_DATE', () => {
        beforeEach(() => {
          const latestBadge = fixture.debugElement.queryAll(
            By.css('.badge-btn')
          )[0]
          latestBadge.nativeElement.click()
        })
        it('resets filters and sort', () => {
          expect(searchService.setSortAndFilters).toHaveBeenCalledWith(
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
          expect(searchService.setSortAndFilters).toHaveBeenCalledWith(
            {},
            SortByEnum.POPULARITY
          )
        })
      })

      describe('given predefined search params', () => {
        it('should render badges', () => {
          const allBadges = fixture.debugElement.queryAll(By.css('.badge-btn'))
          expect(allBadges.length).toBe(4)
        })
        beforeEach(() => {
          const firstCustomBadge = fixture.debugElement.queryAll(
            By.css('.badge-btn')
          )[2]
          firstCustomBadge.nativeElement.click()
        })
        it('should redirect correctly', () => {
          expect(searchService.setSortAndFilters).toHaveBeenCalledWith(
            { OrgForResource: { DREAL: true } },
            SortByEnum.CREATE_DATE
          )
        })
      })
    })
  })
})
