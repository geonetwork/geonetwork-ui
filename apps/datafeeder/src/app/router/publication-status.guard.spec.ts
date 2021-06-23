import { HttpClientTestingModule } from '@angular/common/http/testing'
import { getTestBed, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import {
  DataPublishingApiService,
  PublishStatusEnumApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { of } from 'rxjs'
import { DatafeederFacade } from '../store/datafeeder.facade'
import { PublicationStatusGuard } from './publication-status.guard'

const publicationStateStatusMock = {
  jobId: '123',
  progress: 1,
  status: PublishStatusEnumApiModel.Pending,
}
const publicationApiStatusMock = {
  jobId: '123',
  progress: 1,
  status: PublishStatusEnumApiModel.Pending,
}

const dataPublishingApiServiceMock = {
  getPublishingStatus: jest.fn(() => of(publicationApiStatusMock)),
}

const facadeMock = {
  publication$: (() => of(publicationStateStatusMock))(),
  setPublication: jest.fn(),
}
describe('PublicationStatusGuard', () => {
  let injector: TestBed
  let guard: PublicationStatusGuard
  const routeMock: any = { snapshot: {}, params: { id: '123' } }
  const routeStateMock: any = { snapshot: {}, url: '123/confirm' }
  const routerMock = { navigate: jest.fn() }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicationStatusGuard,
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
    guard = injector.inject(PublicationStatusGuard)
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
      publicationStateStatusMock.status = PublishStatusEnumApiModel.Done
      guard
        .canActivate(routeMock, routeStateMock)
        .subscribe((res) => (output = res))
    })
    it('subscribes to true', () => {
      expect(facadeMock.setPublication).not.toHaveBeenCalled()
      expect(output).toBe(true)
    })
  })
  describe('when status not ready in state', () => {
    let output
    beforeEach(() => {
      publicationStateStatusMock.status = PublishStatusEnumApiModel.Pending
    })
    describe('when api returns DONE', () => {
      beforeEach(() => {
        publicationApiStatusMock.status = PublishStatusEnumApiModel.Done
        guard
          .canActivate(routeMock, routeStateMock)
          .subscribe((res) => (output = res))
      })
      it('no redirection is done', () => {
        expect(facadeMock.setPublication).toHaveBeenCalledWith(
          publicationApiStatusMock
        )
        expect(routerMock.navigate).not.toHaveBeenCalled()
        expect(output).toBe(true)
      })
    })
    describe('when api returns ERROR', () => {
      beforeEach(() => {
        publicationApiStatusMock.status = PublishStatusEnumApiModel.Error
        guard
          .canActivate(routeMock, routeStateMock)
          .subscribe((res) => (output = res))
      })
      it('redirects to /', () => {
        expect(routerMock.navigate).toHaveBeenCalledWith(['/'])
        expect(output).toBe(false)
      })
    })
  })
})
