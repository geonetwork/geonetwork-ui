import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  SettingsListResponseApiModel,
  SiteApiService,
} from '@geonetwork-ui/data-access/gn4'
import { CatalogTitleComponent } from '@geonetwork-ui/ui/catalog'
import { Observable } from 'rxjs'
import { shareReplay } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-site-title',
  templateUrl: './site-title.component.html',
  styleUrls: ['./site-title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CatalogTitleComponent],
})
export class SiteTitleComponent {
  info$: Observable<SettingsListResponseApiModel>

  constructor(private siteApiService: SiteApiService) {
    this.info$ = this.siteApiService
      .getSiteOrPortalDescription()
      .pipe(shareReplay(1))
  }
}
