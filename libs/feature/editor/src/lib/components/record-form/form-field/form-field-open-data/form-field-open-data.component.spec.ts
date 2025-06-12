import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldOpenDataComponent } from './form-field-open-data.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

jest.mock('./../../../../fields.config', () => {
  return {
    OPEN_DATA_LICENSE: 'CC-BY',
  }
})

describe('FormFieldOpenDataComponent', () => {
  let component: FormFieldOpenDataComponent
  let fixture: ComponentFixture<FormFieldOpenDataComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldOpenDataComponent)
    component = fixture.componentInstance
    component.value = [{ text: 'odc-by' }]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the new license value on toggle', () => {
    const licenseSpy = jest.spyOn(component.valueChange, 'emit')

    component.onOpenDataToggled(true)

    expect(licenseSpy).toHaveBeenCalledWith([{ text: 'CC-BY' }])
  })

  it('should emit the new open data value on toggle', () => {
    const openDataSpy = jest.spyOn(component.openDataChange, 'emit')
    component.onOpenDataToggled(true)
    expect(openDataSpy).toHaveBeenCalledWith(true)
  })
})
