import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OrganizationHeaderComponent } from './organization-header.component'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { AsyncPipe, Location, NgIf } from '@angular/common'
import { someOrganizationsFixture } from '@geonetwork-ui/common/fixtures'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
    HEADER_FOREGROUND_COLOR: 'white',
  }),
  getGlobalConfig() {
    return {
      LANGUAGES: ['en', 'es'],
    }
  },
}))

const locationMock: Partial<Location> = {
  back: jest.fn(),
}

describe('OrganizationHeaderComponent', () => {
  let component: OrganizationHeaderComponent
  let fixture: ComponentFixture<OrganizationHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OrganizationHeaderComponent,
        UiInputsModule,
        TranslateModule,
        NgIf,
        AsyncPipe,
        TranslateModule.forRoot(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: Location,
          useValue: locationMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationHeaderComponent)
    component = fixture.componentInstance
    component.organization = someOrganizationsFixture()[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#back', () => {
    it('calls the back function of Location', () => {
      component.back()
      expect(locationMock.back).toHaveBeenCalled()
    })
  })
})
