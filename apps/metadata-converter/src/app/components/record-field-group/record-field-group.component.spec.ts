import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordFieldGroupComponent } from './record-field-group.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('RecordFieldObjectComponent', () => {
  let component: RecordFieldGroupComponent
  let fixture: ComponentFixture<RecordFieldGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordFieldGroupComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordFieldGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
