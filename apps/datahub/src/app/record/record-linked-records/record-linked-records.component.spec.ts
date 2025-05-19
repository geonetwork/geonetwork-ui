import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordLinkedRecordsComponent } from './record-linked-records.component'

describe('RecordLinkedRecordsComponent', () => {
  let component: RecordLinkedRecordsComponent
  let fixture: ComponentFixture<RecordLinkedRecordsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordLinkedRecordsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordLinkedRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
