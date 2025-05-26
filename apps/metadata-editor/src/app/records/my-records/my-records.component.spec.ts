import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyRecordsComponent } from './my-records.component'
import {
  FieldsService,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { ChangeDetectionStrategy } from '@angular/core'
import { BehaviorSubject, of } from 'rxjs'
import { barbieUserFixture } from '@geonetwork-ui/common/fixtures'
import { EditorRouterService } from '../../router.service'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { MockBuilder, MockInstance, MockProviders } from 'ng-mocks'
import { ActivatedRoute, Router } from '@angular/router'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('MyRecordsComponent', () => {
  MockInstance.scope()

  const searchFilters = new BehaviorSubject({
    any: 'hello world',
  })

  let component: MyRecordsComponent
  let fixture: ComponentFixture<MyRecordsComponent>

  let router: Router
  let searchFacade: SearchFacade
  let platformService: PlatformServiceInterface
  let fieldsService: FieldsService

  const user = barbieUserFixture()

  beforeEach(() => {
    return MockBuilder(MyRecordsComponent)
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProviders(
          FieldsService,
          SearchFacade,
          PlatformServiceInterface,
          EditorRouterService,
          ActivatedRoute,
          SearchService
        ),
      ],
    }).overrideComponent(MyRecordsComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default,
      },
    })

    MockInstance(
      SearchFacade,
      'searchFilters$',
      jest.fn(),
      'get'
    ).mockReturnValue(searchFilters)

    MockInstance(ActivatedRoute, 'snapshot', jest.fn(), 'get').mockReturnValue({
      paramMap: new Map([['paramId', 'paramValue']]),
      queryParams: new Map([['paramId', 'paramValue']]),
    })

    fixture = TestBed.createComponent(MyRecordsComponent)

    searchFacade = TestBed.inject(SearchFacade)
    router = TestBed.inject(Router)
    platformService = TestBed.inject(PlatformServiceInterface)
    fieldsService = TestBed.inject(FieldsService)

    router.navigate = jest.fn().mockReturnValue(Promise.resolve(true))

    platformService.getMe = jest.fn(
      () => new BehaviorSubject(barbieUserFixture())
    )

    fieldsService.buildFiltersFromFieldValues = jest.fn((fieldValues) =>
      of(
        Object.keys(fieldValues).reduce(
          (_, curr) => ({
            [curr]: fieldValues[curr],
          }),
          {}
        )
      )
    )

    searchFacade.resetSearch = jest.fn(() => this)
    searchFacade.updateFilters = jest.fn(() => this)
    searchFacade.setFilters = jest.fn(() => this)
    searchFacade.setSortBy = jest.fn(() => this)
    searchFacade.setPageSize = jest.fn(() => this)
    searchFacade.setConfigRequestFields = jest.fn(() => this)

    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('filters on init', () => {
    it('updates filters with owner', () => {
      expect(searchFacade.updateFilters).toHaveBeenCalledWith({
        owner: user.id,
      })
    })
  })
})
