import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldLicenseComponent } from './form-field-license.component'
import { FormControl } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

describe('FormFieldLicenseComponent', () => {
  let component: FormFieldLicenseComponent
  let fixture: ComponentFixture<FormFieldLicenseComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldLicenseComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldLicenseComponent)
    component = fixture.componentInstance
    const control = new FormControl()
    control.setValue([{ text: 'cc-by' }])
    component.control = control
    component.label = 'License'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('#selected', () => {
    it('should get the selected value', () => {
      expect(component.selected).toBe('cc-by')
    })
  })
  describe('#onSelectValue', () => {
    it('should set the selected value', () => {
      component.onSelectValue('cc-by-sa')
      expect(component.control.value).toEqual([{ text: 'cc-by-sa' }])
    })
  })
})
