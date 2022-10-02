import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordFieldSimpleComponent } from './record-field-simple.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('RecordFieldSimpleComponent', () => {
  let component: RecordFieldSimpleComponent
  let fixture: ComponentFixture<RecordFieldSimpleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordFieldSimpleComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordFieldSimpleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
