import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { OrganizationPageComponent } from './organization-page.component'
import { of } from 'rxjs'
import { someOrganizationsFixture } from '@geonetwork-ui/common/fixtures'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { Params } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { RouterTestingModule } from '@angular/router/testing'

const expectedOrganization = someOrganizationsFixture()[0]

class RouterFacadeMock {
  pathParams$ = of({ name: someOrganizationsFixture()[0].name } as Params)
}

class OrganizationsServiceInterfaceMock {
  getOrganisations = jest.fn(() => of(someOrganizationsFixture()))
}

describe('OrganizationPageComponent', () => {
  let component: OrganizationPageComponent
  let fixture: ComponentFixture<OrganizationPageComponent>

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
