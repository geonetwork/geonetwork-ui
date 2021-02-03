import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import {
  AnalysisStatusEnumApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'
import { of } from 'rxjs'
import { DatasetValidationPageComponent } from './dataset-validation-page'

const jobMock: UploadJobStatusApiModel = {
  jobId: '1234',
  status: AnalysisStatusEnumApiModel.DONE,
  progress: 100,
  datasets: [
    {
      name: 'f_name',
      featureCount: 36,
    },
  ],
}

const fileUploadApiServiceMock = {
  findUploadJob: jest.fn(() => of(jobMock)),
  getBounds: jest.fn(() =>
    of({ crs: { srs: 'EPSG:4326' }, minx: 0, maxx: 1, miny: 2, maxy: 3 })
  ),
  getSampleFeature: jest.fn(() => of({ id: 'feature_id' })),
}

const activatedRouteMock = {
  params: of({ id: 1 }),
}

const routerMock = {
  navigate: jest.fn(),
}

describe('DatasetValidationPageComponent', () => {
  let component: DatasetValidationPageComponent
  let fixture: ComponentFixture<DatasetValidationPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetValidationPageComponent],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FileUploadApiService,
          useValue: fileUploadApiServiceMock,
        },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents()
  }))

  it('should create', () => {
    createComponent()
    expect(component).toBeTruthy()
  })

  describe('Job DONE', () => {
    beforeEach(() => {
      createComponent()
      fixture.detectChanges()
    })

    it('fetch bounds and geometry', () => {
      expect(fileUploadApiServiceMock.getBounds).toHaveBeenCalledWith(
        1,
        'f_name',
        'EPSG:3857',
        true
      )
      expect(fileUploadApiServiceMock.getSampleFeature).toHaveBeenCalledWith(
        1,
        'f_name',
        0
      )

      expect(component.geoJSONData).toEqual({ id: 'feature_id' })
      expect(component.geoJSONBBox).toBeDefined()
    })
  })

  describe('Job ERROR', () => {
    beforeEach(() => {
      jobMock.status = AnalysisStatusEnumApiModel.ERROR
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
    fixture = TestBed.createComponent(DatasetValidationPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }
})
