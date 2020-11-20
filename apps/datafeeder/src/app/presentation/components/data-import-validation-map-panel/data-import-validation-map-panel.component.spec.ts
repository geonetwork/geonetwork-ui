import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DataImportValidationMapPanelComponent } from './data-import-validation-map-panel.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'

describe('MapViewComponent', () => {
  let component: DataImportValidationMapPanelComponent
  let fixture: ComponentFixture<DataImportValidationMapPanelComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataImportValidationMapPanelComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DataImportValidationMapPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display head title', () => {
    const el = fixture.debugElement.query(By.css('.header-label')).nativeElement

    expect(el.textContent).toEqual(component.headerLabel)
  })
})
