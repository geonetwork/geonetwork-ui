import { Location } from '@angular/common'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { tap } from 'rxjs/operators'

import * as RouterActions from './router.actions'
import { MdViewActions } from '@geonetwork-ui/feature/record'
import { navigation } from '@nrwl/angular'
import { MetadataRouteComponent, SearchRouteComponent } from '../constants'

@Injectable()
export class RouterEffects {
  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _location: Location
  ) {}

  navigate$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.goAction),
        tap(({ path, query: queryParams }) => {
          this._router.navigate([path], { queryParams })
        })
      ),
    { dispatch: false }
  )

  loadMetadata$ = createEffect(() =>
    this._actions$.pipe(
      navigation(MetadataRouteComponent, {
        run: (activatedRouteSnapshot: ActivatedRouteSnapshot) =>
          MdViewActions.loadFullMetadata({
            uuid: activatedRouteSnapshot.params.metadataUuid,
          }),
        onError(a: ActivatedRouteSnapshot, e) {
          console.error('Navigation failed', e)
        },
      })
    )
  )

  closeMetadata$ = createEffect(() =>
    this._actions$.pipe(
      navigation(SearchRouteComponent, {
        run: () => MdViewActions.close(),
      })
    )
  )

  navigateBack$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.backAction),
        tap(() => this._location.back())
      ),
    { dispatch: false }
  )

  navigateForward$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.forwardAction),
        tap(() => this._location.forward())
      ),
    { dispatch: false }
  )
}
