import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

import { RecordTableComponent } from './record-table.component'

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
        'pdf',
        'shp',
        'geojson',
      ])
    })
  })
  describe('get the first format', () => {
    it('returns the first format of the list', () => {
      expect(component.firstFormat(DATASET_RECORDS[0])).toEqual('pdf')
    })
  })
  describe('get the remaining formats', () => {
    it('returns the first format of the list', () => {
      expect(component.secondToLastFormat(DATASET_RECORDS[0])).toEqual([
        'shp',
        'geojson',
      ])
    })
  })
  describe('get the badge color for given format', () => {
    it('returns the color for its format', () => {
      expect(
        component.getBadgeColor(component.firstFormat(DATASET_RECORDS[0]))
      ).toEqual('#db544a')
    })
  })
})
