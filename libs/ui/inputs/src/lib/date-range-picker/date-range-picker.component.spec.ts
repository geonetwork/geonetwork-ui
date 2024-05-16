import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DateRangePickerComponent } from './date-range-picker.component'

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent
  let fixture: ComponentFixture<DateRangePickerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangePickerComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DateRangePickerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
