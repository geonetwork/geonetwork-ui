import { ComponentFixture, TestBed } from '@angular/core/testing'
import { elasticSummaryHitsFixture } from '@geonetwork-ui/common/fixtures'
import { of } from 'rxjs'
import { LastCreatedComponent } from './last-created.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { MockBuilder } from 'ng-mocks'

class SearchFacadeMock {
  init = jest.fn()
  results$ = of(elasticSummaryHitsFixture())
  setPageSize = jest.fn(() => this)
  setSortBy = jest.fn(() => this)
  setConfigRequestFields = jest.fn(() => this)
  setResultsLayout = jest.fn(() => this)
}
class RouterFacadeMock {
  goToMetadata = jest.fn()
}

describe('LastCreatedComponent', () => {
  let component: LastCreatedComponent
  let fixture: ComponentFixture<LastCreatedComponent>
  let facade: SearchFacade

  beforeEach(() => MockBuilder(LastCreatedComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(SearchFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LastCreatedComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('get results on init', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })

    it('Should set the correct params in the facade', () => {
      expect(facade.setPageSize).toHaveBeenCalledWith(10)
      expect(facade.setSortBy).toHaveBeenCalledWith(['desc', 'createDate'])
      expect(facade.setConfigRequestFields).toHaveBeenCalledWith(
        expect.arrayContaining([
          'uuid',
          'id',
          'title',
          'createDate',
          'changeDate',
        ])
      )
    })
  })
})
