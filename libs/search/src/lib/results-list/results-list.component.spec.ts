import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { initialState, reducer, SEARCH_FEATURE_KEY } from '../state/reducer'

import { ResultsListComponent } from './results-list.component'
import { UiModule } from '../../../../ui/src'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

describe('ResultsListComponent', () => {
  let component: ResultsListComponent
  let fixture: ComponentFixture<ResultsListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsListComponent],
      imports: [
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
    fixture = TestBed.createComponent(ResultsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
