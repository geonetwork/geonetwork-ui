import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  RouterFacade,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import { TranslateModule } from '@ngx-translate/core'
import { readFirst } from '@nx/angular/testing'
import { BehaviorSubject } from 'rxjs'
import {
  ROUTER_ROUTE_NEWS,
  ROUTER_ROUTE_ORGANISATIONS,
} from '../../router/constants'

import { NavigationMenuComponent } from './navigation-menu.component'

const routerFacadeMock = {
  currentRoute$: new BehaviorSubject({
    url: [{ path: ROUTER_ROUTE_NEWS }],
  }),
}

describe('NavigationMenuComponent', () => {
  let component: NavigationMenuComponent
  let fixture: ComponentFixture<NavigationMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [NavigationMenuComponent],
      providers: [
        {
          provide: RouterFacade,
          useValue: routerFacadeMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('should display activeLink$', () => {
    it('displays initially activeLabel for news', async () => {
      const activeLabel = (await readFirst(component.activeLink$)).label
      expect(activeLabel).toEqual('datahub.header.news')
    })
    describe('navigate to search route', () => {
      beforeEach(() => {
        routerFacadeMock.currentRoute$.next({
          url: [{ path: ROUTER_ROUTE_SEARCH }],
        })
      })
      it('displays activeLabel for search', async () => {
        const activeLabel = (await readFirst(component.activeLink$)).label
        expect(activeLabel).toEqual('datahub.header.datasets')
      })
    })
    describe('navigate to organisations route', () => {
      beforeEach(() => {
        routerFacadeMock.currentRoute$.next({
          url: [{ path: ROUTER_ROUTE_ORGANISATIONS }],
        })
      })
      it('displays activeLabel for organisations', async () => {
        const activeLabel = (await readFirst(component.activeLink$)).label
        expect(activeLabel).toEqual('datahub.header.organisations')
      })
    })
    describe('navigate to a route with missing label', () => {
      beforeEach(() => {
        routerFacadeMock.currentRoute$.next({
          url: [{ path: 'ROUTE_WITHOUT_LABEL' }],
        })
      })
      it('displays empty string as activeLabel', async () => {
        const activeLabel = (await readFirst(component.activeLink$)).label
        expect(activeLabel).toEqual('')
      })
    })
  })
})
