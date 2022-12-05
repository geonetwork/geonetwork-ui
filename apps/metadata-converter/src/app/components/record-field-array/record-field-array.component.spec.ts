import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordFieldArrayComponent } from './record-field-array.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('RecordFieldArrayComponent', () => {
  let component: RecordFieldArrayComponent
  let fixture: ComponentFixture<RecordFieldArrayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordFieldArrayComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordFieldArrayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
