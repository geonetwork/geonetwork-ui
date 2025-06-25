import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MockBuilder } from 'ng-mocks'
import { FormFieldLicenseComponent } from './form-field-license/form-field-license.component'
import { FormFieldOverviewsComponent } from './form-field-overviews/form-field-overviews.component'
import { FormFieldDateComponent } from './form-field-date/form-field-date.component'
import { FormFieldRichComponent } from './form-field-rich/form-field-rich.component'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent/form-field-spatial-extent.component'
import { FormFieldTemporalExtentsComponent } from './form-field-temporal-extents/form-field-temporal-extents.component'
import { FormFieldUpdateFrequencyComponent } from './form-field-update-frequency/form-field-update-frequency.component'
import { FormFieldComponent } from './form-field.component'
import { FormFieldOnlineLinkResourcesComponent } from './form-field-online-link-resources/form-field-online-link-resources.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('FormFieldComponent', () => {
  let component: FormFieldComponent
  let fixture: ComponentFixture<FormFieldComponent>

  beforeEach(() => {
    return MockBuilder(FormFieldComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldComponent)
    component = fixture.componentInstance
    component.config = {
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
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldLicenseComponent)
      ).componentInstance
    })
    it('creates a license form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('resource created field', () => {
    let formField
    beforeEach(() => {
      component.model = 'resourceCreated'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldDateComponent)
      ).componentInstance
    })
    it('creates a resource created form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('resource updated field', () => {
    let formField
    beforeEach(() => {
      component.model = 'resourceUpdated'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldDateComponent)
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
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldTemporalExtentsComponent)
      ).componentInstance
    })
    it('creates a temporal extents form field', () => {
      expect(formField).toBeTruthy()
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
    it('creates a spatial extent form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('overviews field', () => {
    let formField
    beforeEach(() => {
      component.model = 'overviews'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldOverviewsComponent)
      ).componentInstance
    })
    it('creates an overview upload form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('attached resources field', () => {
    let formField
    beforeEach(() => {
      component.model = 'onlineResources'
      component.modelSpecifier = 'onlineResourceType:link'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldOnlineLinkResourcesComponent)
      ).componentInstance
    })
    it('creates an attached resources field', () => {
      expect(formField).toBeTruthy()
    })
  })
})
