if (typeof global.URL.createObjectURL !== 'function') {
  global.URL.createObjectURL = jest.fn()
}

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'

import { DataImportValidationMapPanelComponent } from './data-import-validation-map-panel.component'

describe('MapViewComponent', () => {
  let component: DataImportValidationMapPanelComponent
  let fixture: ComponentFixture<DataImportValidationMapPanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilI18nModule, TranslateModule.forRoot()],
      declarations: [DataImportValidationMapPanelComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) },
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataImportValidationMapPanelComponent)
    component = fixture.componentInstance
    component.headerLabel = 'title'
    component.geoJson = {
      type: 'Feature',
      properties: {
        id: '0',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0],
          ],
        ],
      },
    }

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display head title', () => {
    const el = fixture.debugElement.query(By.css('.header-label')).nativeElement
    expect(el.textContent).toEqual(' title ')
  })
})
