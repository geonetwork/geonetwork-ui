import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FieldsService,
  FilterDropdownComponent,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { BehaviorSubject, of } from 'rxjs'
import { SearchFiltersComponent } from './search-filters.component'
import { By } from '@angular/platform-browser'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import { barbieUserFixture } from '@geonetwork-ui/common/fixtures'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { MockBuilder } from 'ng-mocks'
import { CheckToggleComponent } from '@geonetwork-ui/ui/inputs'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getOptionalSearchConfig: () => ({
    ADVANCED_FILTERS: [
      'publisherOrg',
      'format',
      'isSpatial',
      'documentStandard',
      'inspireKeyword',
      'license',
      'topic',
      'publicationYear',
    ],
  }),
}))

const state = { OrgForResource: { mel: true } } as FieldFilters
const user = barbieUserFixture()

class SearchFacadeMock {
  searchFilters$ = new BehaviorSubject(state)
  hasSpatialFilter$ = new BehaviorSubject(false)
  spatialFilterEnabled$ = new BehaviorSubject(false)
  setSpatialFilterEnabled = jest.fn()
}

class SearchServiceMock {
  updateFilters = jest.fn()
}

class FieldsServiceMock {
  buildFiltersFromFieldValues = jest.fn((fieldValues) =>
    of(
      Object.keys(fieldValues).reduce(
        (prev, curr) => ({
          ...prev,
          ['filter_' + curr]: {},
        }),
        {}
      )
    )
  )
  public get supportedFields() {
    return [
      'publisherOrg',
      'format',
      'isSpatial',
      'documentStandard',
      'inspireKeyword',
      'license',
      'topic',
      'publicationYear',
    ]
  }
}

class PlatformServiceMock {
  getMe = jest.fn(() => new BehaviorSubject(user))
}

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent
  let fixture: ComponentFixture<SearchFiltersComponent>
  let searchFacade
  let searchService

  beforeEach(() => MockBuilder(SearchFiltersComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
        {
          provide: FieldsService,
          useClass: FieldsServiceMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceMock,
        },
      ],
    })
      .overrideComponent(SearchFiltersComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    searchFacade = TestBed.inject(SearchFacade)
    searchService = TestBed.inject(SearchService)
    fixture = TestBed.createComponent(SearchFiltersComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('spatial filter button', () => {
    function getCheckToggleDebugElement() {
      return fixture.debugElement.queryAll(By.directive(CheckToggleComponent))
    }

    describe('when panel is closed', () => {
      beforeEach(() => {
        component.isOpen = false
        fixture.detectChanges()
      })
      it('does not show up', () => {
        expect(getCheckToggleDebugElement().length).toBeFalsy()
      })
    })
    describe('when panel is opened & a spatial filter is unavailable', () => {
      beforeEach(() => {
        component.isOpen = true
        searchFacade.hasSpatialFilter$.next(false)
        fixture.detectChanges()
      })
      it('does not show up', () => {
        expect(getCheckToggleDebugElement().length).toBe(1)
      })
    })
    describe('when panel is opened & a spatial filter is available', () => {
      beforeEach(() => {
        component.isOpen = true
        searchFacade.hasSpatialFilter$.next(true)
        searchFacade.spatialFilterEnabled$.next(true)
        fixture.detectChanges()
      })
      it('does show up', () => {
        expect(getCheckToggleDebugElement().length).toBe(2)
      })
      it('has the value set in the state', () => {
        expect(
          getCheckToggleDebugElement()[0].componentInstance.value
        ).toBeTruthy()
      })
    })
    describe('when clicked', () => {
      beforeEach(() => {
        component.isOpen = true
        searchFacade.hasSpatialFilter$.next(true)
        fixture.detectChanges()
      })
      it('emits a SetSpatialFilterEnabled action', () => {
        const checkToggleComponent =
          getCheckToggleDebugElement()[0].componentInstance
        checkToggleComponent.toggled.emit(false)
        expect(searchFacade.setSpatialFilterEnabled).toHaveBeenCalledWith(false)
      })
    })
  })
  describe('advanced search button (more)', () => {
    function getMoreButton(): DebugElement {
      return fixture.debugElement.query(By.css('gn-ui-button'))
    }
    function getFilterButtons(): DebugElement[] {
      return fixture.debugElement.queryAll(
        By.directive(FilterDropdownComponent)
      )
    }
    describe('when panel is closed', () => {
      beforeEach(() => {
        component.isOpen = false
        fixture.detectChanges()
      })
      it('does show up', () => {
        expect(getMoreButton()).toBeTruthy()
      })
      it('first filter dropdown shows up (on desktop)', () => {
        expect(
          getFilterButtons()[0].nativeElement.classList.entries('sm:block')
        ).toBeTruthy()
      })
      it('second filter dropdown shows up (on desktop)', () => {
        expect(
          getFilterButtons()[1].nativeElement.classList.contains('sm:block')
        ).toBeTruthy()
      })
      it('third filter dropdown does not show up (on desktop)', () => {
        expect(
          getFilterButtons()[2].nativeElement.classList.contains('sm:block')
        ).toBeFalsy()
      })
    })
    describe('when panel is opened', () => {
      beforeEach(() => {
        component.isOpen = true
        fixture.detectChanges()
      })
      it('does not show up', () => {
        expect(getMoreButton()).toBeFalsy()
      })
      it('first filter dropdown shows up (on desktop and mobile)', () => {
        expect(
          getFilterButtons()[0].nativeElement.classList.entries('block')
        ).toBeTruthy()
      })
      it('second filter dropdown shows up (on desktop and mobile)', () => {
        expect(
          getFilterButtons()[1].nativeElement.classList.contains('block')
        ).toBeTruthy()
      })
      it('third filter dropdown shows up (on desktop and mobile)', () => {
        expect(
          getFilterButtons()[2].nativeElement.classList.contains('block')
        ).toBeTruthy()
      })
    })
  })
  describe('clear button', () => {
    const getClearBtn = () => fixture.debugElement.query(By.css('.clear-btn'))
    beforeEach(() => {
      component.isOpen = true
      fixture.detectChanges()
    })
    it('shows up', () => {
      expect(getClearBtn()).toBeTruthy()
    })
    describe('when clicked', () => {
      beforeEach(() => {
        getClearBtn().nativeElement.click()
      })
      it('clear OrgForResource & format', () => {
        expect(searchService.updateFilters).toHaveBeenCalledWith({
          filter_format: {},
          filter_publicationYear: {},
          filter_isSpatial: {},
          filter_publisherOrg: {},
          filter_topic: {},
          filter_license: {},
          filter_documentStandard: {},
          filter_inspireKeyword: {},
        })
      })
    })
  })
})
