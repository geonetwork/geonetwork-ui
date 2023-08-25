import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AutocompleteComponent, UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FuzzySearchComponent } from './fuzzy-search.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import {
  DATASET_RECORDS,
  SAMPLE_SEARCH_RESULTS,
} from '@geonetwork-ui/common/fixtures'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'

class SearchFacadeMock {
  setFilters = jest.fn()
  searchFilters$ = new BehaviorSubject({ any: 'scot' })
}

class SearchServiceMock {
  updateFilters = jest.fn()
}

class RecordsRepositoryMock {
  fuzzySearch = jest.fn(() => of(SAMPLE_SEARCH_RESULTS))
}

describe('FuzzySearchComponent', () => {
  let component: FuzzySearchComponent
  let fixture: ComponentFixture<FuzzySearchComponent>
  let searchFacade: SearchFacadeMock
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuzzySearchComponent],
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
      ],
      imports: [UiInputsModule, TranslateModule.forRoot()],
    }).compileComponents()

    searchService = TestBed.inject(SearchService)
    searchFacade = TestBed.inject(SearchFacade) as any
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FuzzySearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('search filter parameter', () => {
    let autocompleteCpt
    beforeEach(() => {
      autocompleteCpt = fixture.debugElement.query(
        By.directive(AutocompleteComponent)
      ).componentInstance
    })
    it('any is passed to autocomplete', () => {
      expect(autocompleteCpt.value).toEqual({ title: 'scot' })
    })
    it('any value is changed on search filter update', () => {
      searchFacade.searchFilters$.next({ any: 'river' })
      fixture.detectChanges()
      expect(autocompleteCpt.value).toEqual({ title: 'river' })
    })
    it('object is changed on search filter update, only any is passed', () => {
      searchFacade.searchFilters$.next({
        any: 'river',
        OrgForResource: { ADUGA: true },
      })
      fixture.detectChanges()
      expect(autocompleteCpt.value).toEqual({ title: 'river' })
    })
    it('no any is present in search filter, empty object is passed', () => {
      searchFacade.searchFilters$.next({
        OrgForResource: { ADUGA: true },
      })
      fixture.detectChanges()
      expect(autocompleteCpt.value).toEqual({})
    })
  })
  describe('suggestions loading', () => {
    let emitted
    beforeEach(() => {
      emitted = null
      component.autocomplete.action('').subscribe((e) => (emitted = e))
    })
    it('emits an array of CatalogRecord', () => {
      expect(emitted).toEqual(DATASET_RECORDS)
    })
  })

  describe('search enter key press', () => {
    let outputValue
    describe('when no output defined', () => {
      beforeEach(() => {
        component.handleInputSubmission('blarg')
      })
      it('updates the search filters', () => {
        expect(searchService.updateFilters).toHaveBeenCalledWith({
          any: 'blarg',
        })
      })
    })
    describe('when output is defined', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        outputValue = null
        component.inputSubmitted.subscribe((event) => (outputValue = event))
        jest.spyOn(component.inputSubmitted, 'emit')
        component.handleInputSubmission('blarg')
      })
      it('updates the search filters as well', () => {
        expect(searchService.updateFilters).not.toHaveBeenCalledWith({
          any: 'blarg',
        })
      })
      it('emits inputSubmitted', () => {
        expect(component.inputSubmitted.emit).toHaveBeenCalledWith('blarg')
      })
    })
  })

  describe('search suggestion selection', () => {
    describe('when no output defined', () => {
      beforeEach(() => {
        component.handleItemSelection({
          uniqueIdentifier: '123',
          title: 'abc',
        } as CatalogRecord)
      })
      it('changes the search filters', () => {
        expect(searchFacade.setFilters).toHaveBeenCalledWith({ any: 'abc' })
      })
    })
    describe('when output is defined', () => {
      let outputValue
      beforeEach(() => {
        jest.resetAllMocks()
        outputValue = null
        component.itemSelected.subscribe((event) => (outputValue = event))
        component.handleItemSelection({
          uniqueIdentifier: '123',
          title: 'abc',
        } as CatalogRecord)
      })
      it('does not change the search filters', () => {
        expect(searchFacade.setFilters).not.toHaveBeenCalledWith({
          any: 'abc',
        })
      })
      it('emit the event', () => {
        expect(outputValue).toEqual({
          uniqueIdentifier: '123',
          title: 'abc',
        })
      })
    })
  })
})
