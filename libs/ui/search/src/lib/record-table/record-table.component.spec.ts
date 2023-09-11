import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

import { RecordTableComponent } from './record-table.component'
import { SortByField } from '@geonetwork-ui/common/domain/search'

describe('RecordTableComponent', () => {
  let component: RecordTableComponent
  let fixture: ComponentFixture<RecordTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordTableComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordTableComponent)
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
  })
})
