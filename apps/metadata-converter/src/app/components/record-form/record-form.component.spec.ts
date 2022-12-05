import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordFormComponent } from './record-form.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('RecordFormComponent', () => {
  let component: RecordFormComponent
  let fixture: ComponentFixture<RecordFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
