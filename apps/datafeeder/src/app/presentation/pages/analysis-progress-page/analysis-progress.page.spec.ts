import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import {
  AnalysisStatusEnumApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { delay, of } from 'rxjs'
import { DatafeederFacade } from '../../../store/datafeeder.facade'
import { AnalysisProgressPageComponent } from './analysis-progress.page'
import advanceTimersByTime = jest.advanceTimersByTime

const JOB_ID = '1234'

const jobMock: UploadJobStatusApiModel = {
  jobId: JOB_ID,
  status: AnalysisStatusEnumApiModel.Done,
  progress: 1,
  datasets: [{ format: 'SHAPEFILE' }],
}
const jobMockNoDS: UploadJobStatusApiModel = {
  jobId: JOB_ID,
  status: AnalysisStatusEnumApiModel.Done,
  progress: 1,
}

class FacadeMock {
  setUpload = jest.fn()
}
class FileUploadApiServiceMock {
  _startTime = null
  _delay = 0
  _interval
  findUploadJob = jest.fn(() => {
    // simulate passage of time
    if (this._startTime === null) {
      this._startTime = Date.now()
    }
    const duration = Date.now() - this._startTime
    // total duration is 4s
    const progress = Math.min(1, Math.round(duration / 40) / 100)
    const job = {
      ...jobMock,
      progress,
      status:
        progress === 1
          ? AnalysisStatusEnumApiModel.Done
          : AnalysisStatusEnumApiModel.Analyzing,
    }
    if (progress === 1) {
      clearInterval(this._interval)
    }
    if (this._delay) {
      return of(job).pipe(delay(this._delay))
    } else {
      return of(job)
    }
  })
}
class ActivatedRouteMock {
  params = of({ id: JOB_ID })
}
class RouterMock {
  navigate = jest.fn()
}

jest.useFakeTimers()

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
    jest.spyOn(component, 'onJobFinish')
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('progress monitoring', () => {
    it('calls findUploadJob initially', async () => {
      await component.ngOnInit()
      expect(fileUploadService.findUploadJob).toHaveBeenCalledWith(JOB_ID)
    })
    it('completes after 4s', async () => {
      await component.ngOnInit()
      advanceTimersByTime(4100)
      expect(component.onJobFinish).toHaveBeenCalledTimes(1)
      expect(component.onJobFinish).toHaveBeenCalledWith({
        ...jobMock,
        status: AnalysisStatusEnumApiModel.Done,
        progress: 1,
      })
    })
    it('calls findUploadJob every 500ms', async () => {
      await component.ngOnInit()
      advanceTimersByTime(4100)
      expect(fileUploadService.findUploadJob).toHaveBeenCalledTimes(9)
    })
    it('updates progress along the way', async () => {
      await component.ngOnInit()
      expect(component.progress).toEqual(0)
      advanceTimersByTime(1000)
      expect(component.progress).toEqual(0.25)
      advanceTimersByTime(2000)
      expect(component.progress).toEqual(0.75)
      advanceTimersByTime(1000)
      expect(component.progress).toEqual(1)
      advanceTimersByTime(1000)
      expect(component.progress).toEqual(1)
    })
    describe('when status request takes more than 500ms', () => {
      beforeEach(() => {
        ;(fileUploadService as any)._delay = 1500
      })
      it('completes after 4s + delay', async () => {
        await component.ngOnInit()
        advanceTimersByTime(5500)
        expect(component.onJobFinish).toHaveBeenCalledTimes(1)
        expect(component.onJobFinish).toHaveBeenCalledWith({
          ...jobMock,
          status: AnalysisStatusEnumApiModel.Done,
          progress: 1,
        })
      })
      it('calls findUploadJob every 2 seconds', async () => {
        await component.ngOnInit()
        advanceTimersByTime(4100)
        expect(fileUploadService.findUploadJob).toHaveBeenCalledTimes(3)
      })
    })
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
