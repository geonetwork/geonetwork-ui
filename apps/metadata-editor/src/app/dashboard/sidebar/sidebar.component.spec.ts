import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { TranslateModule } from '@ngx-translate/core'
import { MockBuilder, MockProviders } from 'ng-mocks'
import { SidebarComponent } from './sidebar.component'

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(() => {
    return MockBuilder(SidebarComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, TranslateModule.forRoot()],
      providers: [
        MockProviders(
          PlatformServiceInterface,
          AvatarServiceInterface,
          OrganizationsServiceInterface
        ),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
