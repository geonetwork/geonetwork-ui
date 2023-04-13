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
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

const JOB_ID = '1234'

const jobMock: PublishJobStatusApiModel = {
  jobId: JOB_ID,
  status: PublishStatusEnumApiModel.Done,
  progress: 1,
}

class PublishServiceMock {
  getPublishingStatus = jest.fn(() => of(jobMock))
}
class FacadeMock {
  setUpload = jest.fn()
}
class ActivatedRouteMock {
  params = of({ id: JOB_ID })
}
class RouterMock {
  navigate = jest.fn()
}

describe('SumUpPageComponent', () => {
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
    expect(dataPublishingService.getPublishingStatus).toHaveBeenCalledWith(
      JOB_ID
    )
    expect(facade.setPublication).toHaveBeenCalledWith(jobMock)
    expect(component.progress).toBe(100)
  })

  describe('publish DONE', () => {
    let job
    beforeEach(() => {
      job = jobMock
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
