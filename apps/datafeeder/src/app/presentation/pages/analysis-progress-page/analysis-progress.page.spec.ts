import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import {
  AnalysisStatusEnumApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { DatafeederFacade } from '../../../store/datafeeder.facade'
import { AnalysisProgressPageComponent } from './analysis-progress.page'

const jobMock: UploadJobStatusApiModel = {
  jobId: '1234',
  status: AnalysisStatusEnumApiModel.Done,
  progress: 1,
  datasets: [{}],
}
const jobMockNoDS: UploadJobStatusApiModel = {
  jobId: '1234',
  status: AnalysisStatusEnumApiModel.Done,
  progress: 1,
}

class FacadeMock {
  setUpload = jest.fn()
}
class FileUploadApiServiceMock {
  findUploadJob = jest.fn(() => of(jobMock))
}
class ActivatedRouteMock {
  params = of({ id: 1 })
}
class RouterMock {
  navigate = jest.fn()
}

describe('AnalysisProgress.PageComponent', () => {
  let component: AnalysisProgressPageComponent
  let fixture: ComponentFixture<AnalysisProgressPageComponent>
  let facade: DatafeederFacade
  let fileUploadService: FileUploadApiService
  let activatedRoute: ActivatedRoute
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalysisProgressPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FileUploadApiService,
          useClass: FileUploadApiServiceMock,
        },
        {
          provide: DatafeederFacade,
          useClass: FacadeMock,
        },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents()
    facade = TestBed.inject(DatafeederFacade)
    fileUploadService = TestBed.inject(FileUploadApiService)
    activatedRoute = TestBed.inject(ActivatedRoute)
    router = TestBed.inject(Router)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisProgressPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('fetches batch status', () => {
    const scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
    scheduler.run(({ expectObservable }) => {
      const expected = '500ms (a-|)'
      const values = {
        a: jobMock,
      }
      expectObservable(component.statusFetch$).toBe(expected, values)
    })
    expect(fileUploadService.findUploadJob).toHaveBeenCalledWith(1)
    expect(facade.setUpload).toHaveBeenCalledWith(jobMock)
    expect(component.progress).toBe(1)
  })

  describe('Analysis DONE', () => {
    describe('with dataset', () => {
      beforeEach(() => {
        component.onJobFinish(jobMock)
      })
      it('route to validation page', () => {
        expect(router.navigate).toHaveBeenCalledWith(['validation'], {
          relativeTo: activatedRoute,
          queryParams: {},
        })
      })
    })
    describe('with no dataset', () => {
      beforeEach(() => {
        component.onJobFinish(jobMockNoDS)
      })
      it('route to home page with error', () => {
        expect(router.navigate).toHaveBeenCalledWith(['/'], {
          relativeTo: activatedRoute,
          queryParams: { error: 'analysis' },
        })
      })
    })
  })

  describe('Analysis ERROR', () => {
    beforeEach(() => {
      component.onJobFinish({
        ...jobMock,
        status: AnalysisStatusEnumApiModel.Error,
      })
    })
    it('route to home page with error', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/'], {
        relativeTo: activatedRoute,
        queryParams: { error: 'analysis' },
      })
    })
  })
})
