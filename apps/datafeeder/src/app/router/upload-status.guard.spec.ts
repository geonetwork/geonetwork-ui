import { HttpClientTestingModule } from '@angular/common/http/testing'
import { getTestBed, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { FileUploadApiService } from '@geonetwork-ui/data-access/datafeeder'
import { of, throwError } from 'rxjs'
import { PublishStatusEnumApiModel } from '@geonetwork-ui/data-access/datafeeder'
import { DatafeederFacade } from '../store/datafeeder.facade'
import { UploadStatusGuard } from './upload-status.guard'

const uploadStateStatusMock = {
  jobId: '123',
  progress: 1,
  status: PublishStatusEnumApiModel.Pending,
}
const uploadApiStatusMock = {
  jobId: '123',
  progress: 1,
  status: PublishStatusEnumApiModel.Pending,
}

const fileUploadApiServiceMock = {
  findUploadJob: jest.fn(() => of(uploadApiStatusMock)),
}

const facadeMock = {
  upload$: (() => of(uploadStateStatusMock))(),
  setUpload: jest.fn(),
}
describe('UploadStatusGuard', () => {
  let injector: TestBed
  let guard: UploadStatusGuard
  const routeMock: any = { snapshot: {}, params: { id: '123' } }
  const routeStateMock: any = { snapshot: {}, url: '123/confirm' }
  const routerMock = { navigate: jest.fn() }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UploadStatusGuard,
        { provide: Router, useValue: routerMock },
        {
          provide: FileUploadApiService,
          useValue: fileUploadApiServiceMock,
        },
        {
          provide: DatafeederFacade,
          useValue: facadeMock,
        },
      ],
      imports: [HttpClientTestingModule],
    })
    injector = getTestBed()
    guard = injector.inject(UploadStatusGuard)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  describe('when status ready in state', () => {
    let output
    beforeEach(() => {
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('subscribes to true', () => {
      expect(facadeMock.setUpload).not.toHaveBeenCalled()
      expect(output).toBe(true)
    })
  })

  describe('when no status in state', () => {
    let output
    beforeEach(() => {
      guard['facade'].upload$ = of(null)
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('fetches upload status', () => {
      expect(fileUploadApiServiceMock.findUploadJob).toHaveBeenCalledWith('123')
    })
    it('store status in state', () => {
      expect(facadeMock.setUpload).toHaveBeenCalledWith(uploadApiStatusMock)
    })
    it('authorizes the route', () => {
      expect(output).toBe(true)
    })
  })

  describe('when api error', () => {
    let output
    beforeEach(() => {
      guard['facade'].upload$ = of(null)
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
