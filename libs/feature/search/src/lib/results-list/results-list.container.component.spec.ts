import { Component, DebugElement, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  RESULTS_LAYOUT_CONFIG,
} from '@geonetwork-ui/ui/search'
import { BehaviorSubject, of } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { ResultsListContainerComponent } from './results-list.container.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  RECORD_DATASET_URL_TOKEN,
  RECORD_SERVICE_URL_TOKEN,
  RECORD_REUSE_URL_TOKEN,
} from '../record-url.token'

@Component({
  selector: 'gn-ui-results-list',
  template: '',
})
class ResultsListMockComponent {
  @Input() records: CatalogRecord[]
  @Input() loading: boolean
  @Input() layout = 'CARD'
}
@Component({
  selector: 'gn-ui-viewport-intersector',
  template: '',
})
class ViewportIntersectorMockComponent {}

class SearchFacadeMock {
  isLoading$ = new BehaviorSubject(false)
  currentPage$ = new BehaviorSubject(3)
  totalPages$ = new BehaviorSubject(5)
  results$ = of(['one'])
  layout$ = of('CARD')
  setResultsLayout = jest.fn()
  scroll = jest.fn()
  error$ = of(null)
}

describe('ResultsListContainerComponent', () => {
  let component: ResultsListContainerComponent
  let fixture: ComponentFixture<ResultsListContainerComponent>
  let searchFacade: SearchFacadeMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ResultsListContainerComponent,
        ResultsListMockComponent,
        ViewportIntersectorMockComponent,
      ],
      imports: [ButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: RESULTS_LAYOUT_CONFIG,
          useValue: DEFAULT_RESULTS_LAYOUT_CONFIG,
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
        By.directive(ResultsListMockComponent)
      )
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('init list from state', () => {
      expect(resultsList).toBeTruthy()
      expect(searchFacade.setResultsLayout).toHaveBeenCalledWith('CARD')

      expect(resultsList.componentInstance.layout).toBe('CARD')
      expect(resultsList.componentInstance.records).toEqual(['one'])
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
          By.directive(ViewportIntersectorMockComponent)
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
