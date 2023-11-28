import { Injectable } from '@angular/core'
import { merge, Observable, of, Subject, throwError } from 'rxjs'
import { UserselectionsApiService } from '@geonetwork-ui/data-access/gn4'
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

const SELECTION_ID = 0 // hardcoded to always point on the first selection

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private myUserId$ = this.platformService
    .getMe()
    .pipe(map((userInfo) => (userInfo ? parseInt(userInfo.id) : null)))

  // this observable loads the current list of favorites from the API
  private myFavoritesUuidFromApi$: Observable<string[]> = this.myUserId$.pipe(
    switchMap(
      (userId) =>
        userId !== null
          ? this.userSelectionsService.getSelectionRecords(SELECTION_ID, userId)
          : of([] as string[]) // emit an empty array if the user is not authentified
    ),
    catchError((e) => {
      console.error(
        `An error occurred while fetching favorite records: ${e.message}`
      )
      return of([])
    })
  )

  private modifiedFavorites$ = new Subject<string[]>()

  // favorites are loaded once from the API (from myFavoritesUuidFromApi$);
  // subsequent emissions are caused by modifications of the favorite list
  // on the client side (coming from modifiedFavorites$)
  myFavoritesUuid$ = merge(
    this.myFavoritesUuidFromApi$,
    this.modifiedFavorites$
  ).pipe(
    shareReplay(1) // new subscriptions should not trigger a new API request!
  )

  constructor(
    private userSelectionsService: UserselectionsApiService,
    private platformService: PlatformServiceInterface
  ) {}

  addToFavorites(uuids: string[]): Observable<void> {
    return this.myFavoritesUuid$.pipe(
      take(1),
      withLatestFrom(this.myUserId$),
      tap(([, userId]) => {
        if (userId === null) throw new Error('not authenticated')
      }),
      switchMap(([favorites, userId]) =>
        this.userSelectionsService
          .addToUserSelection(SELECTION_ID, userId, uuids)
          .pipe(tap(() => this.emitAddedFavorites(favorites, uuids)))
      ),
      map(() => undefined),
      catchError((e) =>
        throwError(
          new Error(
            `An error occurred while adding records to favorites: ${e.message}`
          )
        )
      )
    )
  }

  removeFromFavorites(uuids: string[]): Observable<void> {
    return this.myFavoritesUuid$.pipe(
      take(1),
      withLatestFrom(this.myUserId$),
      tap(([, userId]) => {
        if (userId === null) throw new Error('not authenticated')
      }),
      switchMap(([favorites, userId]) =>
        this.userSelectionsService
          .deleteFromUserSelection(SELECTION_ID, userId, uuids)
          .pipe(tap(() => this.emitRemovedFavorites(favorites, uuids)))
      ),
      map(() => undefined),
      catchError((e) =>
        throwError(
          new Error(
            `An error occurred while removing records from favorites: ${e.message}`
          )
        )
      )
    )
  }

  private emitAddedFavorites(favorites: string[], addedUuids: string[]) {
    this.modifiedFavorites$.next([
      ...favorites.filter((uuid) => addedUuids.indexOf(uuid) === -1),
      ...addedUuids,
    ])
  }

  private emitRemovedFavorites(favorites: string[], removedUuids: string[]) {
    this.modifiedFavorites$.next(
      favorites.filter((uuid) => removedUuids.indexOf(uuid) === -1)
    )
  }
}
