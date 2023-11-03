import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordRelatedRecordsComponent } from './record-related-records.component'

describe('RelatedRecordsComponent', () => {
  let component: RecordRelatedRecordsComponent
  let fixture: ComponentFixture<RecordRelatedRecordsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordRelatedRecordsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordRelatedRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
