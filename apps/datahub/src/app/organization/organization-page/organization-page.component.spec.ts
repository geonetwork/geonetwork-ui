import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganisationsPageComponent } from './organisations-page.component'
import { SearchService } from '@geonetwork-ui/feature/search'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { of } from 'rxjs'

class SearchServiceMock {
  setFilters = jest.fn()
}

class OrganisationsServiceMock {
  getFiltersForOrgs = jest.fn((orgs) =>
    of({
      orgs: orgs.reduce((prev, curr) => ({ ...prev, [curr.name]: true }), {}),
    })
  )
}

describe('OrganisationsPageComponent', () => {
  let component: OrganisationsPageComponent
  let fixture: ComponentFixture<OrganisationsPageComponent>
  let searchService: SearchService
  let orgsService: OrganizationsServiceInterface

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganisationsPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
      ],
    }).compileComponents()

    searchService = TestBed.inject(SearchService)
    orgsService = TestBed.inject(OrganizationsServiceInterface)

    fixture = TestBed.createComponent(OrganisationsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#searchByOrganisation', () => {
    beforeEach(() => {
      component.searchByOrganisation({
        name: 'MyOrg',
      })
    })
    it('generates filters for the org', () => {
      expect(orgsService.getFiltersForOrgs).toHaveBeenCalledWith([
        { name: 'MyOrg' },
      ])
    })
    it('updates filters to filter on the org', () => {
      expect(searchService.setFilters).toHaveBeenCalledWith({
        orgs: {
          MyOrg: true,
        },
      })
    })
  })
})
