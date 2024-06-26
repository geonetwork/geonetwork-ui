import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateService } from '@ngx-translate/core'
import { DatafeederFacade } from '../../../store/datafeeder.facade'

import {
  JobStatusModel,
  SuccessPublishPageComponent,
} from './success-publish-page.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PublishStatusEnumApiModel } from '@geonetwork-ui/data-access/datafeeder'
import { of } from 'rxjs'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { HttpClientModule } from '@angular/common/http'

const GN_LINK =
  'https://georchestra-127-0-1-1.traefik.me/geonetwork/srv/eng/catalog.search#/metadata/68ef889e-7bcd-434e-880b-606de90f673b'
const GS_LINK =
  'https://georchestra-127-0-1-1.traefik.me/geoserver/camptocamp/wms?'

const jobMock: JobStatusModel = {
  jobId: '1234',
  status: PublishStatusEnumApiModel.Done,
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
const translateServiceMock = {
  currentLang: 'fr',
}

describe('SuccessPublishPageComponent', () => {
  let component: SuccessPublishPageComponent
  let fixture: ComponentFixture<SuccessPublishPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessPublishPageComponent],
      imports: [UiInputsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: DatafeederFacade,
          useValue: facadeMock,
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPublishPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('fetches batch status', () => {
    expect(component.gnLink).toBe(
      'https://georchestra-127-0-1-1.traefik.me/geonetwork/srv/fre/catalog.search#/metadata/68ef889e-7bcd-434e-880b-606de90f673b'
    )
    expect(component.gsLink).toBe(GS_LINK)
  })
})
