import { HttpClientTestingModule } from '@angular/common/http/testing'
import { getTestBed, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import {
  DataPublishingApiService,
  PublishStatusEnumApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { of, throwError } from 'rxjs'
import { DatafeederFacade } from '../store/datafeeder.facade'
import { PublicationLockGuard } from './publication-lock.guard'

const publicationApiStatusMock = {
  jobId: '123',
  progress: 1,
  status: PublishStatusEnumApiModel.Pending,
}

const dataPublishingApiServiceMock = {
  getPublishingStatus: jest.fn(() => of(publicationApiStatusMock)),
}

const facadeMock = {
  setPublication: jest.fn(),
}
describe('PublicationLockGuard', () => {
  let injector: TestBed
  let guard: PublicationLockGuard
  const routeMock: any = { snapshot: {}, params: { id: '123' } }
  const routeStateMock: any = { snapshot: {}, url: '123/confirm' }
  const routerMock = { navigate: jest.fn() }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicationLockGuard,
        { provide: Router, useValue: routerMock },
        {
          provide: DataPublishingApiService,
          useValue: dataPublishingApiServiceMock,
        },
        {
          provide: DatafeederFacade,
          useValue: facadeMock,
        },
      ],
      imports: [HttpClientTestingModule],
    })
    injector = getTestBed()
    guard = injector.inject(PublicationLockGuard)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  let output
  describe('publication status is DONE', () => {
    beforeEach(() => {
      publicationApiStatusMock.status = 'DONE'
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('redirects to ./publishok', () => {
      expect(facadeMock.setPublication).toHaveBeenCalledWith(
        publicationApiStatusMock
      )
      expect(routerMock.navigate).toHaveBeenCalledWith(['123/publishok'])
      expect(output).toBe(true)
    })
  })

  describe('publication status is RUNNING', () => {
    beforeEach(() => {
      publicationApiStatusMock.status = 'RUNNING'
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('redirects to ./publishok', () => {
      expect(facadeMock.setPublication).toHaveBeenCalledWith(
        publicationApiStatusMock
      )
      expect(routerMock.navigate).toHaveBeenCalledWith(['123/publish'])
      expect(output).toBe(true)
    })
  })
  describe('publication status is ERROR', () => {
    beforeEach(() => {
      publicationApiStatusMock.status = PublishStatusEnumApiModel.Error
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('redirects to /', () => {
      expect(routerMock.navigate).not.toHaveBeenCalled()
      expect(output).toBe(true)
    })
  })
  describe('when api returns ERROR', () => {
    beforeEach(() => {
      guard['publishService'].getPublishingStatus = jest.fn(() =>
        throwError('api')
      )
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('redirects to /', () => {
      expect(routerMock.navigate).not.toHaveBeenCalled()
      expect(output).toBe(true)
    })
  })
})
