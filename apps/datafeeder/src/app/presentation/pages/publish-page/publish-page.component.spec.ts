import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { DatafeederFacade } from '../../../store/datafeeder.facade'

import { PublishPageComponent } from './publish-page.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

const jobMock: PublishJobStatusApiModel = {
  jobId: '1234',
  status: PublishStatusEnumApiModel.Done,
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublishPageComponent],
      imports: [UiInputsModule, UtilI18nModule, TranslateModule.forRoot()],
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
    expect(publishServiceMock.getPublishingStatus).toHaveBeenCalledWith(1)
    expect(facadeMock.setPublication).toHaveBeenCalledWith(jobMock)
    expect(component.progress).toBe(100)
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
