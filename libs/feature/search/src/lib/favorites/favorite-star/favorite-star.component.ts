import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  ViewChild,
} from '@angular/core'
import { FavoritesService } from '../favorites.service'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { map } from 'rxjs/operators'
import { AuthService } from '@geonetwork-ui/feature/auth'
import tippy from 'tippy.js'
import { TranslateService } from '@ngx-translate/core'
import { StarToggleComponent } from '@geonetwork-ui/ui/inputs'
import { Subscription } from 'rxjs'
import { LANG_2_TO_3_MAPPER } from '@geonetwork-ui/util/i18n'

export const LOGIN_URL = new InjectionToken<string>('loginUrl')

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
      'favoriteCount' in this.record_ ? this.record_.favoriteCount : null
  }
  get record() {
    return this.record_
  }
  isFavorite$ = this.favoritesService.myFavoritesUuid$.pipe(
    map((favorites) => favorites.indexOf(this.record.uuid) > -1)
  )
  isAnonymous$ = this.authService
    .authReady()
    .pipe(map((user) => !user || !('id' in user)))
  record_: MetadataRecord
  favoriteCount: number | null
  loading = false
  DEFAULT_GN4_LOGIN_URL = `/geonetwork/srv/${
    LANG_2_TO_3_MAPPER[this.translateService.currentLang]
  }/catalog.signin?redirect=`
  loginUrl = `${
    this.optionalLoginUrl ? this.optionalLoginUrl : this.DEFAULT_GN4_LOGIN_URL
  }${window.location}`
  loginMessage = this.translateService.instant(
    'favorite.not.authenticated.tooltip',
    {
      link: this.loginUrl,
    }
  )
  @ViewChild(StarToggleComponent, { read: ElementRef })
  starToggleRef: ElementRef
  subscription: Subscription

  get hasFavoriteCount() {
    return this.favoriteCount !== null
  }

  constructor(
    @Optional()
    @Inject(LOGIN_URL)
    private optionalLoginUrl: string,
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  toggleFavorite(isFavorite) {
    this.loading = true
    ;(isFavorite
      ? this.favoritesService.addToFavorites([this.record.uuid])
      : this.favoritesService.removeFromFavorites([this.record.uuid])
    ).subscribe({
      complete: () => {
        if (this.hasFavoriteCount) {
          this.favoriteCount += isFavorite ? 1 : -1
        }
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
