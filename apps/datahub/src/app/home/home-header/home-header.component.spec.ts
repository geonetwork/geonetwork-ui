import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'
import { HomeHeaderComponent, SortByParams } from './home-header.component'
import { readFirst } from '@nrwl/angular/testing'

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
      declarations: [HomeHeaderComponent],
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
