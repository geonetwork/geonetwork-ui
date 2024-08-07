import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { SelectionService } from '@geonetwork-ui/api/repository'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, throwError } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { ResultsTableContainerComponent } from './results-table-container.component'

class SearchFacadeMock {
  results$ = new BehaviorSubject(DATASET_RECORDS)
  resultsHits$ = new BehaviorSubject(1000)
  setConfigRequestFields = jest.fn(() => this)
  setSortBy = jest.fn(() => this)
  sortBy$ = new BehaviorSubject<any>(['asc', 'updateDate'])
  requestNewResults = jest.fn()
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
  deleteRecord = jest.fn(() => of(void 0))
  clearRecordDraft = jest.fn()
}
class NotificationsServiceMock {
  showNotification = jest.fn()
}

describe('ResultsTableContainerComponent', () => {
  let component: ResultsTableContainerComponent
  let searchFacade: SearchFacadeMock
  let searchService: SearchServiceMock
  let selectionService: SelectionServiceMock
  let recordsRepository: RecordsRepositoryMock
  let notificationsService: NotificationsServiceMock
  let fixture: ComponentFixture<ResultsTableContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NoopAnimationsModule],
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
        { provide: NotificationsService, useClass: NotificationsServiceMock },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsTableContainerComponent)
    searchFacade = TestBed.inject(SearchFacade) as any
    searchService = TestBed.inject(SearchService) as any
    selectionService = TestBed.inject(SelectionService) as any
    recordsRepository = TestBed.inject(RecordsRepositoryInterface) as any
    notificationsService = TestBed.inject(NotificationsService) as any
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

  describe('duplicating a dataset', () => {
    let recordToBeDuplicated: CatalogRecord

    beforeEach(() => {
      recordToBeDuplicated = null
      component.duplicateRecord.subscribe((r) => (recordToBeDuplicated = r))
    })

    it('emits a duplicateRecord event', () => {
      const menuButton = fixture.debugElement.query(
        By.css('[data-test="record-menu-button"]')
      ).nativeElement as HTMLButtonElement
      menuButton.click()
      fixture.detectChanges()
      const duplicateButton = fixture.debugElement.query(
        By.css('[data-test="record-menu-duplicate-button"]')
      ).nativeElement as HTMLButtonElement
      duplicateButton.click()
      expect(recordToBeDuplicated).toEqual(DATASET_RECORDS[0])
    })
  })

  describe('deleting a dataset', () => {
    describe('delete error', () => {
      it('shows notification', () => {
        recordsRepository.deleteRecord = jest.fn(() =>
          throwError(() => 'oopsie')
        )
        component.handleDeleteRecord(DATASET_RECORDS[0])
        expect(notificationsService.showNotification).toHaveBeenCalledWith({
          type: 'error',
          title: 'editor.record.deleteError.title',
          text: 'editor.record.deleteError.body oopsie',
          closeMessage: 'editor.record.deleteError.closeMessage',
        })
      })
    })

    describe('delete success', () => {
      it('shows notification', () => {
        component.handleDeleteRecord(DATASET_RECORDS[0])
        expect(recordsRepository.deleteRecord).toHaveBeenCalled()
        expect(recordsRepository.clearRecordDraft).toHaveBeenCalled()
        expect(searchFacade.requestNewResults).toHaveBeenCalled()
      })
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
