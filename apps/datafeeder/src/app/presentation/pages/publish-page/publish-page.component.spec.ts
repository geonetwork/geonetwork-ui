import { async, ComponentFixture, TestBed } from '@angular/core/testing'

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

describe('SumUpPageComponent', () => {
  let component: PublishPageComponent
  let fixture: ComponentFixture<PublishPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublishPageComponent],
      imports: [UiModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
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
})
