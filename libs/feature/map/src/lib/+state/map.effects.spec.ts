import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from '@ngrx/store'
import { provideMockStore } from '@ngrx/store/testing'
import { Observable } from 'rxjs'
import { MapEffects } from './map.effects'

describe('MapEffects', () => {
  let actions: Observable<Action>
  let effects: MapEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    })

    effects = TestBed.inject(MapEffects)
  })

  it('placeholder', () => {
    expect(true).toBe(true)
  })
})
