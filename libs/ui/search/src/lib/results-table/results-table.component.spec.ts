import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { TranslateModule } from '@ngx-translate/core'
import { ResultsTableComponent } from './results-table.component'

describe('ResultsTableComponent', () => {
  let component: ResultsTableComponent
  let fixture: ComponentFixture<ResultsTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NoopAnimationsModule],
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsTableComponent)
    component = fixture.componentInstance
    component.records = datasetRecordsFixture() as CatalogRecord[]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('get a list of formats and sorts them depending on priority', () => {
    it('returns a list of unique formats', () => {
      expect(
        component.getRecordFormats(datasetRecordsFixture()[0] as CatalogRecord)
      ).toEqual(['geojson', 'shp', 'pdf'])
    })
  })
  describe('get the badge color for given format', () => {
    it('returns the color for its format', () => {
      expect(
        component.getBadgeColor(
          component.getRecordFormats(
            datasetRecordsFixture()[0] as CatalogRecord
          )[0]
        )
      ).toEqual('#b3cde8') // geojson
    })
  })

  describe('sorting', () => {
    describe('#isSortedBy', () => {
      it('returns null if not sorted by this column', () => {
        component.sortOrder = ['desc', 'owner']
        const sort = component.isSortedBy('title')
        expect(sort).toBe(null)
      })
      it('returns the sort order if the current sortBy is for this column', () => {
        component.sortOrder = ['desc', 'title']
        const sort = component.isSortedBy('title')
        expect(sort).toBe('desc')
      })
      it('returns true if the current sortBy is for this column (multiple sorts)', () => {
        component.sortOrder = [
          ['asc', 'score'],
          ['desc', 'title'],
        ]
        expect(component.isSortedBy('title')).toBe('desc')
        expect(component.isSortedBy('score')).toBe('asc')
        expect(component.isSortedBy('owner')).toBe(null)
      })
    })
  })

  describe('selection', () => {
    beforeEach(() => {
      component.records = [
        {
          uniqueIdentifier: '1',
        },
        {
          uniqueIdentifier: '2',
        },
        {
          uniqueIdentifier: '3',
        },
      ] as any
    })

    describe('#isChecked', () => {
      it('should return true when the record is in the selectedRecords array', () => {
        component.selectedRecordsIdentifiers = ['1', '2']
        const record = { uniqueIdentifier: '2' } as CatalogRecord
        expect(component.isChecked(record)).toBe(true)
      })

      it('should return false when the record is not in the selectedRecords array', () => {
        component.selectedRecordsIdentifiers = ['1', '2', '3']
        const record = { uniqueIdentifier: '4' } as CatalogRecord
        expect(component.isChecked(record)).toBe(false)
      })
    })

    describe('#handleRecordSelectedChange', () => {
      it('should call selectRecords when checkbox is clicked', () => {
        const record = { uniqueIdentifier: '1' }
        let emitted = null
        component.recordsSelectedChange.subscribe((e) => (emitted = e))
        component.handleRecordSelectedChange(true, record as CatalogRecord)
        expect(emitted).toEqual([[record], true])
      })
    })

    describe('#isAllSelected', () => {
      it('returns true if all records in the page are selected', () => {
        component.selectedRecordsIdentifiers = ['1', '2', '3', '4', '5']
        expect(component.isAllSelected()).toBe(true)
      })
      it('returns false otherwise', () => {
        component.selectedRecordsIdentifiers = ['1']
        expect(component.isAllSelected()).toBe(false)
      })
    })

    describe('#isSomeSelected', () => {
      it('returns false if all records in the page are selected', () => {
        component.selectedRecordsIdentifiers = ['1', '2', '3', '4', '5']
        expect(component.isSomeSelected()).toBe(false)
      })
      it('returns true if one or more records in the page is selected', () => {
        component.selectedRecordsIdentifiers = ['2', '3']
        expect(component.isSomeSelected()).toBe(true)
      })
      it('returns false if no record in the page is selected', () => {
        component.selectedRecordsIdentifiers = ['4', '5']
        expect(component.isSomeSelected()).toBe(false)
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
      expect(JSON.stringify(clickedRecord)).toEqual(
        JSON.stringify(datasetRecordsFixture()[0])
      )
    })
  })

  describe('duplicating a dataset', () => {
    let recordToBeDuplicated: CatalogRecord

    beforeEach(() => {
      recordToBeDuplicated = null
      component.duplicateRecord.subscribe((r) => {
        recordToBeDuplicated = r
      })
    })

    it('emits a duplicateRecord event', () => {
      component.handleDuplicate(datasetRecordsFixture()[0])
      expect(JSON.stringify(recordToBeDuplicated)).toEqual(
        JSON.stringify(datasetRecordsFixture()[0])
      )
    })
  })
})
