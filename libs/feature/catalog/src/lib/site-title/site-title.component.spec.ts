import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SITE_FIXTURES, SiteApiService } from '@geonetwork-ui/data-access/gn4'
import { BehaviorSubject } from 'rxjs'

import { SiteTitleComponent } from './site-title.component'

class SiteApiServiceMock {
  getSiteOrPortalDescription = jest.fn(() => new BehaviorSubject(SITE_FIXTURES))
}
describe('CatalogTitleComponent', () => {
  let component: SiteTitleComponent
  let fixture: ComponentFixture<SiteTitleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteTitleComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SiteApiService,
          useClass: SiteApiServiceMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTitleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
