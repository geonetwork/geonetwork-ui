import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Organisation } from '@geonetwork-ui/util/shared'
import { of } from 'rxjs'

import { OrganisationsComponent } from './organisations.component'
import { OrganisationsService } from './organisations.service'

@Component({
  selector: 'gn-ui-organisation-preview',
  template: '<div></div>',
})
class OrganisationPreviewMockComponent {
  @Input() organisation: Organisation
}

const organisationsMock = [
  {
    name: 'My first mock org',
    description: 'one org for testing',
    logoUrl: 'https://my-geonetwork.org/logo1.png',
    recordCount: 12,
  },
  {
    name: 'My second mock org',
    description: 'another org for testing',
    logoUrl: 'https://my-geonetwork.org/logo2.png',
    recordCount: 15,
  },
]

const organisationsServiceMock = {
  getOrganisationsWithGroups: jest.fn(() => of(organisationsMock)),
}

describe('OrganisationsComponent', () => {
  let component: OrganisationsComponent
  let fixture: ComponentFixture<OrganisationsComponent>
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganisationsComponent, OrganisationPreviewMockComponent],
      providers: [
        {
          provide: OrganisationsService,
          useValue: organisationsServiceMock,
        },
      ],
    })
      .overrideComponent(OrganisationsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(OrganisationsComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('on component init', () => {
    let orgPreviewComponents: OrganisationPreviewMockComponent[]
    it('should call getOrganisationsWithGroups', () => {
      expect(
        organisationsServiceMock.getOrganisationsWithGroups
      ).toHaveBeenCalled()
    })
    describe('pass organisations to ui components', () => {
      beforeEach(() => {
        orgPreviewComponents = de.queryAll(
          By.directive(OrganisationPreviewMockComponent)
        )
      })
      it('should pass first organisation to first dumb component', () => {
        expect(orgPreviewComponents[0].componentInstance.organisation).toEqual(
          organisationsMock[0]
        )
      })
      it('should pass second organisation to second dumb component', () => {
        expect(orgPreviewComponents[0].componentInstance.organisation).toEqual(
          organisationsMock[0]
        )
      })
    })
  })
})
