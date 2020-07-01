import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { initialState, reducer, SEARCH_FEATURE_KEY } from '../state/reducer'
import { SortByComponent } from './sort-by.component'
import { UiModule } from '../../../../ui/src'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

describe('SortByComponent', () => {
  let component: SortByComponent
  let fixture: ComponentFixture<SortByComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortByComponent],
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
    fixture = TestBed.createComponent(SortByComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
