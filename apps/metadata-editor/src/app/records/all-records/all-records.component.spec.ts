import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FieldsService,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { ChangeDetectionStrategy } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { barbieUserFixture } from '@geonetwork-ui/common/fixtures'
import { ActivatedRoute, Router } from '@angular/router'
import { AllRecordsComponent } from './all-records.component'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  MockBuilder,
  MockInstance,
  MockProviders,
  NG_MOCKS_ROOT_PROVIDERS,
} from 'ng-mocks'
import { EditorRouterService } from '../../router.service'
import { Overlay } from '@angular/cdk/overlay'

describe('AllRecordsComponent', () => {
  MockInstance.scope()

  const searchFilters = new BehaviorSubject({
    any: 'hello world',
  })

  let component: AllRecordsComponent
  let fixture: ComponentFixture<AllRecordsComponent>

  let router: Router
  let searchFacade: SearchFacade
  let platformService: PlatformServiceInterface
  let fieldsService: FieldsService

  beforeEach(() => {
    return MockBuilder(AllRecordsComponent)
      .keep(Overlay)
      .keep(NG_MOCKS_ROOT_PROVIDERS)
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        MockProviders(
          FieldsService,
          SearchFacade,
          PlatformServiceInterface,
          EditorRouterService,
          ActivatedRoute,
          SearchService
        ),
      ],
    }).overrideComponent(AllRecordsComponent, {
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

    fixture = TestBed.createComponent(AllRecordsComponent)

    router = TestBed.inject(Router)
    searchFacade = TestBed.inject(SearchFacade)
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

  it('should map search filters to searchText$', (done) => {
    component.searchText$.subscribe((text) => {
      expect(text).toBe('hello world')
      done()
    })
  })

  describe('when clicking createRecord', () => {
    beforeEach(() => {
      component.createRecord()
    })

    it('navigates to the create record page', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/create'])
    })
  })

  describe('when importing a record', () => {
    beforeEach(() => {
      component.duplicateExternalRecord()
    })

    it('sets isImportMenuOpen to true', () => {
      expect(component.isImportMenuOpen).toBe(true)
    })
  })

  describe('when closing the import menu', () => {
    let overlaySpy: any

    beforeEach(() => {
      overlaySpy = {
        dispose: jest.fn(),
      }
      component['overlayRef'] = overlaySpy

      component.closeImportMenu()
    })

    it('sets isImportMenuOpen to false', () => {
      expect(component.isImportMenuOpen).toBe(false)
    })

    it('disposes the overlay', () => {
      expect(overlaySpy.dispose).toHaveBeenCalled()
    })
  })
})
