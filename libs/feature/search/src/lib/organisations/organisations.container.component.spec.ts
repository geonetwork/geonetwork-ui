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
import { CatalogOrganisation } from '@geonetwork-ui/util/shared'
import { Subject } from 'rxjs'
import { SearchFacade } from '../state/search.facade'

import { OrganisationsContainerComponent } from './organisations.container.component'

@Component({
  selector: 'gn-ui-organisations-list',
  template: '<div></div>',
})
class OrganisationsListMockComponent {
  @Input() organisations: CatalogOrganisation[]
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
        OrganisationsListMockComponent,
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
    let orgListComponent: OrganisationsListMockComponent
    beforeEach(() => {
      orgListComponent = de.query(
        By.directive(OrganisationsListMockComponent)
      ).componentInstance
    })
    it('should set aggregations config', () => {
      expect(searchFacadeMock.setConfigAggregations).toHaveBeenCalledWith({
        org: {
          terms: {
            size: 1000,
            field: 'Org',
            order: {
              _key: 'asc',
            },
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
        orgListComponent = fixture.debugElement.query(
          By.directive(OrganisationsListMockComponent)
        ).componentInstance
      }))
      it('should pass filtered organisations to dumb component', () => {
        expect(orgListComponent.organisations).toEqual([
          { name: 'My Organisation 1', description: null, logoUrl: null },
          { name: 'My Organisation 2', description: null, logoUrl: null },
        ])
      })
    })
  })
})
