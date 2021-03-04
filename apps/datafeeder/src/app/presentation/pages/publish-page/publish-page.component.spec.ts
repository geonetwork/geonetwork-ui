import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { DatafeederFacade } from '../../../store/datafeeder.facade'

import { PublishPageComponent } from './publish-page.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { UiModule } from '@lib/ui'
import { Router, ActivatedRoute } from '@angular/router'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
} from '@lib/datafeeder-api'
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'

const jobMock: PublishJobStatusApiModel = {
  jobId: '1234',
  status: PublishStatusEnumApiModel.DONE,
  progress: 1,
}

const publishServiceMock = {
  getPublishingStatus: jest.fn(() => of(jobMock)),
}

const activatedRouteMock = {
  params: of({ id: 1 }),
}

const routerMock = {
  navigate: jest.fn(),
}
const facadeMock = {
  setPublication: jest.fn(),
}

describe('SumUpPageComponent', () => {
  let component: PublishPageComponent
  let fixture: ComponentFixture<PublishPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublishPageComponent],
      imports: [UiModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: DatafeederFacade,
          useValue: facadeMock,
        },
        { provide: DataPublishingApiService, useValue: publishServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents()
  }))

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
    expect(publishServiceMock.getPublishingStatus).toHaveBeenCalledWith(1)
    expect(facadeMock.setPublication).toHaveBeenCalledWith({
      jobId: '1234',
      progress: 1,
      status: 'DONE',
    })
    expect(component.progress).toBe(1)
  })

  describe('publish DONE', () => {
    let job
    beforeEach(() => {
      job = jobMock
      component.onJobFinish(job)
    })

    it('route to publishok page', () => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/', 1, 'publishok'], {
        relativeTo: activatedRouteMock,
        queryParams: {},
      })
    })
  })
})
