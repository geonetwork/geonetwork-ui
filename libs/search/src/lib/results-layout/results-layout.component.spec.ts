import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { UiModule } from '@lib/ui'
import { TranslateModule } from '@ngx-translate/core'
import { initialState, reducer, SEARCH_FEATURE_KEY } from '../state/reducer'
import { ResultsLayoutComponent } from './results-layout.component'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

describe('ResultsLayoutComponent', () => {
  let component: ResultsLayoutComponent
  let fixture: ComponentFixture<ResultsLayoutComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsLayoutComponent],
      imports: [
        UiModule,
        EffectsModule.forRoot(),
        TranslateModule.forRoot(),
        StoreModule.forRoot({}),
        StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
          initialState,
        }),
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsLayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
