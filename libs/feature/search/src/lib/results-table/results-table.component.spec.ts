import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { ResultsTableComponent } from './results-table.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { By } from '@angular/platform-browser'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { SelectionService } from '@geonetwork-ui/api/repository'
import { TranslateModule } from '@ngx-translate/core'

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

describe('ResultsTableComponent', () => {
  let component: ResultsTableComponent
  let searchFacade: SearchFacadeMock
  let searchService: SearchServiceMock
  let selectionService: SelectionServiceMock
  let fixture: ComponentFixture<ResultsTableComponent>

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
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsTableComponent)
    searchFacade = TestBed.inject(SearchFacade) as any
    searchService = TestBed.inject(SearchService) as any
    selectionService = TestBed.inject(SelectionService) as any
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('get a list of formats and sorts them depending on priority', () => {
    it('returns a list of unique formats', () => {
      expect(component.getRecordFormats(DATASET_RECORDS[0])).toEqual([
        'geojson',
        'shp',
        'pdf',
      ])
    })
  })
  describe('get the badge color for given format', () => {
    it('returns the color for its format', () => {
      expect(
        component.getBadgeColor(
          component.getRecordFormats(DATASET_RECORDS[0])[0]
        )
      ).toEqual('#1e5180') // geojson
    })
  })

  describe('sorting', () => {
    describe('#setSortBy', () => {
      it('calls the facade to change sort order', () => {
        component.setSortBy('title', 'asc')
        expect(searchService.setSortBy).toHaveBeenCalledWith(['asc', 'title'])
      })
    })
    describe('#isSortedBy', () => {
      it('returns null if not sorted by this column', async () => {
        searchFacade.sortBy$.next(['desc', 'owner'])
        const sort = await firstValueFrom(component.isSortedBy('title'))
        expect(sort).toBe(null)
      })
      it('returns the sort order if the current sortBy is for this column', async () => {
        searchFacade.sortBy$.next(['desc', 'title'])
        const sort = await firstValueFrom(component.isSortedBy('title'))
        expect(sort).toBe('desc')
      })
      it('returns true if the current sortBy is for this column (multiple sorts)', async () => {
        searchFacade.sortBy$.next([
          ['asc', 'score'],
          ['desc', 'title'],
        ])
        expect(await firstValueFrom(component.isSortedBy('title'))).toBe('desc')
        expect(await firstValueFrom(component.isSortedBy('score'))).toBe('asc')
        expect(await firstValueFrom(component.isSortedBy('owner'))).toBe(null)
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

    describe('#isChecked', () => {
      it('should return true when the record is in the selectedRecords array', async () => {
        selectionService.selectedRecordsIdentifiers$.next(['1', '2'])
        const record = { uniqueIdentifier: '2' } as CatalogRecord
        expect(await firstValueFrom(component.isChecked(record))).toBe(true)
      })

      it('should return false when the record is not in the selectedRecords array', async () => {
        selectionService.selectedRecordsIdentifiers$.next(['1', '2', '3'])
        const record = { uniqueIdentifier: '4' } as CatalogRecord
        expect(await firstValueFrom(component.isChecked(record))).toBe(false)
      })
    })

    describe('#handleRecordSelectedChange', () => {
      it('should call selectRecords when checkbox is clicked', () => {
        const record = { uniqueIdentifier: '1' }
        component.handleRecordSelectedChange(true, record as CatalogRecord)
        expect(selectionService.selectRecords).toHaveBeenCalledWith([record])
      })
    })

    describe('#isAllSelected', () => {
      it('returns true if all records in the page are selected', async () => {
        selectionService.selectedRecordsIdentifiers$.next([
          '1',
          '2',
          '3',
          '4',
          '5',
        ])
        expect(await firstValueFrom(component.isAllSelected())).toBe(true)
      })
      it('returns false otherwise', async () => {
        selectionService.selectedRecordsIdentifiers$.next(['1'])
        expect(await firstValueFrom(component.isAllSelected())).toBe(false)
      })
    })

    describe('#isSomeSelected', () => {
      it('returns false if all records in the page are selected', async () => {
        selectionService.selectedRecordsIdentifiers$.next([
          '1',
          '2',
          '3',
          '4',
          '5',
        ])
        expect(await firstValueFrom(component.isSomeSelected())).toBe(false)
      })
      it('returns true if one or more records in the page is selected', async () => {
        selectionService.selectedRecordsIdentifiers$.next(['2', '3'])
        expect(await firstValueFrom(component.isSomeSelected())).toBe(true)
      })
      it('returns false if no record in the page is selected', async () => {
        selectionService.selectedRecordsIdentifiers$.next(['4', '5'])
        expect(await firstValueFrom(component.isSomeSelected())).toBe(false)
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
})
