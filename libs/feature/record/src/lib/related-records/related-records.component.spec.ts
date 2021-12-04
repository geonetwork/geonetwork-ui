import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RelatedRecordsComponent } from './related-records.component'

describe('RelatedRecordsComponent', () => {
  let component: RelatedRecordsComponent
  let fixture: ComponentFixture<RelatedRecordsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedRecordsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
