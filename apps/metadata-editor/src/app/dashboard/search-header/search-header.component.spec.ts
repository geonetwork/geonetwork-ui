import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchHeaderComponent } from './search-header.component'
import { BehaviorSubject, of } from 'rxjs'
import { summaryHits, USER_FIXTURE } from '@geonetwork-ui/common/fixtures'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import {
  AuthService,
  AvatarServiceInterface,
} from '@geonetwork-ui/api/repository/gn4'

const user = USER_FIXTURE()
class AuthServiceMock {
  user$ = new BehaviorSubject(user)
  authReady = jest.fn(() => this._authSubject$)
  _authSubject$ = new BehaviorSubject({})
}

class AvatarServiceInterfaceMock {
  placeholder = 'http://placeholder.com'
  getProfileIcon = (hash: string) => `${hash}`
}

class OrganisationsServiceMock {
  organisationsCount$ = of(456)
}
class SearchFacadeMock {
  init = jest.fn()
  results$ = of(summaryHits)
  setPagination = jest.fn(() => this)
  setSortBy = jest.fn(() => this)
  setConfigRequestFields = jest.fn(() => this)
  setResultsLayout = jest.fn(() => this)
  searchFilters$ = new BehaviorSubject(user)
  authReady = jest.fn(() => this.searchFilters$)
}

class searchServiceMock {
  updateSearchFilters = jest.fn()
  setSearch = jest.fn()
  setSortBy = jest.fn()
  setSortAndFilters = jest.fn()
}

describe('SearchHeaderComponent', () => {
  let component: SearchHeaderComponent
  let fixture: ComponentFixture<SearchHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchHeaderComponent,
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        {
          provide: AvatarServiceInterface,
          useClass: AvatarServiceInterfaceMock,
        },
        {
          provide: Configuration,
          useValue: new Configuration({ basePath: '/geonetwork/srv/api' }),
        },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: SearchService,
          useClass: searchServiceMock,
        },
      ],
    })
      .overrideComponent(SearchHeaderComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(SearchHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
