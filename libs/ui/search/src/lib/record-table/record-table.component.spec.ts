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

  describe('get a list of formats', () => {
    it('returns a list of unique formats', () => {
      expect(component.createSet(DATASET_RECORDS[0])).toEqual([
        'shp',
        'geojson',
        'pdf',
      ])
    })
  })
})
