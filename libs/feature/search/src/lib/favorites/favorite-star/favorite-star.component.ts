import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core'
import { FavoritesService } from '../favorites.service'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { map } from 'rxjs/operators'
import { AuthService } from '@geonetwork-ui/feature/auth'

@Component({
  selector: 'gn-ui-favorite-star',
  templateUrl: './favorite-star.component.html',
  styleUrls: ['./favorite-star.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteStarComponent {
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

  get hasFavoriteCount() {
    return this.favoriteCount !== null
  }

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef
  ) {}

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
