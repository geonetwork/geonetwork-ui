import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { SiteApiService } from '@geonetwork-ui/data-access/gn4'
import { map, shareReplay } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Component({
  selector: 'md-editor-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeaderComponent {
  avatar$: Observable<string>

  constructor(
    public authService: AuthService,
    private siteApiService: SiteApiService
  ) {
    this.avatar$ = this.siteApiService
      .getSettingsSet(null, ['system/users/identicon'])
      .pipe(
        map((v) => v['system/users/identicon']),
        shareReplay({ bufferSize: 1, refCount: true })
      )
  }
}
