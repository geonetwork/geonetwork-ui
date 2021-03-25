import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { DatafeederFacade } from '../../../store/datafeeder.facade'

import {
  SuccessPublishPageComponent,
  JobStatusModel,
} from './success-publish-page.component'
import { UiModule } from '@lib/ui'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
} from '@lib/datafeeder-api'
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'

const GN_LINK = 'a'
const GS_LINK = 'b'
const jobMock: JobStatusModel = {
  jobId: '1234',
  status: PublishStatusEnumApiModel.DONE,
  datasets: [
    {
      _links: {
        preview: { href: GS_LINK },
        describedBy: [{}, { href: GN_LINK }],
      },
    },
  ],
}

const activatedRouteMock = {
  params: of({ id: 1 }),
}

const routerMock = {
  navigate: jest.fn(),
}

const facadeMock = {
  publication$: of(jobMock),
}

describe('SuccessPublishPageComponent', () => {
  let component: SuccessPublishPageComponent
  let fixture: ComponentFixture<SuccessPublishPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessPublishPageComponent],
      imports: [UiModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: DatafeederFacade,
          useValue: facadeMock,
        },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPublishPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('fetches batch status', () => {
    expect(component.gnLink).toBe(GN_LINK)
    expect(component.gsLink).toBe(GS_LINK)
  })
})
