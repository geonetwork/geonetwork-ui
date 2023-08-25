import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthService } from '@geonetwork-ui/feature/auth'
import {
  RouterFacade,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import {
  FieldsService,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, firstValueFrom, of } from 'rxjs'
import { ROUTER_ROUTE_NEWS } from '../../router/constants'
import { HeaderBadgeButtonComponent } from '../header-badge-button/header-badge-button.component'
import { HomeHeaderComponent } from './home-header.component'
import resetAllMocks = jest.resetAllMocks
import { SortByEnum } from '@geonetwork-ui/common/domain/search'
import { _setLanguages } from '@geonetwork-ui/util/app-config'

jest.mock('@geonetwork-ui/util/app-config', () => {
  let _languages = ['pt', 'de']
  return {
    getThemeConfig: () => ({
      HEADER_BACKGROUND: 'red',
    }),
    getOptionalSearchConfig: () => ({
      SEARCH_PRESET: [
        {
          sort: '-createDate',
          name: 'sortCeatedDateAndOrg',
          filters: { publisher: ['DREAL'] },
        },
        {
          sort: 'title',
          name: 'filterCarto',
          filters: { q: 'Cartographie' },
        },
      ],
    }),
    getGlobalConfig() {
      return {
        LANGUAGES: _languages,
      }
    },

    _setLanguages(lang) {
      _languages = lang
    },
  }
})

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

class FieldsServiceMock {
  buildFiltersFromFieldValues = jest.fn(() => of({ thisIs: 'a fake filter' }))
}

describe('HeaderComponent', () => {
  let component: HomeHeaderComponent
  let fixture: ComponentFixture<HomeHeaderComponent>
  let authService: AuthService
  let searchService: SearchService
  let searchFacade: SearchFacade
  let routerFacade: RouterFacade

  beforeEach(async () => {
    _setLanguages(['fr', 'de'])
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
        {
          provide: FieldsService,
          useClass: FieldsServiceMock,
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
          const isAuthenticated = await firstValueFrom(
            component.isAuthenticated$
          )
          expect(isAuthenticated).toEqual(true)
        })
      })
      describe('user is NOT authenticated', () => {
        beforeEach(() => {
          ;(authService as any)._authSubject$.next(null)
        })
        it('does NOT display favoriteBadge when NOT authenticated', async () => {
          const isAuthenticated = await firstValueFrom(
            component.isAuthenticated$
          )
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
        const displaySortBadges = await firstValueFrom(
          component.displaySortBadges$
        )
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
        const displaySortBadges = await firstValueFrom(
          component.displaySortBadges$
        )
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
            { thisIs: 'a fake filter' },
            SortByEnum.CREATE_DATE
          )
        })
      })

      describe('language switcher', () => {
        describe('given predefined languages', () => {
          it('should display language switcher', () => {
            const languageSwitcher = fixture.debugElement.queryAll(
              By.css('.language-switcher')
            )[0]
            expect(languageSwitcher).toBeTruthy()
          })
        })
        describe('given predefined languages as empty Array', () => {
          beforeEach(() => {
            _setLanguages([])
            fixture = TestBed.createComponent(HomeHeaderComponent)
            fixture.detectChanges()
          })
          it('should not display language switcher', () => {
            const languageSwitcher = fixture.debugElement.queryAll(
              By.css('.language-switcher')
            )[0]
            expect(languageSwitcher).toBeFalsy()
          })
        })
        describe('no predefined languages', () => {
          beforeEach(() => {
            _setLanguages(undefined)
            fixture = TestBed.createComponent(HomeHeaderComponent)
            fixture.detectChanges()
          })
          it('should not display language switcher', () => {
            const languageSwitcher = fixture.debugElement.queryAll(
              By.css('.language-switcher')
            )[0]
            expect(languageSwitcher).toBeFalsy()
          })
        })
      })
    })
  })
})
