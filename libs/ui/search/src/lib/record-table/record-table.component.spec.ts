import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

import { RecordTableComponent } from './record-table.component'
import { SortByField } from '@geonetwork-ui/common/domain/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

describe('RecordTableComponent', () => {
  let component: RecordTableComponent
  let fixture: ComponentFixture<RecordTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordTableComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordTableComponent)
    component = fixture.componentInstance
    component.records = [
      { uniqueIdentifier: '1' },
      { uniqueIdentifier: '2' },
      { uniqueIdentifier: '3' },
    ] as CatalogRecord[]
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
      let newSortBy: SortByField
      beforeEach(() => {
        newSortBy = null
        component.sortByChange.subscribe((v) => (newSortBy = v))
      })
      it('initially sorts by ascending order', () => {
        component.setSortBy('title')
        expect(newSortBy).toEqual(['asc', 'title'])
      })
      it('changes the order if already sorted', () => {
        component.sortBy = ['asc', 'title']
        component.setSortBy('title')
        expect(newSortBy).toEqual(['desc', 'title'])
      })
    })
    describe('#isSortedBy', () => {
      it('returns false if not sorted by this column', () => {
        component.sortBy = ['desc', 'owner']
        expect(component.isSortedBy('title', 'desc')).toBe(false)
      })
      it('returns true if the current sortBy is for this column', () => {
        component.sortBy = ['desc', 'title']
        expect(component.isSortedBy('title', 'desc')).toBe(true)
      })
      it('returns true if the current sortBy is for this column (multiple sorts)', () => {
        component.sortBy = [
          ['asc', 'score'],
          ['desc', 'title'],
        ]
        expect(component.isSortedBy('title', 'desc')).toBe(true)
        expect(component.isSortedBy('title', 'asc')).toBe(false)
      })
    })

    describe('#isChecked', () => {
      it('should return true when the record is in the selectedRecords array', () => {
        const component = new RecordTableComponent()
        component.selectedRecords = ['1', '2', '3']
        const record = { uniqueIdentifier: '2' } as any as CatalogRecord
        expect(component.isChecked(record)).toBe(true)
      })

      it('should return false when the record is not in the selectedRecords array', () => {
        const component = new RecordTableComponent()
        component.selectedRecords = ['1', '2', '3']
        const record = { uniqueIdentifier: '4' } as any as CatalogRecord
        expect(component.isChecked(record)).toBe(false)
      })
    })

    describe('#handleRecordSelectedChange', () => {
      it('should add unique identifier to selectedRecords when checkbox is clicked for a record that is not already selected', () => {
        const component = new RecordTableComponent()
        const record = { uniqueIdentifier: '1' }
        component.selectedRecords = []

        component.handleRecordSelectedChange(
          true,
          record as any as CatalogRecord
        )

        expect(component.selectedRecords).toEqual(['1'])
      })
    })

    describe('#isAllSelected', () => {
      it('returns true if all records are selected', () => {
        component.selectedRecords = ['1', '2', '3']
        expect(component.isAllSelected()).toBe(true)
      })
      it('returns false otherwise', () => {
        component.selectedRecords = ['1']
        expect(component.isAllSelected()).toBe(false)
      })
    })
  })

  describe('#isSomeSelected', () => {
    it('returns false if all records are selected', () => {
      component.selectedRecords = ['1', '2', '3']
      expect(component.isSomeSelected()).toBe(false)
    })
    it('returns true if more than one record selected', () => {
      component.selectedRecords = ['2', '3']
      expect(component.isSomeSelected()).toBe(true)
    })
    it('returns false if no record selected', () => {
      component.selectedRecords = []
      expect(component.isSomeSelected()).toBe(false)
    })
  })
})
