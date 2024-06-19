import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { OrganizationPageComponent } from './organization-page.component'
import { of } from 'rxjs'
import { ORGANISATIONS_FIXTURE } from '@geonetwork-ui/common/fixtures'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { Params } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { RouterTestingModule } from '@angular/router/testing'

const expectedOrganization = ORGANISATIONS_FIXTURE[0]

class RouterFacadeMock {
  pathParams$ = of({ name: ORGANISATIONS_FIXTURE[0].name } as Params)
}

class OrganizationsServiceInterfaceMock {
  organisations$ = of(ORGANISATIONS_FIXTURE)
}

describe('OrganizationPageComponent', () => {
  let component: OrganizationPageComponent
  let fixture: ComponentFixture<OrganizationPageComponent>
  let organizationsServiceInterface: OrganizationsServiceInterface

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OrganizationPageComponent,
        TranslateModule.forRoot({}),
        RouterTestingModule,
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganizationsServiceInterfaceMock,
        },
      ],
    })
      .overrideComponent(OrganizationPageComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
          imports: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents()

    organizationsServiceInterface = TestBed.inject(
      OrganizationsServiceInterface
    )

    fixture = TestBed.createComponent(OrganizationPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit()
    })
    it('organization$', () => {
      component.organization$.subscribe((org) => {
        expect(org).toBe(expectedOrganization)
      })
    })
  })
})
