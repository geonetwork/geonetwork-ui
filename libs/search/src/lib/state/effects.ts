import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  AddResults,
  ClearResults,
  REQUEST_MORE_RESULTS,
  SORT_BY,
  UPDATE_PARAMS,
} from './actions'
import { map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions) {}

  clearResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SORT_BY, UPDATE_PARAMS),
      map(() => new ClearResults())
    )
  )

  loadResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(REQUEST_MORE_RESULTS),
      switchMap(() =>
        of(
          new AddResults([
            {
              name: 'fake record ' + Math.floor(Math.random() * 100),
              thumbnailUrl: '',
              abstract: 'this is a great abstract',
              url: 'www.goto.com',
            },
            {
              name: 'fake record ' + Math.floor(Math.random() * 100),
              thumbnailUrl: '',
              abstract: 'this is a great abstract (again)',
              url: 'www.goto.com',
            },
            {
              name: 'fake record ' + Math.floor(Math.random() * 100),
              thumbnailUrl: '',
              abstract: 'this is a great abstract (again again)',
              url: 'www.goto.com',
            },
          ])
        )
      )
    )
  )
}
