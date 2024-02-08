import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import {
  AnalysisStatusEnumApiModel,
  UploadJobStatusApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { of } from 'rxjs'
import { WizardService } from '@geonetwork-ui/feature/editor'
import { DatafeederFacade } from '../../../store/datafeeder.facade'
import { DatasetValidationCsvPageComponent } from './dataset-validation-csv-page'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'

const jobMock: UploadJobStatusApiModel = {
  jobId: '1234',
  status: AnalysisStatusEnumApiModel.Done,
  progress: 100,
  datasets: [
    {
      name: 'f_name',
      featureCount: 36,
      format: 'CSV',
      options: {
        quoteChar: '"',
        csv: 'IlllYXIiLCJNYWtlIiwiTW9kZWwiLCJMZW5ndGgiCiIxOTk3IiwiRm9yZCIsIkUzNTAiLCIyLjM1IgoiMjAwMCIsIk1lcmN1cnkiLCJDb3VnYXIiLCIyLjM4Ig==',
      },
    },
  ],
}

const facadeMock = {
  upload$: of(jobMock),
}

const wizardServiceMock = {
  getConfigurationStepNumber: jest.fn(() => 6),
  initialize: jest.fn(),
  getWizardFieldData: jest.fn(() => null),
}

const activatedRouteMock = {
  params: of({ id: 1 }),
}

const routerMock = {
  navigate: jest.fn(),
}

describe('DatasetValidationCsvPageComponent', () => {
  let component: DatasetValidationCsvPageComponent
  let fixture: ComponentFixture<DatasetValidationCsvPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatasetValidationCsvPageComponent],
      imports: [UtilI18nModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: WizardService,
          useValue: wizardServiceMock,
        },
        {
          provide: DatafeederFacade,
          useValue: facadeMock,
        },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents()
  })

  it('should create', () => {
    createComponent()
    expect(component).toBeTruthy()
  })

  describe('Job DONE', () => {
    beforeEach(() => {
      createComponent()
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should contain the correct csvData', () => {
      expect(component.csvData).toEqual([
        ['Year', 'Make', 'Model', 'Length'],
        ['1997', 'Ford', 'E350', '2.35'],
        ['2000', 'Mercury', 'Cougar', '2.38'],
      ])
    })
  })

  describe('Job ERROR', () => {
    beforeEach(() => {
      jobMock.status = AnalysisStatusEnumApiModel.Error
      createComponent()
    })

    it('route to validation page', () => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/'], {
        relativeTo: activatedRouteMock,
        queryParams: { error: 'analysis' },
      })
    })
  })

  function createComponent() {
    fixture = TestBed.createComponent(DatasetValidationCsvPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }
})
