import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldLicenseComponent } from './form-field-license.component'
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
    component.label = 'License' // TODO: translate
    component.recordLicences = [{ text: 'cc-by' }]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('#selected', () => {
    it('should get the selected value', () => {
      expect(component.selectedLicence).toBe('cc-by')
    })
  })
  describe('#onSelectValue', () => {
    it('should emit the selected value', () => {
      const spy = jest.spyOn(component.recordLicencesChange, 'emit')
      component.handleLicenceSelection('cc-by-sa')
      expect(spy).toHaveBeenCalledWith([{ text: 'cc-by-sa' }])
    })
  })
})
