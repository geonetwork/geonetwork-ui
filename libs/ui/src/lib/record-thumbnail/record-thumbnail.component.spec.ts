import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordThumbnailComponent } from './record-thumbnail.component'

describe('RecordThumbnailComponent', () => {
  let component: RecordThumbnailComponent
  let fixture: ComponentFixture<RecordThumbnailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordThumbnailComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordThumbnailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
