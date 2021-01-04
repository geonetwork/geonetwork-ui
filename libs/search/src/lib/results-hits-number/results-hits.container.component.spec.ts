import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ResultsHitsContainerComponent } from './results-hits.container.component'
import { Component, DebugElement, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { StoreModule } from '@ngrx/store'
import { initialState, reducer, SEARCH_FEATURE_KEY } from '@lib/search'

@Component({
  selector: 'ui-results-hits-number',
  template: '',
})
class ResultsHitsNumberComponentMock {
  @Input() hits
  @Input() loading: boolean
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
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
          initialState,
        }),
        TranslateModule.forRoot(),
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
