import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldOpenDataComponent } from './form-field-open-data.component'
import { TranslateModule } from '@ngx-translate/core'
import { FormControl } from '@angular/forms'

jest.mock('@geonetwork-ui/util/app-config', () => {
  return {
    getGlobalConfig: () => ({
      LICENSES: ['CC-BY'],
    }),
  }
})

describe('FormFieldOpenDataComponent', () => {
  let component: FormFieldOpenDataComponent
  let fixture: ComponentFixture<FormFieldOpenDataComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldOpenDataComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldOpenDataComponent)
    component = fixture.componentInstance
    component.control = new FormControl()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the new license value on toggle', () => {
    const control = new FormControl()
    const setValueSpy = jest.spyOn(control, 'setValue')
    component.control = control

    component.onOpenDataToggled(true)

    expect(setValueSpy).toHaveBeenCalledWith([{ text: 'CC-BY' }])
  })

  it('should emit the event value on toggle', () => {
    const toggledSpy = jest.spyOn(component.visibilityChange, 'emit')
    component.onOpenDataToggled(true)
    expect(toggledSpy).toHaveBeenCalledWith(true)
  })
})
