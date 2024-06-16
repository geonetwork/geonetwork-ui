import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { SearchRecordsComponent } from './search-records-list.component'
import {
  Component,
  EventEmitter,
  importProvidersFrom,
  Input,
  Output,
} from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { By } from '@angular/platform-browser'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { Router } from '@angular/router'

const results = [{ md: true }]
const currentPage = 5
const totalPages = 25

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-results-table-container',
  template: '',
  standalone: true,
})
export class ResultsTableContainerComponent {
  @Output() recordClick = new EventEmitter<CatalogRecord>()
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-pagination-buttons',
  template: '',
  standalone: true,
})
export class PaginationButtonsComponent {
  @Input() currentPage = 1
  @Input() totalPages = 1
  @Input() hideButton = false
  @Output() newCurrentPageEvent = new EventEmitter<number>()
}

@Component({
  selector: 'md-editor-records-count',
  template: '',
  standalone: true,
})
export class RecordsCountComponent {}

class SearchFacadeMock {
  searchFilters$ = new BehaviorSubject({
    any: 'hello world',
  })
  results$ = new BehaviorSubject(results)
  currentPage$ = new BehaviorSubject(currentPage)
  totalPages$ = new BehaviorSubject(totalPages)
  resultsHits$ = new BehaviorSubject(1000)
  setConfigRequestFields = jest.fn(() => this)
  setPageSize = jest.fn(() => this)
  setSortBy = jest.fn(() => this)
}

class SearchServiceMock {
  setPage = jest.fn()
  setSortBy = jest.fn()
}

class RouterMock {
  navigate = jest.fn()
}

describe('SearchRecordsComponent', () => {
  let component: SearchRecordsComponent
  let fixture: ComponentFixture<SearchRecordsComponent>
  let router: Router
  let searchService: SearchService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(TranslateModule.forRoot()),
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: Router,
          useClass: RouterMock,
        },
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
      ],
    }).overrideComponent(SearchRecordsComponent, {
      set: {
        imports: [
          CommonModule,
          TranslateModule,
          MatIconModule,
          ResultsTableContainerComponent,
          PaginationButtonsComponent,
          UiInputsModule,
          RecordsCountComponent,
        ],
      },
    })
    fixture = TestBed.createComponent(SearchRecordsComponent)
    router = TestBed.inject(Router)
    searchService = TestBed.inject(SearchService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when search results', () => {
    let table, pagination
    beforeEach(() => {
      table = fixture.debugElement.query(
        By.directive(ResultsTableContainerComponent)
      ).componentInstance
      pagination = fixture.debugElement.query(
        By.directive(PaginationButtonsComponent)
      ).componentInstance
    })
    it('displays record table', () => {
      expect(table).toBeTruthy()
    })
    it('displays pagination', () => {
      expect(pagination).toBeTruthy()
      expect(pagination.currentPage).toEqual(currentPage)
      expect(pagination.totalPages).toEqual(totalPages)
    })
    describe('when click on a record', () => {
      const uniqueIdentifier = 123
      const singleRecord = {
        ...DATASET_RECORDS[0],
        uniqueIdentifier,
      }
      beforeEach(() => {
        table.recordClick.emit(singleRecord)
      })
      it('routes to record edition', () => {
        expect(router.navigate).toHaveBeenCalledWith(['/edit', 123])
      })
    })
    describe('when click on pagination', () => {
      beforeEach(() => {
        pagination.newCurrentPageEvent.emit(3)
      })
      it('paginates', () => {
        expect(searchService.setPage).toHaveBeenCalledWith(3)
      })
    })
  })
})
