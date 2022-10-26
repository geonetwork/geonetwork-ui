import { Component, DebugElement, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  RESULTS_LAYOUT_CONFIG,
  DEFAULT_RESULTS_LAYOUT_CONFIG,
} from '@geonetwork-ui/ui/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, of } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { ResultsListContainerComponent } from './results-list.container.component'

@Component({
  selector: 'gn-ui-results-list',
  template: '',
})
class ResultsListMockComponent {
  @Input() records: MetadataRecord[]
  @Input() loading: boolean
  @Input() layout = 'CARD'
}

const isEndOfResultsSubject = new BehaviorSubject(false)
const searchFacadeMock = {
  isLoading$: of(true),
  isEndOfResults$: isEndOfResultsSubject,
  results$: of(['one']),
  layout$: of('CARD'),
  setResultsLayout: jest.fn(),
  scroll: jest.fn(),
  error$: of(null),
}

describe('ResultsListContainerComponent', () => {
  let component: ResultsListContainerComponent
  let fixture: ComponentFixture<ResultsListContainerComponent>
  let de: DebugElement
  let items: DebugElement[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsListContainerComponent, ResultsListMockComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
        {
          provide: RESULTS_LAYOUT_CONFIG,
          useValue: DEFAULT_RESULTS_LAYOUT_CONFIG,
        },
      ],
    }).compileComponents()
  })

  describe('default init', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ResultsListContainerComponent)
      component = fixture.componentInstance
      component.layout = 'CARD'
      de = fixture.debugElement
      fixture.detectChanges()
      items = de.queryAll(By.directive(ResultsListMockComponent))
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('init list from state', () => {
      const uiComponent = items[0]
      expect(uiComponent).toBeTruthy()
      expect(searchFacadeMock.setResultsLayout).toHaveBeenCalledWith('CARD')

      expect(uiComponent.componentInstance.loading).toBe(true)
      expect(uiComponent.componentInstance.layout).toBe('CARD')
      expect(uiComponent.componentInstance.records).toEqual(['one'])
    })

    it('scroll call facade', () => {
      component.onShowMore()
      expect(searchFacadeMock.scroll).toHaveBeenCalled()
    })
  })
})
