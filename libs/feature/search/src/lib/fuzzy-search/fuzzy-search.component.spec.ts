import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { AutocompleteComponent, UiInputsModule } from '@geonetwork-ui/ui/inputs'
import {
  ElasticsearchService,
  MetadataRecord,
} from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { ElasticsearchMapper } from '../utils/mapper'
import { SearchService } from '../utils/service/search.service'

import { FuzzySearchComponent } from './fuzzy-search.component'

const searchFacadeMock = {
  setFilters: jest.fn(),
  searchFilters$: new BehaviorSubject({ any: 'scot' }),
}

const searchApiServiceMock = {
  configuration: {
    basePath: '/api',
  },
  search: jest.fn(() =>
    of({
      hits: {
        hits: [
          {
            _source: {
              uuid: '123',
              resourceTitleObject: {
                default: 'abc',
              },
            },
          },
          {
            _source: {
              uuid: '456',
              resourceTitleObject: {
                default: 'def',
              },
            },
          },
        ],
      },
    })
  ),
}

const searchServiceMock = {
  updateFilters: jest.fn(),
}
const esServiceMock = {
  buildAutocompletePayload: jest.fn(() => ({ fakeQuery: '' })),
}
const elasticsearchMapperMock = {
  toRecords: jest.fn(() =>
    of([
      { uuid: '123', title: 'abc' },
      { uuid: '456', title: 'def' },
    ])
  ),
}

describe('FuzzySearchComponent', () => {
  let component: FuzzySearchComponent
  let fixture: ComponentFixture<FuzzySearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuzzySearchComponent],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
        {
          provide: ElasticsearchService,
          useValue: esServiceMock,
        },
        {
          provide: ElasticsearchMapper,
          useValue: elasticsearchMapperMock,
        },
        {
          provide: SearchApiService,
          useValue: searchApiServiceMock,
        },
        {
          provide: SearchService,
          useValue: searchServiceMock,
        },
      ],
      imports: [UiInputsModule, TranslateModule.forRoot()],
    }).compileComponents()
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
      searchFacadeMock.searchFilters$.next({ any: 'river' })
      fixture.detectChanges()
      expect(autocompleteCpt.value).toEqual({ title: 'river' })
    })
    it('object is changed on search filter update, only any is passed', () => {
      searchFacadeMock.searchFilters$.next({
        any: 'river',
        OrgForResource: { ADUGA: true },
      })
      fixture.detectChanges()
      expect(autocompleteCpt.value).toEqual({ title: 'river' })
    })
    it('no any is present in search filter, empty object is passed', () => {
      searchFacadeMock.searchFilters$.next({
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
    it('emits an array of MetadataRecord', () => {
      expect(emitted).toEqual([
        { uuid: '123', title: 'abc' },
        { uuid: '456', title: 'def' },
      ])
    })
  })

  describe('search enter key press', () => {
    let outputValue
    describe('when no output defined', () => {
      beforeEach(() => {
        component.handleInputSubmission('blarg')
      })
      it('updates the search filters', () => {
        expect(searchServiceMock.updateFilters).toHaveBeenCalledWith({
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
        expect(searchServiceMock.updateFilters).not.toHaveBeenCalledWith({
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
          uuid: '123',
          title: 'abc',
        } as MetadataRecord)
      })
      it('changes the search filters', () => {
        expect(searchFacadeMock.setFilters).toHaveBeenCalledWith({ any: 'abc' })
      })
    })
    describe('when output is defined', () => {
      let outputValue
      beforeEach(() => {
        jest.resetAllMocks()
        outputValue = null
        component.itemSelected.subscribe((event) => (outputValue = event))
        component.handleItemSelection({
          uuid: '123',
          title: 'abc',
        } as MetadataRecord)
      })
      it('does not change the search filters', () => {
        expect(searchFacadeMock.setFilters).not.toHaveBeenCalledWith({
          any: 'abc',
        })
      })
      it('emit the event', () => {
        expect(outputValue).toEqual({
          uuid: '123',
          title: 'abc',
        })
      })
    })
  })
})
