import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { FormFieldWrapperComponent } from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'
import { FormFieldLicenseComponent } from './form-field-license/form-field-license.component'
import { FormFieldResourceUpdatedComponent } from './form-field-resource-updated/form-field-resource-updated.component'
import { FormFieldRichComponent } from './form-field-rich/form-field-rich.component'
import { FormFieldSimpleComponent } from './form-field-simple/form-field-simple.component'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent/form-field-spatial-extent.component'
import { FormFieldUpdateFrequencyComponent } from './form-field-update-frequency/form-field-update-frequency.component'
import { FormFieldComponent } from './form-field.component'
import { FormFieldTemporalExtentsComponent } from './form-field-temporal-extents/form-field-temporal-extents.component'

describe('FormFieldComponent', () => {
  let component: FormFieldComponent
  let fixture: ComponentFixture<FormFieldComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldComponent)
    component = fixture.componentInstance
    component.config = {
      type: 'text',
      labelKey: 'my.label',
    }
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('abstract field', () => {
    let formField
    beforeEach(() => {
      component.model = 'abstract'
      component.value = 'Some rich abstract value'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldRichComponent)
      ).componentInstance
    })
    it('creates a rich text form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('license field', () => {
    let formField
    beforeEach(() => {
      component.model = 'licenses'
      component.value = 'cc-by'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldLicenseComponent)
      ).componentInstance
    })
    it('creates a license form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('resource updated field', () => {
    let formField
    beforeEach(() => {
      component.model = 'resourceUpdated'
      component.value = new Date('2022-12-04T15:12:00')
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldResourceUpdatedComponent)
      ).componentInstance
    })
    it('creates a resource updated form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('update frequency field', () => {
    let formField
    beforeEach(() => {
      component.model = 'updateFrequency'
      component.value = {
        updatedTimes: 3,
        per: 'week',
      }
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldUpdateFrequencyComponent)
      ).componentInstance
    })
    it('creates an update frequency form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('temporal extents field', () => {
    let formField
    beforeEach(() => {
      component.model = 'temporalExtents'
      component.value = [
        {
          start: new Date('2024-05-24'),
          end: null,
        },
        {
          start: new Date('2024-05-30'),
        },
      ]
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldTemporalExtentsComponent)
      ).componentInstance
    })
    it('creates a temporal extents form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('simple field', () => {
    let fieldWrapper
    let formField
    beforeEach(async () => {
      component.model = 'uniqueIdentifier'
      fixture.detectChanges()
      await fixture.whenStable()
      fieldWrapper = fixture.debugElement.query(
        By.directive(FormFieldWrapperComponent)
      ).componentInstance
      formField = fixture.debugElement.query(
        By.directive(FormFieldSimpleComponent)
      ).componentInstance
    })
    it('creates a simple field field (unique identifier)', () => {
      expect(formField).toBeTruthy()
      expect(formField.type).toEqual('text')
      expect(formField.readonly).toEqual(true)
    })
    it('creates a form field wrapper', () => {
      expect(fieldWrapper).toBeTruthy()
    })
  })
  describe('spatial extent field', () => {
    let formField
    beforeEach(() => {
      component.model = 'spatialExtents'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldSpatialExtentComponent)
      ).componentInstance
    })
    it('creates an array form field', () => {
      expect(formField).toBeTruthy()
    })
  })
})
