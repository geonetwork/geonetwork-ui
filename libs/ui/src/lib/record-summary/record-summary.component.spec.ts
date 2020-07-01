import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordSummaryComponent } from './record-summary.component'

describe('RecordSummaryComponent', () => {
  let component: RecordSummaryComponent
  let fixture: ComponentFixture<RecordSummaryComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordSummaryComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSummaryComponent)
    component = fixture.componentInstance
    component.record = {
      title: 'abcd',
      abstract: 'Abcd',
      url: '/abcd.html',
      thumbnailUrl: '/abcd.jpg',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
