import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { BehaviorSubject } from 'rxjs'
import { DashboardPageComponent } from './dashboard-page.component'
import { DashboardSearchService } from './dashboard-search.service'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

const results = [{ md: true }]
const currentPage = 5
const totalPages = 25

@Component({
  // eslint-disable-next-line
  selector: 'gn-ui-record-table',
  template: '',
})
export class RecordTableComponent {
  @Input() records: CatalogRecord[]
  @Output() recordSelect = new EventEmitter<CatalogRecord>()
}
@Component({
  // eslint-disable-next-line
  selector: 'gn-ui-pagination-buttons',
  template: '',
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
  resultsHits$ = new BehaviorSubject({ hits: 1000 })
}
class SearchServiceMock {}
class DashboardSearchServiceMock {
  paginate = jest.fn()
}
class RouterMock {
  navigate = jest.fn()
}

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent
  let fixture: ComponentFixture<DashboardPageComponent>
  let dashboardSearchService: DashboardSearchService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        DashboardPageComponent,
        PaginationButtonsComponent,
        RecordTableComponent,
      ],
      providers: [
        { provide: SearchFacade, useClass: SearchFacadeMock },
        {
          provide: DashboardSearchService,
          useClass: DashboardSearchServiceMock,
        },
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: Router,
          useClass: RouterMock,
        },
      ],
    })
      .overrideComponent(DashboardPageComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
          providers: [
            {
              provide: SearchService,
              useClass: SearchServiceMock,
            },
          ],
        },
      })
      .compileComponents()

    dashboardSearchService = TestBed.inject(DashboardSearchService)
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(DashboardPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })
  afterEach(() => {
    jest.clearAllMocks()
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
