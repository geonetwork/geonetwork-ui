import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { OrganizationPageComponent } from './organization-page.component'
import { of } from 'rxjs'
import { someOrganizationsFixture } from '@geonetwork-ui/common/fixtures'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { Params } from '@angular/router'
import { MockBuilder } from 'ng-mocks'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const expectedOrganization = someOrganizationsFixture()[0]

class RouterFacadeMock {
  pathParams$ = of({ name: someOrganizationsFixture()[0].name } as Params)
}

class OrganizationsServiceInterfaceMock {
  organisations$ = of(someOrganizationsFixture())
}

describe('OrganizationPageComponent', () => {
  let component: OrganizationPageComponent
  let fixture: ComponentFixture<OrganizationPageComponent>

  beforeEach(() => MockBuilder(OrganizationPageComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
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
