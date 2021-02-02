import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import {
  AnalysisStatusEnumApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { AnalysisProgressPageComponent } from './analysis-progress.page'

const jobMock: UploadJobStatusApiModel = {
  jobId: '1234',
  status: AnalysisStatusEnumApiModel.DONE,
  progress: 100,
}

const fileUploadApiServiceMock = {
  findUploadJob: jest.fn(() => of(jobMock)),
}

const activatedRouteMock = {
  params: of({ id: 1 }),
}

const routerMock = {
  navigate: jest.fn(),
}

describe('AnalysisProgress.PageComponent', () => {
  let component: AnalysisProgressPageComponent
  let fixture: ComponentFixture<AnalysisProgressPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisProgressPageComponent],
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
      const expected = '250ms (a-|)'
      const values = {
        a: jobMock,
      }
      expectObservable(component.statusFetch$).toBe(expected, values)
    })
    expect(fileUploadApiServiceMock.findUploadJob).toHaveBeenCalledWith(1)
    expect(component.progress).toBe(100)
  })

  describe('Analysis DONE', () => {
    let job
    beforeEach(() => {
      job = jobMock
      component.onJobFinish(job)
    })

    it('route to validation page', () => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['validation'], {
        relativeTo: activatedRouteMock,
        queryParams: {},
      })
    })
  })

  describe('Analysis ERROR', () => {
    let job
    beforeEach(() => {
      job = { ...jobMock, status: AnalysisStatusEnumApiModel.ERROR }
      component.onJobFinish(job)
    })

    it('route to validation page', () => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/'], {
        relativeTo: activatedRouteMock,
        queryParams: { error: 'analysis' },
      })
    })
  })
})
