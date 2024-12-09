import {
  ChangeDetectionStrategy,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { firstValueFrom, of } from 'rxjs'
import { someOrganizationsFixture } from '@geonetwork-ui/common/fixtures'
import { OrganisationsComponent } from './organisations.component'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { MockBuilder } from 'ng-mocks'
import {
  OrganisationPreviewComponent,
  OrganisationsFilterComponent,
  OrganisationsResultComponent,
} from '@geonetwork-ui/ui/catalog'

class OrganisationsServiceMock {
  organisations$ = of(someOrganizationsFixture())
  organisationsCount$ = of(someOrganizationsFixture().length)
}

const organisationMock = {
  name: 'My Org',
  description: 'A good description',
  logoUrl: new URL('https://somedomain.org'),
  recordCount: 12,
}

const ITEMS_ON_PAGE = 6

describe('OrganisationsComponent', () => {
  let component: OrganisationsComponent
  let fixture: ComponentFixture<OrganisationsComponent>
  let de: DebugElement

  beforeEach(() => MockBuilder(OrganisationsComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(OrganisationsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(OrganisationsComponent)
    component = fixture.componentInstance
    component.itemsOnPage = ITEMS_ON_PAGE
    de = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('on component init', () => {
    let orgPreviewComponents: OrganisationPreviewComponent[]
    let orgResultComponent: OrganisationsResultComponent
    let setSortBySpy
    describe('pass organisations to ui preview components', () => {
      beforeEach(() => {
        orgPreviewComponents = de
          .queryAll(By.directive(OrganisationPreviewComponent))
          .map((debugElement) => debugElement.componentInstance)
      })
      it('should pass first organisation (sorted by name-asc) to first ui preview component', () => {
        expect(orgPreviewComponents[0].organization.name).toEqual('A Data Org')
      })
      it('should pass 6th organisation (sorted by name-asc) on page to 6th ui preview component', () => {
        expect(orgPreviewComponents[5].organization.name).toEqual('D Data Org')
      })
    })
    describe('pass params to ui pagination component', () => {
      it('should init ui pagination component with currentPage = 1', () => {
        expect(component.currentPage).toEqual(1)
      })
      it('should init ui pagination component with correct value for total nPages', () => {
        expect(component.pagesCount).toEqual(
          Math.ceil(someOrganizationsFixture().length / ITEMS_ON_PAGE)
        )
      })
      describe('navigate to second page', () => {
        beforeEach(() => {
          component.goToPage(2)
          fixture.detectChanges()
          orgPreviewComponents = de
            .queryAll(By.directive(OrganisationPreviewComponent))
            .map((debugElement) => debugElement.componentInstance)
        })
        afterEach(() => {
          jest.restoreAllMocks()
        })
        it('should set currentPage in ui component to correct value', () => {
          expect(component.currentPage).toEqual(2)
        })
        it('should pass first organisation of second page (sorted by name-asc) to first ui preview component', () => {
          expect(orgPreviewComponents[0].organization.name).toEqual(
            'E Data Org'
          )
        })
        it('should pass last organisation of second page (sorted by name-asc) to last ui preview component', () => {
          expect(
            orgPreviewComponents[orgPreviewComponents.length - 1].organization
              .name
          ).toEqual('I Data Org')
        })
        it('should not change currentPage when sorting results', () => {
          component['setSortBy'](['desc', 'recordCount'])
          fixture.detectChanges()
          expect(component.currentPage).toEqual(2)
        })
        it('should set currentPage to 1 when filtering to display results', () => {
          component['setFilterBy']('Data')
          fixture.detectChanges()
          expect(component.currentPage).toEqual(1)
        })
      })
    })
    describe('sort by recordCount', () => {
      beforeEach(() => {
        setSortBySpy = jest.spyOn(component, 'setSortBy')
        de.query(
          By.directive(OrganisationsFilterComponent)
        ).triggerEventHandler('sortBy', ['desc', 'recordCount'])
        fixture.detectChanges()
        orgPreviewComponents = de
          .queryAll(By.directive(OrganisationPreviewComponent))
          .map((debugElement) => debugElement.componentInstance)
      })
      it('should call setSortBy', () => {
        expect(setSortBySpy).toHaveBeenCalledWith(['desc', 'recordCount'])
      })
      it('should have organisation with max recordCount at first position in observable', async () => {
        const organisations = await firstValueFrom(component.organisations$)
        expect(organisations[0]).toEqual(someOrganizationsFixture()[5])
      })
      it('should pass organisation with max recordCount to first preview component', () => {
        expect(orgPreviewComponents[0].organization).toEqual(
          someOrganizationsFixture()[5]
        )
      })
      it('should pass organisation with 6th highest recordCount to 6th preview component', () => {
        expect(orgPreviewComponents[5].organization).toEqual(
          someOrganizationsFixture()[3]
        )
      })
    })
    describe('filter organisations', () => {
      describe('initial state', () => {
        beforeEach(() => {
          orgResultComponent = de.query(
            By.directive(OrganisationsResultComponent)
          ).componentInstance
        })
        it('should display number of organisations found to equal all', () => {
          expect(orgResultComponent.hits).toEqual(
            someOrganizationsFixture().length
          )
        })
        it('should display number of all organisations', () => {
          expect(orgResultComponent.total).toEqual(
            someOrganizationsFixture().length
          )
        })
      })
      describe('entering search terms', () => {
        beforeEach(() => {
          orgResultComponent = de.query(
            By.directive(OrganisationsResultComponent)
          ).componentInstance
        })
        it('should ignore case and display 11 matches for "Data", "DATA" or "data"', () => {
          component.filterBy$.next('Data')
          fixture.detectChanges()
          expect(orgResultComponent.hits).toEqual(11)
        })
        it('should ignore special character without space and display 1 match for "l\'Ingénierie"', () => {
          component.filterBy$.next("l'Ingénierie")
          fixture.detectChanges()
          expect(orgResultComponent.hits).toEqual(1)
        })
      })
    })
    describe('click on organisation', () => {
      let orgSelected
      beforeEach(() => {
        orgSelected = []
        component.orgSelect.subscribe((org) => orgSelected.push(org))
        de.query(
          By.directive(OrganisationPreviewComponent)
        ).triggerEventHandler('clickedOrganisation', organisationMock)
        fixture.detectChanges()
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('emits an orgSelect event', () => {
        expect(orgSelected).toEqual([organisationMock])
      })
    })
    it('should not have href if RightClickToken not provided', () => {
      expect(component.getOrganisationUrl(organisationMock)).toBe(null)
    })
  })
  describe('ORGANIZATION_URL_TOKEN provided', () => {
    beforeEach(() => {
      component['urlTemplate'] = '/my/link/${name}/open'
    })
    it('sets href based on given url template', () => {
      expect(component.getOrganisationUrl(organisationMock)).toBe(
        '/my/link/My Org/open'
      )
    })
  })
})
