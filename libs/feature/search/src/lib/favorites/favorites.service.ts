import { Injectable } from '@angular/core'
import { combineLatest, merge, Observable, of, Subject, throwError } from 'rxjs'
import { UserselectionsApiService } from '@geonetwork-ui/data-access/gn4'
import { AuthService } from '@geonetwork-ui/feature/auth'
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators'

const SELECTION_ID = 0 // hardcoded to always point on the first selection

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private myId$ = this.authService
    .authReady()
    .pipe(map((userInfo) => (userInfo ? parseInt(userInfo.id) : null)))

  private myFavoritesUuidFromApi$ = this.myId$.pipe(
    switchMap((userId) =>
      userId !== null
        ? this.userSelectionsService.getSelectionRecords(SELECTION_ID, userId)
        : of([] as string[])
    ),
    catchError((e) =>
      throwError(
        new Error(
          `An error occurred while fetching favorite records: ${e.message}`
        )
      )
    )
  )

  private modifiedFavorites$ = new Subject<string[]>()

  myFavoritesUuid$ = merge(
    this.myFavoritesUuidFromApi$,
    this.modifiedFavorites$
  ).pipe(shareReplay(1))

  constructor(
    private userSelectionsService: UserselectionsApiService,
    private authService: AuthService
  ) {}

  addToFavorites(uuids: string[]): Observable<void> {
    return combineLatest([this.myId$, this.myFavoritesUuid$]).pipe(
      take(1),
      tap(([userId]) => {
        if (userId === null) throw new Error('not authenticated')
      }),
      switchMap(([userId, favorites]) =>
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
    return combineLatest([this.myId$, this.myFavoritesUuid$]).pipe(
      take(1),
      tap(([userId]) => {
        if (userId === null) throw new Error('not authenticated')
      }),
      switchMap(([userId, favorites]) =>
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
