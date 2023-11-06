import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { RecordsListComponent } from './records-list.component'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { SelectionService } from '@geonetwork-ui/api/repository/gn4'

const results = [{ md: true }]
const currentPage = 5
const totalPages = 25

@Component({
  // eslint-disable-next-line
  selector: 'gn-ui-record-table',
  template: '',
  standalone: true,
})
export class RecordTableComponent {
  @Input() records: CatalogRecord[]
  @Input() totalHits: number
  @Output() recordSelect = new EventEmitter<CatalogRecord>()
  @Output() recordsSelection = new EventEmitter<CatalogRecord[]>()
}

@Component({
  // eslint-disable-next-line
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

class SelectionServiceMock {
  selectRecords = jest.fn()
  deselectRecords = jest.fn()
  clearSelection = jest.fn()
}

describe('RecordsListComponent', () => {
  let component: RecordsListComponent
  let fixture: ComponentFixture<RecordsListComponent>
  let router: Router
  let searchService: SearchService
  let searchFacade: SearchFacade
  let selectionService: SelectionService

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
        {
          provide: SelectionService,
          useClass: SelectionServiceMock,
        },
      ],
    }).overrideComponent(RecordsListComponent, {
      set: {
        imports: [
          CommonModule,
          MatIconModule,
          RecordTableComponent,
          PaginationButtonsComponent,
        ],
      },
    })
    router = TestBed.inject(Router)
    searchService = TestBed.inject(SearchService)
    selectionService = TestBed.inject(SelectionService)
    searchFacade = TestBed.inject(SearchFacade)
    fixture = TestBed.createComponent(RecordsListComponent)
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
        By.directive(RecordTableComponent)
      ).componentInstance
      pagination = fixture.debugElement.query(
        By.directive(PaginationButtonsComponent)
      ).componentInstance
    })
    it('displays record table', () => {
      expect(table.records).toBe(results)
    })
    it('displays pagination', () => {
      expect(pagination).toBeTruthy()
      expect(pagination.currentPage).toEqual(currentPage)
      expect(pagination.totalPages).toEqual(totalPages)
    })
    describe('when click on a record', () => {
      beforeEach(() => {
        table.recordSelect.emit({ uniqueIdentifier: 123 })
        table.recordsSelection.emit([{ uniqueIdentifier: 123 }])
      })
      it('routes to record edition', () => {
        expect(router.navigate).toHaveBeenCalledWith(['/edit', 123])
      })

      it('persists selection', () => {
        expect(selectionService.selectRecords).toHaveBeenCalled()
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
