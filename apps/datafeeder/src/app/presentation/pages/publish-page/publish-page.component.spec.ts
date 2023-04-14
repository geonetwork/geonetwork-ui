import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { DatafeederFacade } from '../../../store/datafeeder.facade'
import { PublishPageComponent } from './publish-page.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { delay, of } from 'rxjs'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import advanceTimersByTime = jest.advanceTimersByTime

const JOB_ID = '1234'

const jobMock: PublishJobStatusApiModel = {
  jobId: JOB_ID,
  status: PublishStatusEnumApiModel.Done,
  progress: 1,
}

class PublishServiceMock {
  _startTime = null
  _delay = 0
  _interval
  getPublishingStatus = jest.fn(() => {
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
          ? PublishStatusEnumApiModel.Done
          : PublishStatusEnumApiModel.Pending,
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
class FacadeMock {
  setPublication = jest.fn()
}
class ActivatedRouteMock {
  params = of({ id: JOB_ID })
}
class RouterMock {
  navigate = jest.fn()
}

jest.useFakeTimers()

describe('PublishPageComponent', () => {
  let component: PublishPageComponent
  let fixture: ComponentFixture<PublishPageComponent>
  let facade: DatafeederFacade
  let dataPublishingService: DataPublishingApiService
  let activatedRoute: ActivatedRoute
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublishPageComponent],
      imports: [UiInputsModule, UtilI18nModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: DatafeederFacade,
          useClass: FacadeMock,
        },
        { provide: DataPublishingApiService, useClass: PublishServiceMock },
        { provide: Router, useClass: RouterMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ],
    }).compileComponents()
    facade = TestBed.inject(DatafeederFacade)
    dataPublishingService = TestBed.inject(DataPublishingApiService)
    activatedRoute = TestBed.inject(ActivatedRoute)
    router = TestBed.inject(Router)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishPageComponent)
    component = fixture.componentInstance
    jest.spyOn(component, 'onJobFinish')
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('progress monitoring', () => {
    it('calls getPublishingStatus initially', async () => {
      await component.ngOnInit()
      expect(dataPublishingService.getPublishingStatus).toHaveBeenCalledWith(
        JOB_ID
      )
    })
    it('completes after 4s', async () => {
      await component.ngOnInit()
      advanceTimersByTime(4100)
      expect(component.onJobFinish).toHaveBeenCalledTimes(1)
      expect(component.onJobFinish).toHaveBeenCalledWith({
        ...jobMock,
        status: PublishStatusEnumApiModel.Done,
        progress: 1,
      })
    })
    it('calls getPublishingStatus every 500ms', async () => {
      await component.ngOnInit()
      advanceTimersByTime(4100)
      expect(dataPublishingService.getPublishingStatus).toHaveBeenCalledTimes(9)
    })
    it('updates progress along the way', async () => {
      await component.ngOnInit()
      expect(component.progress).toEqual(0)
      advanceTimersByTime(1000)
      expect(component.progress).toEqual(25)
      advanceTimersByTime(2000)
      expect(component.progress).toEqual(75)
      advanceTimersByTime(1000)
      expect(component.progress).toEqual(100)
      advanceTimersByTime(1000)
      expect(component.progress).toEqual(100)
    })
    describe('when status request takes more than 500ms', () => {
      beforeEach(() => {
        ;(dataPublishingService as any)._delay = 1500
      })
      it('completes after 4s + delay', async () => {
        await component.ngOnInit()
        advanceTimersByTime(5500)
        expect(component.onJobFinish).toHaveBeenCalledTimes(1)
        expect(component.onJobFinish).toHaveBeenCalledWith({
          ...jobMock,
          status: PublishStatusEnumApiModel.Done,
          progress: 1,
        })
      })
      it('calls getPublishingStatus every 2 seconds', async () => {
        await component.ngOnInit()
        advanceTimersByTime(4100)
        expect(dataPublishingService.getPublishingStatus).toHaveBeenCalledTimes(
          3
        )
      })
    })
  })

  describe('publish DONE', () => {
    let job
    beforeEach(async () => {
      job = jobMock
      await component.ngOnInit()
      component.onJobFinish(job)
    })

    it('route to publishok page', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/', JOB_ID, 'publishok'], {
        relativeTo: activatedRoute,
        queryParams: {},
      })
    })
  })
})
