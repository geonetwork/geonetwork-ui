import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordPreviewCardComponent } from './record-preview-card.component'

describe('RecordPreviewCardComponent', () => {
  let component: RecordPreviewCardComponent
  let fixture: ComponentFixture<RecordPreviewCardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordPreviewCardComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewCardComponent)
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
