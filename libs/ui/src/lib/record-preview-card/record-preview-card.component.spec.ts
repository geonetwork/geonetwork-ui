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
      id: '139',
      uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
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
