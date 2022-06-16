import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LinkHelperService } from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'

import { DownloadsListComponent } from './downloads-list.component'

const linkHelperServiceMock = {}
describe('DownloadsListComponent', () => {
  let component: DownloadsListComponent
  let fixture: ComponentFixture<DownloadsListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [DownloadsListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: LinkHelperService,
          useValue: linkHelperServiceMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsListComponent)
    component = fixture.componentInstance
    component.links = []
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
