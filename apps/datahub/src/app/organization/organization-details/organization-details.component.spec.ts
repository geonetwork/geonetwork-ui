import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { OrganizationDetailsComponent } from './organization-details.component'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import {
  datasetRecordsFixture,
  someOrganizationsFixture,
} from '@geonetwork-ui/common/fixtures'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import {
  ButtonComponent,
  PreviousNextButtonsComponent,
} from '@geonetwork-ui/ui/inputs'
import {
  BlockListComponent,
  CarouselComponent,
  MaxLinesComponent,
} from '@geonetwork-ui/ui/layout'
import { LetDirective } from '@ngrx/component'
import { LinkCardComponent, UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import { RouterLink } from '@angular/router'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser'
import { ROUTER_ROUTE_SEARCH } from '@geonetwork-ui/feature/router'

let getHTMLElement: (dataTest: string) => HTMLElement | undefined

const changeDetectorRefMock: Partial<ChangeDetectorRef> = {
  markForCheck: jest.fn(),
}

class OrganisationsServiceMock {
  getFiltersForOrgs = jest.fn((orgs) =>
    of({
      orgs: orgs.reduce((prev, curr) => ({ ...prev, [curr.name]: true }), {}),
    })
  )
  organisations$ = of(someOrganizationsFixture())
}

const anOrganizationWithManyDatasets: Organization =
  someOrganizationsFixture()[0]

const oneDataset = [datasetRecordsFixture()[0]]
const manyDatasets = datasetRecordsFixture().concat(datasetRecordsFixture()[0])

const organizationIsLoading = new BehaviorSubject(false)
const totalPages = new BehaviorSubject(10)
const currentPage = new BehaviorSubject(0)
const results = new BehaviorSubject(manyDatasets)

const desiredPageSize = 3

class SearchFacadeMock {
  private pageSize = desiredPageSize

  setPageSize = jest.fn((pageSize: number) => (this.pageSize = pageSize))
  setFilters = jest.fn(() => new SearchFacadeMock())
  setSortBy = jest.fn(() => new SearchFacadeMock())
  results$ = results.asObservable()
  isLoading$ = organizationIsLoading.asObservable()
  totalPages$ = totalPages.asObservable()
  isBeginningOfResults$ = of(currentPage.getValue() === 1)
  isEndOfResults$ = of(totalPages.getValue() === currentPage.getValue())
  currentPage$ = currentPage.asObservable()
  paginate = jest.fn(() => {
    currentPage.next(currentPage.getValue() + 1)
    return new SearchFacadeMock()
  })
}

describe('OrganizationDetailsComponent', () => {
  let component: OrganizationDetailsComponent
  let fixture: ComponentFixture<OrganizationDetailsComponent>
  let searchFacade: SearchFacade
  let debugElement: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        AsyncPipe,
        NgIf,
        ButtonComponent,
        TranslateModule,
        CarouselComponent,
        BlockListComponent,
        LetDirective,
        LinkCardComponent,
        NgForOf,
        PreviousNextButtonsComponent,
        UiElementsModule,
        UiSearchModule,
        MaxLinesComponent,
        UiDatavizModule,
        RouterLink,
        UiWidgetsModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: ChangeDetectorRef,
          useValue: changeDetectorRefMock,
        },
      ],
    })
      .overrideComponent(OrganizationDetailsComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    searchFacade = TestBed.inject(SearchFacade)

    fixture = TestBed.createComponent(OrganizationDetailsComponent)
    component = fixture.componentInstance
    debugElement = fixture.debugElement

    getHTMLElement = (dataTest: string) => {
      const debugEl = debugElement.query(By.css(`[data-test="${dataTest}"]`))
      return debugEl ? (debugEl.nativeElement as HTMLElement) : undefined
    }

    component.organization = anOrganizationWithManyDatasets

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Left column', () => {
    describe('Organization description', () => {
      it('should contain the organization description', () => {
        const organizationDescriptionHtml = getHTMLElement(
          'organizationDescription'
        )

        expect(organizationDescriptionHtml.textContent.trim()).toEqual(
          anOrganizationWithManyDatasets.description?.trim()
        )
      })
    })
  })

  describe('Right column', () => {
    describe('Organization dataset count', () => {
      it('should have the right count of dataset', () => {
        const organizationDatasetCount = getHTMLElement(
          'organizationDatasetCount'
        ).querySelector('[data-test="figure"]')

        expect(organizationDatasetCount.innerHTML).toEqual(
          anOrganizationWithManyDatasets.recordCount?.toString()
        )
      })
    })

    describe('Organization email', () => {
      it('should have the email button', () => {
        const organizationEmail = getHTMLElement('organizationEmail')

        expect(organizationEmail).toBeTruthy()

        expect(organizationEmail?.getAttribute('href')).toEqual(
          `mailto:${anOrganizationWithManyDatasets.email}`
        )
      })
    })
  })

  describe('Last Published datasets', () => {
    describe('Previous Next buttons', () => {
      it('should not be displayed if organization is loading', () => {
        organizationIsLoading.next(true)
        fixture.detectChanges()

        const orgDetailsNavBtn = getHTMLElement('orgDetailsNavBtn')

        expect(orgDetailsNavBtn).toBeFalsy()
      })

      it('should not be displayed organization is loaded but has no pagination', () => {
        organizationIsLoading.next(false)
        totalPages.next(1)
        fixture.detectChanges()

        const orgDetailsNavBtn = getHTMLElement('orgDetailsNavBtn')

        expect(orgDetailsNavBtn).toBeFalsy()
      })

      it('should be displayed if organization is loadded and have pagination', () => {
        organizationIsLoading.next(false)
        totalPages.next(10)
        fixture.detectChanges()

        const orgDetailsNavBtn = getHTMLElement('orgDetailsNavBtn')

        expect(orgDetailsNavBtn).toBeTruthy()
      })

      it('should call paginate from the facade if button is clicked', () => {
        const initialPageNumber = currentPage.getValue()
        const nextPageNumber = initialPageNumber + 1

        const orgDetailsNavBtn = getHTMLElement('orgDetailsNavBtn')

        const nextButton = orgDetailsNavBtn?.querySelector(
          '[data-test="nextButton"]'
        ) as HTMLElement

        ;(nextButton?.firstChild as HTMLElement).click()
        fixture.detectChanges()

        expect(searchFacade.paginate).toHaveBeenCalledWith(nextPageNumber)

        const previousButton = orgDetailsNavBtn?.querySelector(
          '[data-test="previousButton"]'
        ) as HTMLElement

        ;(previousButton?.firstChild as HTMLElement).click()
        fixture.detectChanges()

        expect(searchFacade.paginate).toHaveBeenCalledWith(initialPageNumber)
      })

      describe('Search all button', () => {
        it('should send to the search page filtered on the correct organization', () => {
          const orgDetailsSearchAllBtn = getHTMLElement(
            'orgDetailsSearchAllBtn'
          )

          expect(orgDetailsSearchAllBtn).toBeTruthy()

          expect(orgDetailsSearchAllBtn?.getAttribute('href')).toEqual(
            `/${ROUTER_ROUTE_SEARCH}?organization=${encodeURIComponent(
              anOrganizationWithManyDatasets.name
            )}`
          )
        })
      })
    })

    describe('Last published datasets', () => {
      it('should display the datasets properly', () => {
        const orgPageLasPubDat = getHTMLElement('orgPageLasPubDat')

        expect(orgPageLasPubDat).toBeTruthy()
        expect(orgPageLasPubDat?.children.length).toEqual(desiredPageSize)

        results.next(oneDataset)
        fixture.detectChanges()

        expect(orgPageLasPubDat?.children.length).toEqual(1)
      })
    })
  })

  describe('when organization changes', () => {
    const anotherOrg = someOrganizationsFixture()[1]
    beforeEach(() => {
      jest.clearAllMocks()
      component.organization = anotherOrg
      fixture.detectChanges()
    })
    it('updates the search filters', () => {
      expect(searchFacade.setFilters).toHaveBeenCalledWith({
        orgs: {
          [anotherOrg.name]: true,
        },
      })
    })
  })
})
