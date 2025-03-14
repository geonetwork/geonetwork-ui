import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WizardFieldComponent } from './wizard-field.component'
import { TranslateModule } from '@ngx-translate/core'
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { WizardFieldType } from '../../models/wizard-field.type'
import { BrowserModule, By } from '@angular/platform-browser'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { WizardService } from '../../services/wizard.service'
import { TextInputComponent, UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

const DEFAULT_CHIPS_ITEMS_URL = (keys) =>
  `https://apps.titellus.net/geonetwork/srv/api/registries/vocabularies/search?type=CONTAINS&thesaurus=external.place.regions&rows=200&q=${keys}&uri=*QUERY*&lang=eng`

describe('WizardFieldsComponent', () => {
  let component: WizardFieldComponent
  let fixture: ComponentFixture<WizardFieldComponent>
  let debugElement: DebugElement
  let wizardService: WizardService
  let dataChangedSpy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WizardFieldComponent],
      imports: [
        TranslateModule.forRoot(),
        UiInputsModule,
        BrowserModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TextInputComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

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
      debugElement = fixture.debugElement
      component = fixture.componentInstance

      wizardService = debugElement.injector.get(WizardService)
      dataChangedSpy = jest.spyOn(
        wizardService,
        'onWizardWizardFieldDataChanged'
      )

      component.wizardFieldConfig = {
        id: 'dropdown',
        label: 'datafeeder.form.dropdown',
        icon: 'icon-scale',
        type: WizardFieldType.DROPDOWN,
        options: [{ label: '1', value: '1' }],
      }

      fixture.detectChanges()
    })

    it('should display', () => {
      const el = fixture.debugElement.query(By.css('#dropdown'))

      expect(el).not.toBeNull()
    })
    // TODO: fix by passing selected data on dropdown input
    // it('should call the service with correct value', (done) => {
    //   setTimeout(() => {
    //     expect(dataChangedSpy).toHaveBeenCalledWith('dropdown', '1')
    //     done()
    //   })
    // })
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
