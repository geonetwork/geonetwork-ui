import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  ROUTER_ROUTE_SEARCH,
  RouterFacade,
} from '@geonetwork-ui/feature/router'
import {
  FieldsService,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { BehaviorSubject, firstValueFrom, of } from 'rxjs'
import { ROUTER_ROUTE_NEWS } from '../../router/constants'
import { HomeHeaderComponent } from './home-header.component'
import { SortByEnum } from '@geonetwork-ui/common/domain/model/search'
import { _setLanguages } from '@geonetwork-ui/util/app-config'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { MockBuilder } from 'ng-mocks'
import resetAllMocks = jest.resetAllMocks

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
          filters: { organization: ['DREAL'] },
        },
        {
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
  sortBy$ = new BehaviorSubject(['desc', 'createDate'])
}

class searchServiceMock {
  updateSearchFilters = jest.fn()
  setSearch = jest.fn()
  setSortBy = jest.fn()
  setSortAndFilters = jest.fn()
  setFilters = jest.fn()
}

class PlatformServiceMock {
  isAnonymous = jest.fn(() => this._isAnonymous$)
  _isAnonymous$ = new BehaviorSubject(true)
  translateKey = jest.fn()
}

class FieldsServiceMock {
  buildFiltersFromFieldValues = jest.fn(() => of({ thisIs: 'a fake filter' }))
}

describe('HomeHeaderComponent', () => {
  let component: HomeHeaderComponent
  let fixture: ComponentFixture<HomeHeaderComponent>
  let searchService: SearchService
  let searchFacade: SearchFacade
  let routerFacade: RouterFacade
  let platform: PlatformServiceInterface

  beforeEach(() => MockBuilder(HomeHeaderComponent))

  beforeEach(async () => {
    _setLanguages(['fr', 'de'])
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
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
          provide: PlatformServiceInterface,
          useClass: PlatformServiceMock,
        },
        {
          provide: FieldsService,
          useClass: FieldsServiceMock,
        },
      ],
    }).compileComponents()
    searchService = TestBed.inject(SearchService)
    searchFacade = TestBed.inject(SearchFacade)
    routerFacade = TestBed.inject(RouterFacade)
    platform = TestBed.inject(PlatformServiceInterface)
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
          ;(platform as any)._isAnonymous$.next(false)
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
          ;(platform as any)._isAnonymous$.next(true)
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
        describe('when sort is defined', () => {
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
        describe('when sort is not defined', () => {
          beforeEach(() => {
            const secondCustomBadge = fixture.debugElement.queryAll(
              By.css('.badge-btn')
            )[3]
            secondCustomBadge.nativeElement.click()
          })
          it('should redirect correctly', () => {
            expect(searchService.setFilters).toHaveBeenCalledWith({
              thisIs: 'a fake filter',
            })
          })
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
