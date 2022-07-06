import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
} from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Organisation } from '@geonetwork-ui/util/shared'
import { Subject } from 'rxjs'
import { SearchFacade } from '../state/search.facade'

import { OrganisationsContainerComponent } from './organisations.container.component'

@Component({
  selector: 'gn-ui-organisation-preview',
  template: '<div></div>',
})
class OrganisationPreviewMockComponent {
  @Input() organisation: Organisation
}

const resultsAggregationsMock = {
  org: {
    buckets: [
      { key: 'My Organisation 1', doc_count: 1 },
      { key: 'My Organisation 1', doc_count: 5 },
      { key: 'My Organisation 2', doc_count: 3 },
    ],
  },
}

const searchFacadeMock = {
  resultsAggregations$: new Subject(),
  setConfigAggregations: jest.fn(),
  requestMoreResults: jest.fn(),
}
describe('OrganisationsContainerComponent', () => {
  let component: OrganisationsContainerComponent
  let fixture: ComponentFixture<OrganisationsContainerComponent>
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrganisationsContainerComponent,
        OrganisationPreviewMockComponent,
      ],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
      ],
    })
      .overrideComponent(OrganisationsContainerComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationsContainerComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('on component init', () => {
    let orgPreviewComponents: OrganisationPreviewMockComponent[]
    it('should set aggregations config', () => {
      expect(searchFacadeMock.setConfigAggregations).toHaveBeenCalledWith({
        org: {
          terms: {
            size: 1000,
            field: 'Org',
            order: {
              _key: 'asc',
            },
            exclude: '',
          },
        },
      })
    })
    it('should listen to results', () => {
      expect(searchFacadeMock.requestMoreResults).toHaveBeenCalled()
    })
    describe('resultsAggregations', () => {
      beforeEach(fakeAsync(() => {
        searchFacadeMock.resultsAggregations$.next(resultsAggregationsMock)
        tick(200)
        fixture.detectChanges()
        orgPreviewComponents = de.queryAll(
          By.directive(OrganisationPreviewMockComponent)
        )
      }))
      it('should pass first filtered organisation to first dumb component', () => {
        expect(orgPreviewComponents[0].componentInstance.organisation).toEqual({
          name: 'My Organisation 1',
          description: null,
          logoUrl: null,
          recordCount: 1,
        })
      })
      it('should pass second filtered organisation to second dumb component', () => {
        expect(orgPreviewComponents[1].componentInstance.organisation).toEqual({
          name: 'My Organisation 2',
          description: null,
          logoUrl: null,
          recordCount: 3,
        })
      })
      it('should not create a third dumb component (since organisation has been filtered)', () => {
        expect(orgPreviewComponents[2]).toBeFalsy()
      })
    })
  })
})
