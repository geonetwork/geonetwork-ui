import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { readFirst } from '@nrwl/angular/testing'
import { By } from '@angular/platform-browser'
import { Organisation } from '@geonetwork-ui/util/shared'
import { ORGANISATIONS_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'
import { of } from 'rxjs'

import {
  ITEMS_ON_PAGE,
  OrganisationsComponent,
} from './organisations.component'
import { OrganisationsService } from './organisations.service'
import { SearchService } from '@geonetwork-ui/feature/search'

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
  @Input() organisation: Organisation
  @Output() clickedOrganisation = new EventEmitter<Organisation>()
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
  getOrganisationsWithGroups = jest.fn(() => of(ORGANISATIONS_FIXTURE))
}

class SearchServiceMock {
  updateSearch = jest.fn()
}

const organisationMock = {
  name: 'My Org',
  description: 'A good description',
  logoUrl: 'https://somedomain.org',
  recordCount: 12,
}

describe('OrganisationsComponent', () => {
  let component: OrganisationsComponent
  let fixture: ComponentFixture<OrganisationsComponent>
  let de: DebugElement
  let organisationsService: OrganisationsService
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrganisationsComponent,
        OrganisationsSortMockComponent,
        OrganisationPreviewMockComponent,
        PaginationMockComponent,
      ],
      providers: [
        {
          provide: OrganisationsService,
          useClass: OrganisationsServiceMock,
        },
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
      ],
    })
      .overrideComponent(OrganisationsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    organisationsService = TestBed.inject(OrganisationsService)
    searchService = TestBed.inject(SearchService)
    fixture = TestBed.createComponent(OrganisationsComponent)
    component = fixture.componentInstance
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
    it('should call getOrganisationsWithGroups', () => {
      expect(organisationsService.getOrganisationsWithGroups).toHaveBeenCalled()
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
        expect(orgPreviewComponents[5].organisation.name).toEqual('F Data Org')
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
            'G Data Org'
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
        ).triggerEventHandler('sortBy', 'recordCount-desc')
        fixture.detectChanges()
        orgPreviewComponents = de
          .queryAll(By.directive(OrganisationPreviewMockComponent))
          .map((debugElement) => debugElement.componentInstance)
      })
      it('should call setSortBy', () => {
        expect(setSortBySpy).toHaveBeenCalledWith('recordCount-desc')
      })
      it('should have organsiation with max recordCount at first position in observable', async () => {
        const organisations = await readFirst(component.organisations$)
        expect(organisations[0]).toEqual(ORGANISATIONS_FIXTURE[5])
      })
      it('should pass organsiation with max recordCount to first preview component', () => {
        expect(orgPreviewComponents[0].organisation).toEqual(
          ORGANISATIONS_FIXTURE[5]
        )
      })
      it('should pass organsiation with 6th highest recordCount to 6th preview component', () => {
        expect(orgPreviewComponents[5].organisation).toEqual(
          ORGANISATIONS_FIXTURE[3]
        )
      })
    })
    describe('click on organisation', () => {
      beforeEach(() => {
        de.query(
          By.directive(OrganisationPreviewMockComponent)
        ).triggerEventHandler('clickedOrganisation', organisationMock)
        fixture.detectChanges()
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('should call searchByOrganisation() with correct organisation', () => {
        expect(searchService.updateSearch).toHaveBeenCalledWith({
          OrgForResource: { [organisationMock.name]: true },
        })
      })
    })
  })
})
