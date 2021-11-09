import { Component, DebugElement, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MetadataRecord, ResultsListLayout } from '@geonetwork-ui/util/shared'
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
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
}

const isEndOfResultsSubject = new BehaviorSubject(false)
const searchFacadeMock = {
  isLoading$: of(true),
  isEndOfResults$: isEndOfResultsSubject,
  results$: of(['one']),
  layout$: of('CARD'),
  setResultsLayout: jest.fn(),
  scroll: jest.fn(),
}

describe('ResultsListContainerComponent', () => {
  let component: ResultsListContainerComponent
  let fixture: ComponentFixture<ResultsListContainerComponent>
  let de: DebugElement
  let items: DebugElement[]

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ResultsListContainerComponent, ResultsListMockComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
      ],
    }).compileComponents()
  })

  describe('default init', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ResultsListContainerComponent)
      component = fixture.componentInstance
      component.layout = ResultsListLayout.CARD
      de = fixture.debugElement
      items = de.queryAll(By.directive(ResultsListMockComponent))
      fixture.detectChanges()
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
      component.onScrollDown()
      expect(searchFacadeMock.scroll).toHaveBeenCalled()
    })
  })

  describe('scrollDisable$', () => {
    let disabled
    let subscription
    describe('when scroll is disabled from input', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(ResultsListContainerComponent)
        component = fixture.componentInstance
        component.scrollableOptions = {
          disabled: true,
        }
        fixture.detectChanges()
        subscription = component.scrollDisable$.subscribe((v) => (disabled = v))
      })
      afterEach(() => {
        subscription.unsubscribe()
      })
      it('emits true', () => {
        expect(disabled).toBe(true)
      })
    })

    describe('when scroll is enabled from input', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(ResultsListContainerComponent)
        component = fixture.componentInstance
        component.scrollableOptions = {
          disabled: false,
        }
        fixture.detectChanges()
        subscription = component.scrollDisable$.subscribe((v) => (disabled = v))
      })
      afterEach(() => {
        subscription.unsubscribe()
      })
      it('emits isEndOfResults$', () => {
        expect(disabled).toBe(false)
        isEndOfResultsSubject.next(true)
        expect(disabled).toBe(true)
      })
    })
  })
})
