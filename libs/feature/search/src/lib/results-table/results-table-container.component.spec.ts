import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SelectionService } from '@geonetwork-ui/api/repository'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { MockBuilder, MockProviders } from 'ng-mocks'
import { of, Subject, throwError } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { ResultsTableContainerComponent } from './results-table-container.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('ResultsTableContainerComponent', () => {
  let component: ResultsTableContainerComponent
  let searchFacade: SearchFacade
  let searchService: SearchService
  let selectionService: SelectionService
  let recordsRepository: RecordsRepositoryInterface
  let notificationsService: NotificationsService
  let fixture: ComponentFixture<ResultsTableContainerComponent>

  beforeEach(() => {
    return MockBuilder(ResultsTableContainerComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProviders(
          SearchFacade,
          SearchService,
          SelectionService,
          RecordsRepositoryInterface,
          NotificationsService
        ),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsTableContainerComponent)
    searchFacade = TestBed.inject(SearchFacade)
    searchService = TestBed.inject(SearchService)
    selectionService = TestBed.inject(SelectionService)
    recordsRepository = TestBed.inject(RecordsRepositoryInterface)
    notificationsService = TestBed.inject(NotificationsService)
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
      ;(searchFacade.results$ as Subject<CatalogRecord[]>).next([
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
      component.handleRecordClick(datasetRecordsFixture()[0])
      expect(clickedRecord).toEqual(datasetRecordsFixture()[0])
    })
  })

  describe('duplicating a dataset', () => {
    let recordToBeDuplicated: CatalogRecord

    beforeEach(() => {
      recordToBeDuplicated = null
      component.duplicateRecord.subscribe((r) => (recordToBeDuplicated = r))
    })

    it('emits a duplicateRecord event', () => {
      component.handleDuplicateRecord(datasetRecordsFixture()[0])
      expect(recordToBeDuplicated).toEqual(datasetRecordsFixture()[0])
    })
  })

  describe('deleting a dataset', () => {
    describe('delete error', () => {
      it('shows notification', () => {
        recordsRepository.deleteRecord = jest.fn(() =>
          throwError(() => 'oopsie')
        )
        component.handleDeleteRecord(datasetRecordsFixture()[0])
        expect(notificationsService.showNotification).toHaveBeenCalledWith(
          {
            type: 'error',
            title: 'editor.record.deleteError.title',
            text: 'editor.record.deleteError.body oopsie',
            closeMessage: 'editor.record.deleteError.closeMessage',
          },
          undefined,
          'oopsie'
        )
      })
    })

    describe('delete success', () => {
      it('shows notification', () => {
        recordsRepository.deleteRecord = jest.fn(() => of(void 0))
        component.handleDeleteRecord(datasetRecordsFixture()[0])
        expect(recordsRepository.deleteRecord).toHaveBeenCalled()
        expect(recordsRepository.clearRecordDraft).toHaveBeenCalled()
        expect(searchFacade.requestNewResults).toHaveBeenCalled()
        expect(notificationsService.showNotification).toHaveBeenCalledWith(
          {
            type: 'success',
            title: 'editor.record.deleteSuccess.title',
            text: 'editor.record.deleteSuccess.body',
          },
          2500
        )
      })
    })
  })

  describe('#hasDraft', () => {
    it('calls the repository service', () => {
      const record = datasetRecordsFixture()[0]
      component.hasDraft(record)
      expect(
        TestBed.inject(RecordsRepositoryInterface).recordHasDraft
      ).toHaveBeenCalledWith('my-dataset-001')
    })
  })
})
