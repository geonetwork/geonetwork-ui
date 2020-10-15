import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordPreviewTextComponent } from './record-preview-text.component'

describe('RecordPreviewTextComponent', () => {
  let component: RecordPreviewTextComponent
  let fixture: ComponentFixture<RecordPreviewTextComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordPreviewTextComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewTextComponent)
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
