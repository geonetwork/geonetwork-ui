import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordViewComponent } from './dataset-view.component'

describe('DatasetViewComponent', () => {
  let component: RecordViewComponent
  let fixture: ComponentFixture<RecordViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordViewComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
