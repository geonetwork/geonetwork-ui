import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { DatepickerComponent } from '@lib/ui'
import { RouterModule } from '@angular/router'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { MyDatePickerModule } from 'mydatepicker'

describe('DatepickerComponent', () => {
  let component: DatepickerComponent
  let fixture: ComponentFixture<DatepickerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent, RouterModule.forRoot([])],
      imports: [MyDatePickerModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
