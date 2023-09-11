import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MyOrgRecordsComponent } from './my-org-records.component'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { Component, importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { USER_FIXTURE } from '@geonetwork-ui/common/fixtures'
import { BehaviorSubject, of } from 'rxjs'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'

const user = USER_FIXTURE()
class AuthServiceMock {
  user$ = new BehaviorSubject(user)
  authReady = jest.fn(() => this._authSubject$)
  _authSubject$ = new BehaviorSubject({})
}
class OrganisationsServiceMock {
  organisationsCount$ = of(456)
}

class searchServiceMock {
  updateSearchFilters = jest.fn()
  setSearch = jest.fn()
  setSortBy = jest.fn()
  setSortAndFilters = jest.fn()
}

class SearchFacadeMock {
  resetSearch = jest.fn()
}

@Component({
  // eslint-disable-next-line
  selector: 'md-editor-records-list',
  template: '',
  standalone: true,
})
export class MockRecordsListComponent {}

describe('MyOrgRecordsComponent', () => {
  let component: MyOrgRecordsComponent
  let fixture: ComponentFixture<MyOrgRecordsComponent>
  let searchFacade: SearchFacade

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(TranslateModule.forRoot()),
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        { provide: AuthService, useClass: AuthServiceMock },
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
    }).overrideComponent(MyOrgRecordsComponent, {
      remove: {
        imports: [RecordsListComponent],
      },
      add: {
        imports: [MockRecordsListComponent],
      },
    })
    searchFacade = TestBed.inject(SearchFacade)
    fixture = TestBed.createComponent(MyOrgRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('filters', () => {
    it('clears filters on init', () => {
      expect(searchFacade.resetSearch).toHaveBeenCalled()
    })
  })
})
