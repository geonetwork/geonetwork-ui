import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FuzzySearchComponent } from './fuzzy-search.component'
import { UiModule } from '../../../../ui/src'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

describe('FuzzySearchComponent', () => {
  let component: FuzzySearchComponent
  let fixture: ComponentFixture<FuzzySearchComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuzzySearchComponent],
      imports: [UiModule, EffectsModule.forRoot(), StoreModule.forRoot({})],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FuzzySearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
