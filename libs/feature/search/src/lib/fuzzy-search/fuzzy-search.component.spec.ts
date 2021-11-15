import { ComponentFixture, inject, TestBed } from '@angular/core/testing'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchMapper } from '@geonetwork-ui/feature/record'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { SearchFacade } from '../state/search.facade'

import { FuzzySearchComponent } from './fuzzy-search.component'
import { ElasticsearchService } from '@geonetwork-ui/util/shared'
import { RouterFacade } from '@geonetwork-ui/feature/router'

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
              resourceTitleObject: {
                default: 'abc',
              },
            },
          },
          {
            _source: {
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
  toRecords: jest.fn(() => [{ title: 'abc' }, { title: 'def' }]),
}

class RouterFacadeMock {
  go = jest.fn()
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
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
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
    it('emits an array of title', () => {
      expect(emitted).toEqual(['abc', 'def'])
    })
  })

  describe('search text change', () => {
    beforeEach(() => {
      component.handleSearchTextChange('blarg')
    })
    it('changes the search filters', () => {
      expect(searchFacadeMock.setFilters).toHaveBeenCalledWith({ any: 'blarg' })
    })
    it('navigates to the search route (if router enabled)', inject(
      [RouterFacade],
      (routerFacade) => {
        expect(routerFacade.go).toHaveBeenCalledWith({
          path: 'search',
        })
      }
    ))
  })
})
