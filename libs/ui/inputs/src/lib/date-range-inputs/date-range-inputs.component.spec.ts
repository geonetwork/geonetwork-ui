import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DateRangeInputsComponent } from './date-range-inputs.component'

describe('DateRangeInputsComponent', () => {
  let component: DateRangeInputsComponent
  let fixture: ComponentFixture<DateRangeInputsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangeInputsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DateRangeInputsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
