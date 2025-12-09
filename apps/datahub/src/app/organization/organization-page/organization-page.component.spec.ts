import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { OrganizationPageComponent } from './organization-page.component'
import { of } from 'rxjs'
import { someOrganizationsFixture } from '@geonetwork-ui/common/fixtures'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { TitleService } from '../../router/datahub-title.service'

const expectedOrganization = someOrganizationsFixture()[0]

describe('OrganizationPageComponent', () => {
  let component: OrganizationPageComponent
  let fixture: ComponentFixture<OrganizationPageComponent>

  beforeEach(() => MockBuilder(OrganizationPageComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProvider(OrganizationsServiceInterface),
        MockProvider(RouterFacade),
        MockProvider(TitleService),
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
    it('should match orgs with a slash', () => {
      const orgWithSlash = {
        ...expectedOrganization,
        name: 'org/withslash',
      }

      const orgService = TestBed.inject(OrganizationsServiceInterface) as any
      orgService.organisations$ = of([orgWithSlash])

      const router = TestBed.inject(RouterFacade) as any
      router.pathParams$ = of({ name: 'orgwithslash' })

      component.ngOnInit()

      component.organization$.subscribe((org) => {
        expect(org).toEqual(orgWithSlash)
      })
    })

    it('should match orgs with multiple slash', () => {
      const orgWithSlash = {
        ...expectedOrganization,
        name: 'org/with/multiples/slash',
      }

      const orgService = TestBed.inject(OrganizationsServiceInterface) as any
      orgService.organisations$ = of([orgWithSlash])

      const router = TestBed.inject(RouterFacade) as any
      router.pathParams$ = of({ name: 'orgwithmultiplesslash' })

      component.ngOnInit()

      component.organization$.subscribe((org) => {
        expect(org).toEqual(orgWithSlash)
      })
    })
    it('should set the page title', () => {
      const titleService = TestBed.inject(TitleService)
      const orgService = TestBed.inject(OrganizationsServiceInterface) as any
      orgService.organisations$ = of([expectedOrganization])

      jest.spyOn(titleService, 'setTitle')
      component.ngOnInit()

      component.organization$.subscribe(() => {
        expect(titleService.setTitle).toHaveBeenCalledWith(
          expectedOrganization.name
        )
      })
    })
  })
})
