import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthService } from '@geonetwork-ui/feature/auth'
import {
  RouterFacade,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'
import { HomeHeaderComponent, SortByParams } from './home-header.component'
import { readFirst } from '@nrwl/angular/testing'
import { ROUTER_ROUTE_NEWS } from '../../router/constants'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
  }),
}))

const routerFacadeMock = {
  goToMetadata: jest.fn(),
  anySearch$: new BehaviorSubject('scot'),
  currentRoute$: new BehaviorSubject({}),
}

const searchFacadeMock = {
  setFavoritesOnly: jest.fn(),
  setSortBy: jest.fn(),
}

const searchServiceMock = {
  updateSearch: jest.fn(),
}

class AuthServiceMock {
  authReady = jest.fn(() => this._authSubject$)
  _authSubject$ = new BehaviorSubject({})
}
/* eslint-disable */
@Component({
  selector: 'gn-ui-fuzzy-search',
  template: '',
})
class FuzzySearchComponentMock {
  @Input() value?: MetadataRecord
}
/* eslint-enable */

describe('HeaderComponent', () => {
  let component: HomeHeaderComponent
  let fixture: ComponentFixture<HomeHeaderComponent>
  let authService: AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [HomeHeaderComponent, FuzzySearchComponentMock],
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

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('search route parameter', () => {
    it('passed to fuzzy search as AutoComplete item object', () => {
      const fuzzyCpt = fixture.debugElement.query(
        By.directive(FuzzySearchComponentMock)
      ).componentInstance
      expect(fuzzyCpt.value).toEqual({ title: 'scot' })
    })
    it('value is changed on route update', () => {
      routerFacadeMock.anySearch$.next('river')
      const fuzzyCpt = fixture.debugElement.query(
        By.directive(FuzzySearchComponentMock)
      ).componentInstance
      fixture.detectChanges()

      expect(fuzzyCpt.value).toEqual({ title: 'river' })
    })
  })
  describe('tabs navigation', () => {
    describe('click datasets tab', () => {
      beforeEach(() => {
        component.updateSearch()
      })
      it('calls searchService updateSearch with empty object', () => {
        expect(searchServiceMock.updateSearch).toHaveBeenCalledWith({})
      })
    })
  })
  describe('favorites badge', () => {
    describe('displayFavoritesBadge$', () => {
      describe('navigate to search route (authenticated)', () => {
        beforeEach(() => {
          ;(authService as any)._authSubject$.next({
            id: 'user-id',
            name: 'testuser',
          })
          routerFacadeMock.currentRoute$.next({
            url: [{ path: ROUTER_ROUTE_SEARCH }],
          })
        })
        it('displays favoriteBadge when authenticated and on search route', async () => {
          const displayFavoritesBadge = await readFirst(
            component.displayFavoritesBadge$
          )
          expect(displayFavoritesBadge).toEqual(true)
        })
      })
      describe('navigate to news route (authenticated)', () => {
        beforeEach(() => {
          ;(authService as any)._authSubject$.next({
            id: 'user-id',
            name: 'testuser',
          })
          routerFacadeMock.currentRoute$.next({
            url: [{ path: ROUTER_ROUTE_NEWS }],
          })
        })
        it('does not display favoriteBadge when authenticated and on news route', async () => {
          const displayFavoritesBadge = await readFirst(
            component.displayFavoritesBadge$
          )
          expect(displayFavoritesBadge).toEqual(false)
        })
      })
      describe('navigate to search route (NOT authenticated)', () => {
        beforeEach(() => {
          ;(authService as any)._authSubject$.next(null)
          routerFacadeMock.currentRoute$.next({
            url: [{ path: ROUTER_ROUTE_SEARCH }],
          })
        })
        it('does NOT display favoriteBadge when NOT authenticated and on search route', async () => {
          const displayFavoritesBadge = await readFirst(
            component.displayFavoritesBadge$
          )
          expect(displayFavoritesBadge).toEqual(false)
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
    describe('display badges', () => {
      describe('navigate to search route (NOT authenticated)', () => {
        beforeEach(() => {
          ;(authService as any)._authSubject$.next(null)
          routerFacadeMock.currentRoute$.next({
            url: [{ path: ROUTER_ROUTE_SEARCH }],
          })
        })
        it('displays sort badges when authenticated and on search route', async () => {
          const displaySortBadges = await readFirst(
            component.displaySortBadges$
          )
          expect(displaySortBadges).toEqual(true)
        })
      })
      describe('navigate to news route (NOT authenticated)', () => {
        beforeEach(() => {
          ;(authService as any)._authSubject$.next(null)
          routerFacadeMock.currentRoute$.next({
            url: [{ path: ROUTER_ROUTE_NEWS }],
          })
        })
        it('does not display sort badges when authenticated and on news route', async () => {
          const displaySortBadges = await readFirst(
            component.displaySortBadges$
          )
          expect(displaySortBadges).toEqual(false)
        })
      })
    })
    describe('#setsortBy CREATE_DATE', () => {
      beforeEach(() => {
        component.setSortBy(true, SortByParams.CREATE_DATE)
      })
      it('calls searchFacade setSortBy with correct value', () => {
        expect(searchFacadeMock.setSortBy).toHaveBeenCalledWith(
          SortByParams.CREATE_DATE
        )
      })
    })
    describe('#setsortBy empty', () => {
      beforeEach(() => {
        component.setSortBy(false, SortByParams.CREATE_DATE)
      })
      it('calls searchFacade setSortBy with correct value', () => {
        expect(searchFacadeMock.setSortBy).toHaveBeenCalledWith('')
      })
    })
    describe('#setsortBy USER_SAVED_COUNT', () => {
      beforeEach(() => {
        component.setSortBy(true, SortByParams.USER_SAVED_COUNT)
      })
      it('calls searchFacade setSortBy with correct value', () => {
        expect(searchFacadeMock.setSortBy).toHaveBeenCalledWith(
          SortByParams.USER_SAVED_COUNT
        )
      })
    })
  })
})
