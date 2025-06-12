import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { of } from 'rxjs'
import { OrganizationDetailsComponent } from './organization-details.component'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { RouterModule } from '@angular/router'
import { MockBuilder, MockProvider } from 'ng-mocks'

describe('OrganizationDetailsComponent', () => {
  let component: OrganizationDetailsComponent
  let fixture: ComponentFixture<OrganizationDetailsComponent>
  let searchFacade: Partial<SearchFacade>
  let organizationsService: Partial<OrganizationsServiceInterface>

  beforeEach(() => MockBuilder(OrganizationDetailsComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        MockProvider(SearchFacade, {
          setPageSize: jest.fn(),
          isLoading$: of(false),
          setFilters: jest.fn().mockReturnThis(),
          setSortBy: jest.fn().mockReturnThis(),
          results$: of(datasetRecordsFixture()),
        }),
        MockProvider(OrganizationsServiceInterface, {
          getFiltersForOrgs: jest
            .fn()
            .mockReturnValue(of([{ key: 'organization', value: 'test-org' }])),
        }),
      ],
    }).compileComponents()
    searchFacade = TestBed.inject(SearchFacade)
    organizationsService = TestBed.inject(OrganizationsServiceInterface)
    fixture = TestBed.createComponent(OrganizationDetailsComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should set the organization input and update the currentOrganization$', () => {
    const mockOrganization: Organization = {
      id: 'org-1',
      name: 'Test Organization',
    } as Organization

    component.organization = mockOrganization

    component.currentOrganization$.subscribe((organization) => {
      expect(organization).toEqual(mockOrganization)
    })
  })

  it('should call setPageSize on ngOnInit', () => {
    component.ngOnInit()
    expect(searchFacade.setPageSize).toHaveBeenCalledWith(12)
  })

  it('should update isSearchFacadeLoading$ on ngOnInit', (done) => {
    component.ngOnInit()

    component.isSearchFacadeLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(false)
      done()
    })
  })

  it('should fetch lastPublishedDatasets$ based on the organization', (done) => {
    const mockOrganization: Organization = {
      id: 'org-1',
      name: 'Test Organization',
    } as Organization
    component.organization = mockOrganization
    const fixtureWithoutOwnerOrganization = datasetRecordsFixture().map(
      (record) => {
        const { ownerOrganization, ...rest } = record
        return rest as Partial<CatalogRecord>
      }
    )

    component.lastPublishedDatasets$.subscribe((datasets) => {
      expect(organizationsService.getFiltersForOrgs).toHaveBeenCalledWith([
        mockOrganization,
      ])
      expect(searchFacade.setFilters).toHaveBeenCalledWith([
        { key: 'organization', value: 'test-org' },
      ])
      expect(searchFacade.setSortBy).toHaveBeenCalledWith([
        'desc',
        'changeDate',
      ])
      expect(datasets).toEqual(fixtureWithoutOwnerOrganization)
      done()
    })
  })

  it('should unsubscribe from subscriptions$ on ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component.subscriptions$, 'unsubscribe')
    component.ngOnDestroy()
    expect(unsubscribeSpy).toHaveBeenCalled()
  })
})
