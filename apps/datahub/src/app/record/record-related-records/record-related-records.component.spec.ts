import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordRelatedRecordsComponent } from './record-related-records.component'
import { MockBuilder } from 'ng-mocks'

describe('RelatedRecordsComponent', () => {
  let component: RecordRelatedRecordsComponent
  let fixture: ComponentFixture<RecordRelatedRecordsComponent>

  beforeEach(() => MockBuilder(RecordRelatedRecordsComponent))

  beforeEach(async () => {
    fixture = TestBed.createComponent(RecordRelatedRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
