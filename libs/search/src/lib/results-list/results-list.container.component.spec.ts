import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { I18nModule } from '@lib/common'
import { UiModule } from '@lib/ui'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'
import { initialState, reducer, SEARCH_FEATURE_KEY } from '../state/reducer'
import { ResultsListContainerComponent } from './results-list.container.component'

describe('ResultsListContainerComponent', () => {
  let component: ResultsListContainerComponent
  let fixture: ComponentFixture<ResultsListContainerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsListContainerComponent],
      imports: [
        I18nModule,
        TranslateModule.forRoot(),
        UiModule,
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
        StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
          initialState,
        }),
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsListContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
