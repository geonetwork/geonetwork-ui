import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DateRangeInputsComponent } from './date-range-inputs.component.js'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('DateRangeInputsComponent', () => {
  let component: DateRangeInputsComponent
  let fixture: ComponentFixture<DateRangeInputsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangeInputsComponent],
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(DateRangeInputsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
