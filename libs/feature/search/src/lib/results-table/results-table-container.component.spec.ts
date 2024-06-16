import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { ResultsTableContainerComponent } from './results-table-container.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { By } from '@angular/platform-browser'
import { BehaviorSubject } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { SelectionService } from '@geonetwork-ui/api/repository'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'

class SearchFacadeMock {
  results$ = new BehaviorSubject(DATASET_RECORDS)
  resultsHits$ = new BehaviorSubject(1000)
  setConfigRequestFields = jest.fn(() => this)
  setSortBy = jest.fn(() => this)
  sortBy$ = new BehaviorSubject<any>(['asc', 'updateDate'])
}
class SearchServiceMock {
  setPage = jest.fn()
  setSortBy = jest.fn()
}
class SelectionServiceMock {
  selectRecords = jest.fn()
  deselectRecords = jest.fn()
  clearSelection = jest.fn()
  selectedRecordsIdentifiers$ = new BehaviorSubject([])
}
class RecordsRepositoryMock {
  recordHasDraft = jest.fn(() => false)
}

describe('ResultsTableContainerComponent', () => {
  let component: ResultsTableContainerComponent
  let searchFacade: SearchFacadeMock
  let searchService: SearchServiceMock
  let selectionService: SelectionServiceMock
  let fixture: ComponentFixture<ResultsTableContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
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
          provide: SelectionService,
          useClass: SelectionServiceMock,
        },
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsTableContainerComponent)
    searchFacade = TestBed.inject(SearchFacade) as any
    searchService = TestBed.inject(SearchService) as any
    selectionService = TestBed.inject(SelectionService) as any
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('sorting', () => {
    describe('#setSortBy', () => {
      it('calls the facade to change sort order', () => {
        component.handleSortByChange('title', 'asc')
        expect(searchService.setSortBy).toHaveBeenCalledWith(['asc', 'title'])
      })
    })
  })

  describe('selection', () => {
    beforeEach(() => {
      searchFacade.results$.next([
        {
          uniqueIdentifier: '1',
        },
        {
          uniqueIdentifier: '2',
        },
        {
          uniqueIdentifier: '3',
        },
      ] as any)
    })

    describe('#handleRecordSelectedChange', () => {
      it('should call selectRecords when checkbox is clicked', () => {
        const record = { uniqueIdentifier: '1' }
        component.handleRecordsSelectedChange([record as CatalogRecord], true)
        expect(selectionService.selectRecords).toHaveBeenCalledWith([record])
      })
    })
  })

  describe('clicking on a dataset', () => {
    let clickedRecord: CatalogRecord

    beforeEach(() => {
      clickedRecord = null
      component.recordClick.subscribe((r) => (clickedRecord = r))
    })

    it('emits a recordClick event', () => {
      const tableRow = fixture.debugElement.queryAll(
        By.css('.table-row-cell')
      )[1].nativeElement as HTMLDivElement
      tableRow.parentElement.click()
      expect(clickedRecord).toEqual(DATASET_RECORDS[0])
    })
  })

  describe('#hasDraft', () => {
    it('calls the repository service', () => {
      const record = DATASET_RECORDS[0]
      component.hasDraft(record)
      expect(
        TestBed.inject(RecordsRepositoryInterface).recordHasDraft
      ).toHaveBeenCalledWith('my-dataset-001')
    })
  })
})
