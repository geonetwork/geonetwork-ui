import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DateAdapter } from '@angular/material/core'
import { DateFnsAdapter } from '@angular/material-date-fns-adapter'
import { DateRangePickerComponent } from './date-range-picker.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent
  let fixture: ComponentFixture<DateRangePickerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangePickerComponent],
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(DateRangePickerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('parses typed dates with the localized adapter, not Date.parse', () => {
    expect(fixture.debugElement.injector.get(DateAdapter)).toBeInstanceOf(
      DateFnsAdapter
    )
  })
})
