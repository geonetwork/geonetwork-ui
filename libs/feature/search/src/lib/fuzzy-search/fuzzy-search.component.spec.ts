import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AutocompleteComponent } from '@geonetwork-ui/ui/inputs'
import { BehaviorSubject, of } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FuzzySearchComponent } from './fuzzy-search.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  datasetRecordsFixture,
  searchResultsFixture,
} from '@geonetwork-ui/common/fixtures'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class SearchFacadeMock {
  setFilters = jest.fn()
  searchFilters$ = new BehaviorSubject({ any: 'scot' })
}

class SearchServiceMock {
  updateFilters = jest.fn()
}

class RecordsRepositoryMock {
  fuzzySearch = jest.fn(() => of(searchResultsFixture()))
}

describe('FuzzySearchComponent', () => {
  let component: FuzzySearchComponent
  let fixture: ComponentFixture<FuzzySearchComponent>
  let searchFacade: SearchFacadeMock
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n({
          useDefaultLang: false,
        }),
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
      expect(emitted).toEqual(datasetRecordsFixture())
    })
  })

  describe('search enter key press', () => {
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
        component.inputSubmitted.subscribe()
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

  describe('search input clear', () => {
    describe('when output is defined and search filters are not empty', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        searchFacade.searchFilters$.next({ any: 'river' })
        component.inputSubmitted.subscribe()
        jest.spyOn(component.inputSubmitted, 'emit')
        component.handleInputCleared()
      })
      it('clears the search filters', () => {
        expect(searchService.updateFilters).toHaveBeenCalledWith({
          any: '',
        })
      })
      it('does not emit inputSubmitted', () => {
        expect(component.inputSubmitted.emit).not.toHaveBeenCalled()
      })
    })
    describe('when output is defined but search filters are empty', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        searchFacade.searchFilters$.next({})
        component.inputSubmitted.subscribe()
        jest.spyOn(component.inputSubmitted, 'emit')
        component.handleInputCleared()
      })
      it('does not clear the search filters (to prevent according navigation)', () => {
        expect(searchService.updateFilters).not.toHaveBeenCalled()
      })
      it('does not emit inputSubmitted', () => {
        expect(component.inputSubmitted.emit).not.toHaveBeenCalled()
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

  describe('placeholder behaviour', () => {
    let autocomplete: AutocompleteComponent

    const create = (custom?: string) => {
      fixture = TestBed.createComponent(FuzzySearchComponent)
      component = fixture.componentInstance

      if (custom !== undefined) {
        component.placeholder = custom
      }

      fixture.detectChanges()

      autocomplete = fixture.debugElement.query(
        By.directive(AutocompleteComponent)
      ).componentInstance as AutocompleteComponent
    }

    it('passes runtime placeholder verbatim', () => {
      create('Type your custom placeholder text here…')
      expect(autocomplete.placeholder).toBe(
        'Type your custom placeholder text here…'
      )
    })

    it('falls back to default placeholder when none supplied', () => {
      create()
      expect(autocomplete.placeholder).toBe('search.field.any.placeholder')
    })
  })
})
