import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganisationsPageComponent } from './organisations-page.component'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { someOrganizationsFixture } from '@geonetwork-ui/common/fixtures'

class RouterFacadeMock {
  goToOrganization = jest.fn()
}

describe('OrganisationsPageComponent', () => {
  let component: OrganisationsPageComponent
  let fixture: ComponentFixture<OrganisationsPageComponent>
  let routerFacade: RouterFacade

  const selectedOrganization = someOrganizationsFixture()[0]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganisationsPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
      ],
    }).compileComponents()

    routerFacade = TestBed.inject(RouterFacade)

    fixture = TestBed.createComponent(OrganisationsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('onOrganizationSelection', () => {
    it('should goToOrganization page', () => {
      component.onOrganizationSelection(selectedOrganization)

      fixture.detectChanges()

      expect(routerFacade.goToOrganization).toHaveBeenCalledWith(
        selectedOrganization.name
      )
    })
  })
})
