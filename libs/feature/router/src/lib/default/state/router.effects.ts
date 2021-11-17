import { Location } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import { MdViewActions } from '@geonetwork-ui/feature/record'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { navigation } from '@nrwl/angular'
import { tap } from 'rxjs/operators'
import { MetadataRouteComponent, SearchRouteComponent } from '../constants'
import { ROUTER_CONFIG, RouterConfigModel } from '../router.module'
import * as RouterActions from './router.actions'

@Injectable()
export class RouterEffects {
  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _location: Location,
    @Inject(ROUTER_CONFIG) private routerConfig: RouterConfigModel
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

  /**
   * This effect will load the metadata when a navigation to
   * a metadata record happens
   */
  navigateToMetadata$ = createEffect(() =>
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

  /**
   * This effect will close the metadata when a navigation to
   * the search results happens
   */
  navigateToSearch$ = createEffect(() =>
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
