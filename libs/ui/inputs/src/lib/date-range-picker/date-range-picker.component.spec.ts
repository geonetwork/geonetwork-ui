import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DateAdapter } from '@angular/material/core'
import { type Locale } from 'date-fns/locale'
import { fr } from 'date-fns/locale/fr'
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

  it('emits typed bounds read in the UI locale', () => {
    const startDateChange = jest.fn()
    const endDateChange = jest.fn()
    component.startDateChange.subscribe(startDateChange)
    component.endDateChange.subscribe(endDateChange)
    fixture.debugElement.injector
      .get<DateAdapter<Date, Locale>>(DateAdapter)
      .setLocale(fr)
    fixture.detectChanges()

    const [start, end]: HTMLInputElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('input')
    )
    for (const [input, value] of [
      [start, '05/08/2026'],
      [end, '13/08/2026'],
    ] as [HTMLInputElement, string][]) {
      input.value = value
      input.dispatchEvent(new Event('input'))
      input.dispatchEvent(new Event('change'))
    }

    expect(startDateChange).toHaveBeenCalledWith(new Date(2026, 7, 5))
    expect(endDateChange).toHaveBeenCalledWith(new Date(2026, 7, 13))
  })

  it('parses typed dates with the localized adapter, not Date.parse', () => {
    expect(fixture.debugElement.injector.get(DateAdapter)).toBeInstanceOf(
      DateFnsAdapter
    )
  })
})
