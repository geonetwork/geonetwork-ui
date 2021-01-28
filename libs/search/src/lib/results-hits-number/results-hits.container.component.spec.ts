import { Component, DebugElement, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchFacade } from '@lib/search'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'

import { ResultsHitsContainerComponent } from './results-hits.container.component'

@Component({
  selector: 'ui-results-hits-number',
  template: '',
})
class ResultsHitsNumberComponentMock {
  @Input() hits
  @Input() loading: boolean
}

const searchFacadeMock = {
  isLoading$: of(false),
  resultsHits$: of(null),
}

describe('ResultsHitsContainerComponent', () => {
  let component: ResultsHitsContainerComponent
  let fixture: ComponentFixture<ResultsHitsContainerComponent>
  let de: DebugElement
  let items: DebugElement[]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsHitsContainerComponent,
        ResultsHitsNumberComponentMock,
      ],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsHitsContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    de = fixture.debugElement
    items = de.queryAll(By.directive(ResultsHitsNumberComponentMock))
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('call ui component with params from State', () => {
    const uiComponent = items[0]
    expect(uiComponent).toBeTruthy()
    expect(uiComponent.componentInstance.loading).toBe(false)
    expect(uiComponent.componentInstance.hits).toBe(null)
  })
})
