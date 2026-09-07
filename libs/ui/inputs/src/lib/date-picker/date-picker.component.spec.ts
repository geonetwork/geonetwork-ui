import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DateAdapter } from '@angular/material/core'
import { type Locale } from 'date-fns/locale'
import { fr } from 'date-fns/locale/fr'
import { DateFnsAdapter } from '@angular/material-date-fns-adapter'
import { DatePickerComponent } from './date-picker.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('DatePickerComponent', () => {
  let component: DatePickerComponent
  let fixture: ComponentFixture<DatePickerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent],
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(DatePickerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('emits a typed date read in the UI locale', () => {
    const dateChange = jest.fn()
    component.dateChange.subscribe(dateChange)
    fixture.debugElement.injector
      .get<DateAdapter<Date, Locale>>(DateAdapter)
      .setLocale(fr)
    fixture.detectChanges()

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input')
    input.value = '05/08/2026'
    input.dispatchEvent(new Event('input'))
    input.dispatchEvent(new Event('change'))

    expect(dateChange).toHaveBeenCalledWith(new Date(2026, 7, 5))
  })

  it('parses typed dates with the localized adapter, not Date.parse', () => {
    expect(fixture.debugElement.injector.get(DateAdapter)).toBeInstanceOf(
      DateFnsAdapter
    )
  })
})
