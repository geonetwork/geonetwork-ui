import { Location } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import { MdViewActions } from '@geonetwork-ui/feature/record'
import {
  FieldsService,
  SetFilters,
  SetSortBy,
} from '@geonetwork-ui/feature/search'
import { SortByEnum } from '@geonetwork-ui/util/shared'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { navigation } from '@nrwl/angular'
import { of } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'
import { ROUTER_CONFIG, RouterConfigModel } from '../router.module'
import * as RouterActions from './router.actions'
import { RouterFacade } from './router.facade'
import { ROUTE_PARAMS } from '../constants'

@Injectable()
export class RouterEffects {
  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _location: Location,
    private facade: RouterFacade,
    @Inject(ROUTER_CONFIG) private routerConfig: RouterConfigModel,
    private fieldsService: FieldsService
  ) {}

  navigate$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.goAction),
        tap(({ path, query: queryParams, queryParamsHandling }) => {
          this._router.navigate([path], {
            queryParams,
            queryParamsHandling,
          })
        })
      ),
    { dispatch: false }
  )

  syncSearchState$ = createEffect(() =>
    this.facade.searchParams$.pipe(
      mergeMap((searchParams) => {
        const routeFilters = this.fieldsService.supportedFields.reduce(
          (prev, curr) => {
            let values = null
            if (Array.isArray(searchParams[curr])) values = searchParams[curr]
            else if (typeof searchParams[curr] === 'string')
              values = [searchParams[curr]]
            if (!values) return prev
            return {
              ...prev,
              ...this.fieldsService.getFiltersForValues(curr, values),
            }
          },
          {}
        )
        return of(
          new SetFilters(routeFilters, this.routerConfig.searchStateId),
          new SetSortBy(
            searchParams[ROUTE_PARAMS.SORT] || SortByEnum.RELEVANCY,
            this.routerConfig.searchStateId
          )
        )
      })
    )
  )

  /**
   * This effect will load the metadata when a navigation to
   * a metadata record happens
   */
  navigateToMetadata$ = createEffect(() =>
    this._actions$.pipe(
      navigation(this.routerConfig.recordRouteComponent, {
        run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
          return of(
            MdViewActions.setIncompleteMetadata({
              incomplete: {
                uuid: activatedRouteSnapshot.params.metadataUuid,
                id: '',
                title: '',
                metadataUrl: '',
              },
            }),
            MdViewActions.loadFullMetadata({
              uuid: activatedRouteSnapshot.params.metadataUuid,
            })
          )
        },

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
      navigation(this.routerConfig.searchRouteComponent, {
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
