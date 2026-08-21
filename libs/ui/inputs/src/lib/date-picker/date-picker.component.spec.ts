import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DateAdapter } from '@angular/material/core'
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

  it('parses typed dates with the localized adapter, not Date.parse', () => {
    expect(fixture.debugElement.injector.get(DateAdapter)).toBeInstanceOf(
      DateFnsAdapter
    )
  })
})
