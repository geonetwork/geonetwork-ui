import { HttpClientTestingModule } from '@angular/common/http/testing'
import { getTestBed, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import {
  AnalysisStatusEnumApiModel,
  FileUploadApiService,
} from '@geonetwork-ui/data-access/datafeeder'
import { of, throwError } from 'rxjs'
import { UploadProgressGuard } from './upload-progress.guard'

const uploadApiStatusMock = {
  jobId: '123',
  progress: 1,
  status: AnalysisStatusEnumApiModel.Done,
  datasets: [{ format: 'SHAPEFILE' }],
}

const fileUploadApiServiceMock = {
  findUploadJob: jest.fn(() => of(uploadApiStatusMock)),
}

describe('UploadProgressGuard', () => {
  let injector: TestBed
  let guard: UploadProgressGuard
  const routeMock: any = { snapshot: {}, params: { id: '123' } }
  const routeStateMock: any = { snapshot: {}, url: '123/confirm' }
  const routerMock = { navigate: jest.fn() }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UploadProgressGuard,
        { provide: Router, useValue: routerMock },
        {
          provide: FileUploadApiService,
          useValue: fileUploadApiServiceMock,
        },
      ],
      imports: [HttpClientTestingModule],
    })
    injector = getTestBed()
    guard = injector.inject(UploadProgressGuard)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  let output
  describe('status is DONE ', () => {
    beforeEach(() => {
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('redirects to validation', () => {
      expect(routerMock.navigate).toHaveBeenCalledWith([
        '123/confirm',
        'validation',
      ])
      expect(output).toBe(false)
    })
  })
  describe('status is not DONE ', () => {
    beforeEach(() => {
      uploadApiStatusMock.status = AnalysisStatusEnumApiModel.Pending
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('can activate true', () => {
      expect(output).toBe(true)
    })
  })
  describe('status is not ERROR ', () => {
    beforeEach(() => {
      uploadApiStatusMock.status = AnalysisStatusEnumApiModel.Error
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('redirects to home', () => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/'])
      expect(output).toBe(false)
    })
  })

  describe('api throws error ', () => {
    beforeEach(() => {
      uploadApiStatusMock.status = AnalysisStatusEnumApiModel.Pending
      guard['fileUploadApiService'].findUploadJob = jest.fn(() =>
        throwError('api')
      )
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('redirects to home', () => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/'])
      expect(output).toBe(false)
    })
  })
})
