import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'
import { HeaderBadgeButtonComponent } from '../header-badge-button/header-badge-button.component'
import { HomeHeaderComponent, SortByParams } from './home-header.component'
import { readFirst } from '@nrwl/angular/testing'
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
  updateSearch: jest.fn(),
  setSearch: jest.fn(),
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
          By.directive(HeaderBadgeButtonComponent)
        )[0]
        latestBadge.componentInstance.action.emit(true)
      })
      it('calls searchFacade setSortBy with correct value', () => {
        expect(searchFacadeMock.setSortBy).toHaveBeenCalledWith(
          SortByParams.CREATE_DATE
        )
      })
      it('resets search filters', () => {
        expect(searchServiceMock.setSearch).toHaveBeenCalledWith({})
      })
    })
    describe('disable sort on CREATE_DATE', () => {
      beforeEach(() => {
        const latestBadge = fixture.debugElement.queryAll(
          By.directive(HeaderBadgeButtonComponent)
        )[0]
        latestBadge.componentInstance.action.emit(false)
      })
      it('sorts on create date', () => {
        expect(searchFacadeMock.setSortBy).toHaveBeenCalledWith('')
      })
      it('resets search filters', () => {
        expect(searchServiceMock.setSearch).toHaveBeenCalledWith({})
      })
    })
    describe('enable sort on USER_SAVED_COUNT', () => {
      beforeEach(() => {
        const mostPopularBadge = fixture.debugElement.queryAll(
          By.directive(HeaderBadgeButtonComponent)
        )[1]
        mostPopularBadge.componentInstance.action.emit(true)
      })
      it('sort on popularity', () => {
        expect(searchFacadeMock.setSortBy).toHaveBeenCalledWith(
          SortByParams.USER_SAVED_COUNT
        )
      })
      it('resets search filters', () => {
        expect(searchServiceMock.setSearch).toHaveBeenCalledWith({})
      })
    })
    describe('disable sort on USER_SAVED_COUNT', () => {
      beforeEach(() => {
        const mostPopularBadge = fixture.debugElement.queryAll(
          By.directive(HeaderBadgeButtonComponent)
        )[1]
        mostPopularBadge.componentInstance.action.emit(false)
      })
      it('sorts on popularity', () => {
        expect(searchFacadeMock.setSortBy).toHaveBeenCalledWith('')
        expect(searchFacadeMock.setSortBy).toHaveBeenCalledTimes(1)
      })
      it('resets search filters', () => {
        expect(searchServiceMock.setSearch).toHaveBeenCalledWith({})
      })
    })
  })
})
