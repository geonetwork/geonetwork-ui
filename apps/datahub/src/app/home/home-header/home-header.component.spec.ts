import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  RouterFacade,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import { SearchService } from '@geonetwork-ui/feature/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'
import {
  ROUTER_ROUTE_HOME,
  ROUTER_ROUTE_NEWS,
  ROUTER_ROUTE_ORGANISATION,
} from '../../router/constants'

import { HomeHeaderComponent } from './home-header.component'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
  }),
}))

const routerFacadeMock = {
  go: jest.fn(),
  goToMetadata: jest.fn(),
  anySearch$: new BehaviorSubject('scot'),
  currentRoute$: new BehaviorSubject('search'),
}

const searchServiceMock = {
  updateSearch: jest.fn(),
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
          provide: SearchService,
          useValue: searchServiceMock,
        },
      ],
    }).compileComponents()
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
    it('calls routerFacade go with correct route when clicking news', () => {
      component.onNewsClick()
      expect(routerFacadeMock.go).toHaveBeenCalledWith({
        path: `${ROUTER_ROUTE_HOME}/${ROUTER_ROUTE_NEWS}`,
      })
    })
    it('calls routerFacade go with correct route when clicking organisations', () => {
      component.onOrganisationsClick()
      expect(routerFacadeMock.go).toHaveBeenCalledWith({
        path: `${ROUTER_ROUTE_HOME}/${ROUTER_ROUTE_ORGANISATION}`,
      })
    })
    describe('click datasets tab', () => {
      beforeEach(() => {
        component.onDatasetsClick()
      })
      it('calls routerFacade go with correct route when clicking datasets', () => {
        expect(routerFacadeMock.go).toHaveBeenCalledWith({
          path: `${ROUTER_ROUTE_HOME}/${ROUTER_ROUTE_SEARCH}`,
        })
      })
      it('calls searchService updateSearch with empty object', () => {
        expect(searchServiceMock.updateSearch).toHaveBeenCalledWith({})
      })
    })
  })
})
