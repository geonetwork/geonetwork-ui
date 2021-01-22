import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WizardFieldComponent } from './wizard-field.component'
import { TranslateModule } from '@ngx-translate/core'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { WizardFieldType } from '../../models/wizard-field.type'
import { UiModule } from '@lib/ui'
import { BrowserModule, By } from '@angular/platform-browser'
import { DEFAULT_CHIPS_ITEMS_URL } from '../configs/wizard.config'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('WizardFieldsComponent', () => {
  let component: WizardFieldComponent
  let fixture: ComponentFixture<WizardFieldComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizardFieldComponent],
      imports: [
        TranslateModule.forRoot(),
        UiModule,
        BrowserModule,
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardFieldComponent)
    component = fixture.componentInstance

    component.wizardFieldConfig = {
      id: 'title',
      label: 'datafeeder.form.title',
      icon: 'icon-title',
      type: WizardFieldType.TEXT,
    }

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Text Input', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(WizardFieldComponent)
      component = fixture.componentInstance

      component.wizardFieldConfig = {
        id: 'title',
        label: 'datafeeder.form.title',
        icon: 'icon-title',
        type: WizardFieldType.TEXT,
      }

      fixture.detectChanges()
    })

    it('should display', () => {
      component.wizardFieldConfig = {
        id: 'title',
        label: 'datafeeder.form.title',
        icon: 'icon-title',
        type: WizardFieldType.TEXT,
      }
      fixture.detectChanges()

      const el = fixture.debugElement.query(By.css('#title'))

      expect(el).not.toBeNull()
    })
  })

  describe('Abstract', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(WizardFieldComponent)
      component = fixture.componentInstance

      component.wizardFieldConfig = {
        id: 'abstract',
        label: 'datafeeder.form.abstract',
        icon: 'icon-description',
        type: WizardFieldType.TEXT_AREA,
      }

      fixture.detectChanges()
    })

    it('should display', () => {
      const el = fixture.debugElement.query(By.css('#abstract'))

      expect(el).not.toBeNull()
    })
  })

  describe('Chips', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(WizardFieldComponent)
      component = fixture.componentInstance

      component.wizardFieldConfig = {
        id: 'tags',
        label: 'datafeeder.form.tags',
        icon: 'icon-tag',
        type: WizardFieldType.CHIPS,
        options: {
          url: DEFAULT_CHIPS_ITEMS_URL,
        },
      }

      fixture.detectChanges()
    })

    it('should display', () => {
      const el = fixture.debugElement.query(By.css('#tags'))

      expect(el).not.toBeNull()
    })
  })

  describe('Datepicker', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(WizardFieldComponent)
      component = fixture.componentInstance

      component.wizardFieldConfig = {
        id: 'datepicker',
        label: 'datafeeder.form.datepicker',
        icon: 'icon-date',
        type: WizardFieldType.DATA_PICKER,
      }

      fixture.detectChanges()
    })

    it('should display', () => {
      const el = fixture.debugElement.query(By.css('#datepicker'))

      expect(el).not.toBeNull()
    })
  })

  describe('Dropdown', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(WizardFieldComponent)
      component = fixture.componentInstance

      component.wizardFieldConfig = {
        id: 'dropdown',
        label: 'datafeeder.form.dropdown',
        icon: 'icon-scale',
        type: WizardFieldType.DROPDOWN,
      }

      fixture.detectChanges()
    })

    it('should display', () => {
      const el = fixture.debugElement.query(By.css('#dropdown'))

      expect(el).not.toBeNull()
    })
  })

  describe('Text Area', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(WizardFieldComponent)
      component = fixture.componentInstance

      component.wizardFieldConfig = {
        id: 'description',
        label: 'datafeeder.form.description',
        icon: 'icon-process',
        type: WizardFieldType.TEXT_AREA,
      }

      fixture.detectChanges()
    })

    it('should display', () => {
      const el = fixture.debugElement.query(By.css('#description'))

      expect(el).not.toBeNull()
    })
  })
})
