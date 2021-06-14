import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordPreviewComponent } from './record-preview.component'

describe('RecordResultsComponent', () => {
  let component: RecordPreviewComponent
  let fixture: ComponentFixture<RecordPreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
