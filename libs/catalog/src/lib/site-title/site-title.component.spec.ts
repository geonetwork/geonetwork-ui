import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BootstrapService } from '@lib/common'
import { SITE_FIXTURES } from '@lib/gn-api'
import { BehaviorSubject } from 'rxjs'

import { SiteTitleComponent } from './site-title.component'

const commonServiceMock = {
  siteInfoReady: jest.fn(() => new BehaviorSubject(SITE_FIXTURES)),
}
describe('CatalogTitleComponent', () => {
  let component: SiteTitleComponent
  let fixture: ComponentFixture<SiteTitleComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteTitleComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: BootstrapService,
          useValue: commonServiceMock,
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTitleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
