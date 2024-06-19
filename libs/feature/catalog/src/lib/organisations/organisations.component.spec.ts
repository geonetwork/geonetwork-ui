import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ContentGhostComponent } from '@geonetwork-ui/ui/elements'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { firstValueFrom, of } from 'rxjs'
import { ORGANISATIONS_FIXTURE } from '@geonetwork-ui/common/fixtures'
import { OrganisationsComponent } from './organisations.component'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'

@Component({
  selector: 'gn-ui-organisations-filter',
  template: '<div></div>',
})
class OrganisationsFilterMockComponent {
  @Output() sortBy = new EventEmitter<string>()
}
@Component({
  selector: 'gn-ui-organisation-preview',
  template: '<div></div>',
})
class OrganisationPreviewMockComponent {
  @Input() organization: Organization
  @Output() clickedOrganization = new EventEmitter<Organization>()
}

@Component({
  selector: 'gn-ui-organisations-result',
  template: '<div></div>',
})
class OrganisationsResultMockComponent {
  @Input() hits: number
  @Input() total: number
}

@Component({
  selector: 'gn-ui-pagination',
  template: '<div></div>',
})
class PaginationMockComponent {
  @Input() currentPage: number
  @Input() nPages: number
  @Output() newCurrentPageEvent = new EventEmitter<number>()
}

class OrganisationsServiceMock {
  organisations$ = of(ORGANISATIONS_FIXTURE)
  organisationsCount$ = of(ORGANISATIONS_FIXTURE.length)
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrganisationsComponent,
        OrganisationsFilterMockComponent,
        OrganisationPreviewMockComponent,
        PaginationMockComponent,
        OrganisationsResultMockComponent,
        ContentGhostComponent,
      ],
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
    let orgPreviewComponents: OrganisationPreviewMockComponent[]
    let orgResultComponent: OrganisationsResultMockComponent
    let paginationComponentDE: DebugElement
    let setCurrentPageSpy
    let setSortBySpy
    beforeEach(() => {
      paginationComponentDE = de.query(By.directive(PaginationMockComponent))
    })
    describe('pass organisations to ui preview components', () => {
      beforeEach(() => {
        orgPreviewComponents = de
          .queryAll(By.directive(OrganisationPreviewMockComponent))
          .map((debugElement) => debugElement.componentInstance)
      })
      it('should pass first organisation (sorted by name-asc) to first ui preview component', () => {
        expect(orgPreviewComponents[0].organization.name).toEqual('A Data Org')
      })
      it('should pass 6th organisation (sorted by name-asc) on page to 6th ui preview component', () => {
        expect(orgPreviewComponents[5].organization.name).toEqual('E Data Org')
      })
    })
    describe('pass params to ui pagination component', () => {
      it('should init ui pagination component with currentPage = 1', () => {
        expect(paginationComponentDE.componentInstance.currentPage).toEqual(1)
      })
      it('should init ui pagination component with correct value for total nPages', () => {
        expect(paginationComponentDE.componentInstance.nPages).toEqual(
          Math.ceil(ORGANISATIONS_FIXTURE.length / ITEMS_ON_PAGE)
        )
      })
      describe('navigate to second page (and trigger newCurrentPageEvent output)', () => {
        beforeEach(() => {
          setCurrentPageSpy = jest.spyOn(component, 'setCurrentPage')
          paginationComponentDE.triggerEventHandler('newCurrentPageEvent', 2)
          fixture.detectChanges()
          orgPreviewComponents = de
            .queryAll(By.directive(OrganisationPreviewMockComponent))
            .map((debugElement) => debugElement.componentInstance)
        })
        afterEach(() => {
          jest.restoreAllMocks()
        })
        it('should call setcurrentPage() with correct value', () => {
          expect(setCurrentPageSpy).toHaveBeenCalledWith(2)
        })
        it('should set currentPage in ui component to correct value', () => {
          expect(paginationComponentDE.componentInstance.currentPage).toEqual(2)
        })
        it('should pass first organisation of second page (sorted by name-asc) to first ui preview component', () => {
          expect(orgPreviewComponents[0].organization.name).toEqual(
            'é Data Org'
          )
        })
        it('should pass last organisation of second page (sorted by name-asc) to last ui preview component', () => {
          expect(
            orgPreviewComponents[orgPreviewComponents.length - 1].organization
              .name
          ).toEqual('J Data Org')
        })
        it('should not change currentPage when sorting results', () => {
          component['setSortBy'](['desc', 'recordCount'])
          fixture.detectChanges()
          expect(paginationComponentDE.componentInstance.currentPage).toEqual(2)
        })
        it('should set currentPage to 1 when filtering to display results', () => {
          component['setFilterBy']('Data')
          fixture.detectChanges()
          expect(paginationComponentDE.componentInstance.currentPage).toEqual(1)
        })
      })
    })
    describe('sort by recordCount', () => {
      beforeEach(() => {
        setSortBySpy = jest.spyOn(component, 'setSortBy')
        de.query(
          By.directive(OrganisationsFilterMockComponent)
        ).triggerEventHandler('sortBy', ['desc', 'recordCount'])
        fixture.detectChanges()
        orgPreviewComponents = de
          .queryAll(By.directive(OrganisationPreviewMockComponent))
          .map((debugElement) => debugElement.componentInstance)
      })
      it('should call setSortBy', () => {
        expect(setSortBySpy).toHaveBeenCalledWith(['desc', 'recordCount'])
      })
      it('should have organisation with max recordCount at first position in observable', async () => {
        const organisations = await firstValueFrom(component.organisations$)
        expect(organisations[0]).toEqual(ORGANISATIONS_FIXTURE[5])
      })
      it('should pass organisation with max recordCount to first preview component', () => {
        expect(orgPreviewComponents[0].organization).toEqual(
          ORGANISATIONS_FIXTURE[5]
        )
      })
      it('should pass organisation with 6th highest recordCount to 6th preview component', () => {
        expect(orgPreviewComponents[5].organization).toEqual(
          ORGANISATIONS_FIXTURE[3]
        )
      })
    })
    describe('filter organisations', () => {
      describe('initial state', () => {
        beforeEach(() => {
          orgResultComponent = de.query(
            By.directive(OrganisationsResultMockComponent)
          ).componentInstance
        })
        it('should display number of organisations found to equal all', () => {
          expect(orgResultComponent.hits).toEqual(ORGANISATIONS_FIXTURE.length)
        })
        it('should display number of all organisations', () => {
          expect(orgResultComponent.total).toEqual(ORGANISATIONS_FIXTURE.length)
        })
      })
      describe('entering search terms', () => {
        beforeEach(() => {
          orgResultComponent = de.query(
            By.directive(OrganisationsResultMockComponent)
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
          By.directive(OrganisationPreviewMockComponent)
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
