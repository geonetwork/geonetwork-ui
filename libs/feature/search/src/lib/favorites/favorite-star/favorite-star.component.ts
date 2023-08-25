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
import { FavoritesService } from '../favorites.service'
import { map, pairwise } from 'rxjs/operators'
import { AuthService } from '@geonetwork-ui/feature/auth'
import tippy from 'tippy.js'
import { TranslateService } from '@ngx-translate/core'
import { StarToggleComponent } from '@geonetwork-ui/ui/inputs'
import { Subscription } from 'rxjs'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-favorite-star',
  templateUrl: './favorite-star.component.html',
  styleUrls: ['./favorite-star.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteStarComponent implements AfterViewInit, OnDestroy {
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
  isAnonymous$ = this.authService.isAnonymous$
  record_: CatalogRecord
  favoriteCount: number | null
  loading = false
  loginUrl = this.authService.loginUrl
  loginMessage = this.translateService.instant(
    'favorite.not.authenticated.tooltip',
    {
      link: this.loginUrl,
    }
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
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.subscription = this.isAnonymous$.subscribe((anonymous) => {
      if (anonymous) {
        tippy(this.starToggleRef.nativeElement, {
          appendTo: () => document.body,
          content: this.loginMessage,
          allowHTML: true,
          interactive: true,
          zIndex: 40,
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
