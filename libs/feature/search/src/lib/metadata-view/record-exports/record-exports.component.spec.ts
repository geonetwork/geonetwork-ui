import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordExportsComponent } from './record-exports.component'

describe('RecordExportsComponent', () => {
  let component: RecordExportsComponent
  let fixture: ComponentFixture<RecordExportsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordExportsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordExportsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
