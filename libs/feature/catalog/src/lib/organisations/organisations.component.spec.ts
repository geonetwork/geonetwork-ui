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
import { Organisation, ORGANISATIONS_FIXTURE } from '@geonetwork-ui/util/shared'
import { of } from 'rxjs'

import {
  ITEMS_ON_PAGE,
  OrganisationsComponent,
} from './organisations.component'
import { OrganisationsService } from './organisations.service'

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

const organisationsServiceMock = {
  getOrganisationsWithGroups: jest.fn(() => of(ORGANISATIONS_FIXTURE)),
}

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
      ],
      providers: [
        {
          provide: OrganisationsService,
          useValue: organisationsServiceMock,
        },
      ],
    })
      .overrideComponent(OrganisationsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(OrganisationsComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('on component init', () => {
    let sortComponent: OrganisationsSortMockComponent
    let orgPreviewComponents: OrganisationPreviewMockComponent[]
    let paginationComponent: PaginationMockComponent
    let setCurrentPageSpy
    let setSortBySpy
    it('should call getOrganisationsWithGroups', () => {
      expect(
        organisationsServiceMock.getOrganisationsWithGroups
      ).toHaveBeenCalled()
    })
    describe('pass organisations to ui preview components', () => {
      beforeEach(() => {
        orgPreviewComponents = de.queryAll(
          By.directive(OrganisationPreviewMockComponent)
        )
      })
      it('should pass first organisation (sorted by name-asc) to first ui preview component', () => {
        expect(
          orgPreviewComponents[0].componentInstance.organisation.name
        ).toEqual('A Data Org')
      })
      it('should pass 6th organisation (sorted by name-asc) on page to 6th ui preview component', () => {
        expect(
          orgPreviewComponents[5].componentInstance.organisation.name
        ).toEqual('F Data Org')
      })
    })
    describe('pass params to ui pagination component', () => {
      beforeEach(() => {
        paginationComponent = de.query(By.directive(PaginationMockComponent))
      })
      it('should init ui pagination component with currentPage = 1', () => {
        expect(paginationComponent.componentInstance.currentPage).toEqual(1)
      })
      it('should init ui pagination component with correct value for total nPages', () => {
        expect(paginationComponent.componentInstance.nPages).toEqual(
          Math.ceil(ORGANISATIONS_FIXTURE.length / ITEMS_ON_PAGE)
        )
      })
      describe('navigate to second page (and trigger newCurrentPageEvent output)', () => {
        beforeEach(() => {
          setCurrentPageSpy = jest.spyOn(component, 'setCurrentPage')
          paginationComponent.triggerEventHandler('newCurrentPageEvent', 2)
          fixture.detectChanges()
          orgPreviewComponents = de.queryAll(
            By.directive(OrganisationPreviewMockComponent)
          )
          fixture.detectChanges()
        })
        afterEach(() => {
          jest.restoreAllMocks()
        })
        it('should call setcurrentPage() with correct value', () => {
          expect(setCurrentPageSpy).toHaveBeenCalledWith(2)
        })
        it('should set currentPage in ui component to correct value', () => {
          expect(paginationComponent.componentInstance.currentPage).toEqual(2)
        })
        it('should pass first organisation of second page (sorted by name-asc) to first ui preview component', () => {
          expect(
            orgPreviewComponents[0].componentInstance.organisation.name
          ).toEqual('G Data Org')
        })
        it('should pass last organisation of second page (sorted by name-asc) to last ui preview component', () => {
          expect(
            orgPreviewComponents[orgPreviewComponents.length - 1]
              .componentInstance.organisation.name
          ).toEqual('J Data Org')
        })
      })
    })
    describe('sort by recordCount', () => {
      beforeEach(() => {
        sortComponent = de.query(By.directive(OrganisationsSortMockComponent))
        setSortBySpy = jest.spyOn(component, 'setSortBy')
        sortComponent.triggerEventHandler('sortBy', 'recordCount-desc')
        fixture.detectChanges()
        orgPreviewComponents = de.queryAll(
          By.directive(OrganisationPreviewMockComponent)
        )
        fixture.detectChanges()
      })
      it('should call setSortBy', () => {
        expect(setSortBySpy).toHaveBeenCalledWith('recordCount-desc')
      })
      it('should have organsiation with max recordCount at first position in observable', async () => {
        const organisations = await readFirst(component.organisations$)
        expect(organisations[0]).toEqual(ORGANISATIONS_FIXTURE[5])
      })
      it('should pass organsiation with max recordCount to first preview component', () => {
        expect(orgPreviewComponents[0].componentInstance.organisation).toEqual(
          ORGANISATIONS_FIXTURE[5]
        )
      })
      it('should pass organsiation with 6th highest recordCount to 6th preview component', () => {
        expect(orgPreviewComponents[5].componentInstance.organisation).toEqual(
          ORGANISATIONS_FIXTURE[3]
        )
      })
    })
  })
})
