import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { SidebarComponent } from './sidebar.component'
import { ActivatedRoute } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'

class RecordsRepositoryMock {
  getAllDrafts = jest.fn().mockReturnValue(of(DATASET_RECORDS))
}

class PlatformServiceMock {
  getMe = jest.fn().mockReturnValue(of({ organisation: 'organisation' }))
}

class AvatarServiceInterfaceMock {
  getPlaceholder = () => of('http://placeholder.com')
}

class OrganisationsServiceMock {
  organisations$ = of([{ name: 'organisation' }])
}

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) },
        },
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceMock,
        },
        {
          provide: AvatarServiceInterface,
          useClass: AvatarServiceInterfaceMock,
        },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(SidebarComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
