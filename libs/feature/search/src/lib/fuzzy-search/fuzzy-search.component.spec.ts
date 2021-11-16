import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import {
  ElasticsearchService,
  MetadataRecord,
} from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { ElasticsearchMapper } from '../utils/mapper'

import { FuzzySearchComponent } from './fuzzy-search.component'

const searchFacadeMock = {
  setFilters: jest.fn(),
}

const searchServiceMock = {
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

const esServiceMock = {
  buildAutocompletePayload: jest.fn(() => of({ fakeQuery: '' })),
}
const elasticsearchMapperMock = {
  toRecords: jest.fn(() => [
    { uuid: '123', title: 'abc' },
    { uuid: '456', title: 'def' },
  ]),
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
    beforeEach(() => {
      component.handleInputSubmission('blarg')
    })
    it('changes the search filters', () => {
      expect(searchFacadeMock.setFilters).toHaveBeenCalledWith({ any: 'blarg' })
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
