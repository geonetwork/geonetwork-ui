import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import {
  map,
  pairwise,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators'
import tippy from 'tippy.js'
import { TranslateService } from '@ngx-translate/core'
import { StarToggleComponent } from '@geonetwork-ui/ui/inputs'
import { Observable, Subscription } from 'rxjs'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { AuthService, FavoritesService } from '@geonetwork-ui/api/repository'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-favorite-star',
  templateUrl: './favorite-star.component.html',
  styleUrls: ['./favorite-star.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, StarToggleComponent],
})
export class FavoriteStarComponent implements AfterViewInit, OnDestroy {
  @Input() displayLabel? = false
  @Input() displayCount? = true
  @Input() set record(value) {
    this.record_ = value
    this.favoriteCount =
      'extras' in this.record_ && 'favoriteCount' in this.record_.extras
        ? (this.record_.extras.favoriteCount as number)
        : null
  }
  get record() {
    return this.record_
  }
  isFavorite$ = this.favoritesService.myFavoritesUuid$.pipe(
    map((favorites) => favorites.indexOf(this.record.uniqueIdentifier) > -1)
  )
  isAnonymous$ = this.platformService.isAnonymous()
  record_: Partial<CatalogRecord>
  favoriteCount: number | null
  loading = false
  loginUrl = this.authService.loginUrl
  loginMessage$: Observable<string> = this.translateService.onLangChange.pipe(
    startWith(null), // make sure to wait for translations to be loaded with and without language change
    switchMap(() =>
      this.translateService.get('favorite.not.authenticated.tooltip', {
        link: this.loginUrl,
      })
    )
  )
  @ViewChild(StarToggleComponent, { read: ElementRef })
  starToggleRef: ElementRef
  subscription: Subscription
  countSubscription: Subscription

  get hasFavoriteCount() {
    return this.favoriteCount !== null
  }

  constructor(
    private favoritesService: FavoritesService,
    private platformService: PlatformServiceInterface,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.subscription = this.isAnonymous$
      .pipe(withLatestFrom(this.loginMessage$))
      .subscribe(([anonymous, loginMessage]) => {
        if (anonymous) {
          tippy(this.starToggleRef.nativeElement, {
            appendTo: () => document.body,
            content: loginMessage,
            allowHTML: true,
            interactive: true,
            zIndex: 60,
            maxWidth: 250,
          })
        }
      })
    this.countSubscription = this.favoritesService.myFavoritesUuid$
      .pipe(pairwise())
      .subscribe(([oldFavs, newFavs]) => {
        const editedFavs = (
          oldFavs.length < newFavs.length
            ? newFavs.slice(-1)
            : oldFavs.filter((fav) => !newFavs.includes(fav))
        )[0]
        if (
          this.hasFavoriteCount &&
          editedFavs === this.record.uniqueIdentifier
        ) {
          if (newFavs.includes(editedFavs)) {
            this.favoriteCount += 1
          } else {
            this.favoriteCount += -1
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.countSubscription.unsubscribe()
  }

  toggleFavorite(isFavorite) {
    this.loading = true
    ;(isFavorite
      ? this.favoritesService.addToFavorites([this.record.uniqueIdentifier])
      : this.favoritesService.removeFromFavorites([
          this.record.uniqueIdentifier,
        ])
    ).subscribe({
      complete: () => {
        this.loading = false
        this.changeDetector.detectChanges()
      },
      error: () => {
        this.loading = false
        this.changeDetector.detectChanges()
      },
    })
  }
}
