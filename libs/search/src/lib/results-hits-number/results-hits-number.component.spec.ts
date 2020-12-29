import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ResultsHitsNumberComponent } from './results-hits-number.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { StoreModule } from '@ngrx/store'
import { initialState, reducer, SEARCH_FEATURE_KEY } from '@lib/search'

describe('ResultsHitsNumberComponent', () => {
  let component: ResultsHitsNumberComponent
  let fixture: ComponentFixture<ResultsHitsNumberComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsHitsNumberComponent],
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
    fixture = TestBed.createComponent(ResultsHitsNumberComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
