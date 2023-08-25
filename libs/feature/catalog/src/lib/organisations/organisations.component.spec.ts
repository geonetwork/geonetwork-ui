import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ContentGhostComponent } from '@geonetwork-ui/ui/elements'
import { Organization } from '@geonetwork-ui/common/domain/record'
import { firstValueFrom, of } from 'rxjs'
import { ORGANISATIONS_FIXTURE } from '@geonetwork-ui/common/fixtures'
import { OrganisationsComponent } from './organisations.component'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'

@Component({
  selector: 'gn-ui-organisations-sort',
  template: '<div></div>',
})
class OrganisationsSortMockComponent {
  @Output() sortBy = new EventEmitter<string>()
}
@Component({
  selector: 'gn-ui-organisation-preview',
  template: '<div></div>',
})
class OrganisationPreviewMockComponent {
  @Input() organisation: Organization
  @Output() clickedOrganisation = new EventEmitter<Organization>()
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
        OrganisationsSortMockComponent,
        OrganisationPreviewMockComponent,
        PaginationMockComponent,
        ContentGhostComponent,
      ],
      providers: [
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
      ],
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
        expect(orgPreviewComponents[0].organisation.name).toEqual('A Data Org')
      })
      it('should pass 6th organisation (sorted by name-asc) on page to 6th ui preview component', () => {
        expect(orgPreviewComponents[5].organisation.name).toEqual('é Data Org')
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
          expect(orgPreviewComponents[0].organisation.name).toEqual(
            'F Data Org'
          )
        })
        it('should pass last organisation of second page (sorted by name-asc) to last ui preview component', () => {
          expect(
            orgPreviewComponents[orgPreviewComponents.length - 1].organisation
              .name
          ).toEqual('J Data Org')
        })
      })
    })
    describe('sort by recordCount', () => {
      beforeEach(() => {
        setSortBySpy = jest.spyOn(component, 'setSortBy')
        de.query(
          By.directive(OrganisationsSortMockComponent)
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
        expect(orgPreviewComponents[0].organisation).toEqual(
          ORGANISATIONS_FIXTURE[5]
        )
      })
      it('should pass organisation with 6th highest recordCount to 6th preview component', () => {
        expect(orgPreviewComponents[5].organisation).toEqual(
          ORGANISATIONS_FIXTURE[3]
        )
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
