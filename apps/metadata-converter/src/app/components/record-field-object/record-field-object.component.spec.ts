import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordFieldObjectComponent } from './record-field-object.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('RecordFieldObjectComponent', () => {
  let component: RecordFieldObjectComponent
  let fixture: ComponentFixture<RecordFieldObjectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordFieldObjectComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordFieldObjectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
