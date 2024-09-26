import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { allSearchFields, RecordsListComponent } from './records-list.component'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'

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
  @Output() duplicateRecord = new EventEmitter<CatalogRecord>()
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

describe('RecordsListComponent', () => {
  let component: RecordsListComponent
  let fixture: ComponentFixture<RecordsListComponent>
  let router: Router
  let searchService: SearchService
  let searchFacade: SearchFacade

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
    }).overrideComponent(RecordsListComponent, {
      set: {
        imports: [
          CommonModule,
          MatIconModule,
          ResultsTableContainerComponent,
          PaginationButtonsComponent,
          RecordsCountComponent,
        ],
      },
    })
    router = TestBed.inject(Router)
    searchService = TestBed.inject(SearchService)
    searchFacade = TestBed.inject(SearchFacade)
    fixture = TestBed.createComponent(RecordsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('on init', () => {
    it('sets search fields', () => {
      expect(searchFacade.setConfigRequestFields).toHaveBeenCalledWith(
        allSearchFields
      )
    })
    it('sets page size', () => {
      expect(searchFacade.setPageSize).toHaveBeenCalledWith(15)
    })
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
        ...datasetRecordsFixture()[0],
        uniqueIdentifier,
      }
      beforeEach(() => {
        table.recordClick.emit(singleRecord)
      })
      it('routes to record edition', () => {
        expect(router.navigate).toHaveBeenCalledWith(['/edit', 123])
      })
    })
    describe('when asking for record duplication', () => {
      const uniqueIdentifier = 123
      const singleRecord = {
        ...datasetRecordsFixture()[0],
        uniqueIdentifier,
      }
      beforeEach(() => {
        table.duplicateRecord.emit(singleRecord)
      })
      it('routes to record duplication', () => {
        expect(router.navigate).toHaveBeenCalledWith(['/duplicate', 123])
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
