import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { SearchRecordsComponent } from './search-records-list.component'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { CommonModule } from '@angular/common'

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
  @Output() recordSelect = new EventEmitter<CatalogRecord>()
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
  setFavoritesOnly = jest.fn()
  setSortBy = jest.fn()
}
class RouterMock {
  navigate = jest.fn()
}
class DashboardSearchServiceMock {
  paginate = jest.fn()
}

describe('SearchRecordsComponent', () => {
  let component: SearchRecordsComponent
  let fixture: ComponentFixture<SearchRecordsComponent>
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchRecordsComponent],
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: Router,
          useClass: RouterMock,
        },
      ],
    }).overrideComponent(SearchRecordsComponent, {
      set: {
        imports: [
          CommonModule,
          RecordTableComponent,
          PaginationButtonsComponent,
        ],
      },
    })
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(SearchRecordsComponent)
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
        expect(dashboardSearchService.paginate).toHaveBeenCalledWith(3)
      })
    })
  })
  describe('on new record click', () => {
    beforeEach(() => {
      fixture.debugElement.query(By.css('.btn-default')).nativeElement.click()
    })
    it('routes to create record page', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/create'])
    })
  })
})
