import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  ResultsListComponent,
} from '@geonetwork-ui/ui/search'
import { BehaviorSubject, of } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { ResultsListContainerComponent } from './results-list.container.component'
import {
  ButtonComponent,
  ViewportIntersectorComponent,
} from '@geonetwork-ui/ui/inputs'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import {
  RECORD_DATASET_URL_TOKEN,
  RECORD_REUSE_URL_TOKEN,
  RECORD_SERVICE_URL_TOKEN,
} from '../record-url.token'
import { ErrorComponent } from '@geonetwork-ui/ui/elements'
import { SpinningLoaderComponent } from '@geonetwork-ui/ui/widgets'
import { FavoriteStarComponent } from '../favorites/favorite-star/favorite-star.component'
import { TranslateModule } from '@ngx-translate/core'

class SearchFacadeMock {
  isLoading$ = new BehaviorSubject(false)
  currentPage$ = new BehaviorSubject(3)
  totalPages$ = new BehaviorSubject(5)
  results$ = of([
    {
      kind: 'dataset',
      uniqueIdentifier: 'my-dataset-001',
    },
  ])
  layout$ = of('CARD')
  setResultsLayout = jest.fn()
  scroll = jest.fn()
  error$ = of(null)
}

describe('ResultsListContainerComponent', () => {
  let component: ResultsListContainerComponent
  let fixture: ComponentFixture<ResultsListContainerComponent>
  let searchFacade: SearchFacadeMock
  let intersectionObserverMock: any

  beforeAll(() => {
    intersectionObserverMock = jest.fn()
    intersectionObserverMock.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
    })
    window.IntersectionObserver = intersectionObserverMock
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ButtonComponent,
        ResultsListComponent,
        ViewportIntersectorComponent,
        SpinningLoaderComponent,
        ErrorComponent,
        FavoriteStarComponent,
        TranslateModule.forRoot(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: RECORD_DATASET_URL_TOKEN,
          useValue: '/my/record/${uuid}/open',
        },
        {
          provide: RECORD_SERVICE_URL_TOKEN,
          useValue: '/my/service/${uuid}/open',
        },
        {
          provide: RECORD_REUSE_URL_TOKEN,
          useValue: '/my/reuse/${uuid}/open',
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsListContainerComponent)
    component = fixture.componentInstance
    searchFacade = TestBed.inject(SearchFacade) as any
  })

  describe('default init', () => {
    let resultsList: DebugElement
    beforeEach(() => {
      component.layout = 'CARD'
      fixture.detectChanges()
      resultsList = fixture.debugElement.query(
        By.directive(ResultsListComponent)
      )
      resultsList.componentInstance.layout =
        DEFAULT_RESULTS_LAYOUT_CONFIG['CARD']
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('init list from state', () => {
      expect(resultsList).toBeTruthy()
      expect(searchFacade.setResultsLayout).toHaveBeenCalledWith('CARD')

      expect(resultsList.componentInstance.layout).toEqual(
        DEFAULT_RESULTS_LAYOUT_CONFIG['CARD']
      )
      expect(resultsList.componentInstance.records).toEqual([
        {
          kind: 'dataset',
          uniqueIdentifier: 'my-dataset-001',
        },
      ])
    })

    it('triggering showMore asks for new results on facade', () => {
      component.onShowMore()
      expect(searchFacade.scroll).toHaveBeenCalled()
    })
  })

  describe('show-more element', () => {
    const getShowMoreEl = () => fixture.debugElement.query(By.css('.show-more'))
    const getLoadingEl = () => fixture.debugElement.query(By.css('.loading'))
    describe('when showMore is auto', () => {
      beforeEach(() => {
        component.showMore = 'auto'
        fixture.detectChanges()
      })
      it('show-more element is a viewport intersector', () => {
        const intersector = getShowMoreEl().query(
          By.directive(ViewportIntersectorComponent)
        )
        expect(intersector).toBeTruthy()
      })
      it('loading spinner is hidden', () => {
        expect(getLoadingEl()).toBeFalsy()
      })
    })
    describe('when showMore is button', () => {
      beforeEach(() => {
        component.showMore = 'button'
        fixture.detectChanges()
      })
      it('show-more element is button', () => {
        const button = getShowMoreEl().query(By.directive(ButtonComponent))
        expect(button).toBeTruthy()
      })
    })
    describe('when showMore is none', () => {
      beforeEach(() => {
        component.showMore = 'none'
        fixture.detectChanges()
      })
      it('show-more element is hidden', () => {
        expect(getShowMoreEl()).toBeFalsy()
      })
    })
    describe('when there are no more results', () => {
      beforeEach(() => {
        searchFacade.currentPage$.next(5)
        fixture.detectChanges()
      })
      it('show-more element is hidden', () => {
        expect(getShowMoreEl()).toBeFalsy()
      })
    })
    describe('when loading', () => {
      beforeEach(() => {
        searchFacade.isLoading$.next(true)
        fixture.detectChanges()
      })
      it('show-more element is hidden', () => {
        expect(getShowMoreEl()).toBeFalsy()
      })
      it('loading spinner is shown', () => {
        expect(getLoadingEl()).toBeTruthy()
      })
    })
  })

  describe('record url', () => {
    describe('without templates', () => {
      beforeEach(() => {
        component['recordDatasetUrlTemplate'] = undefined
        component['recordServiceUrlTemplate'] = undefined
        component['recordReuseUrlTemplate'] = undefined
      })
      it('returns null', () => {
        expect(component.getRecordUrl(datasetRecordsFixture()[0])).toBe(null)
      })
    })
    describe('with templates', () => {
      beforeEach(() => {
        component['recordUrlTemplate'] = '/my/record/${uuid}/open'
      })
      it('returns actual urls', () => {
        expect(component.getRecordUrl(datasetRecordsFixture()[0])).toBe(
          '/my/record/my-dataset-001/open'
        )
      })
    })
  })
})
