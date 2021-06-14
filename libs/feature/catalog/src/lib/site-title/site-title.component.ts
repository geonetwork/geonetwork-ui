import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { BootstrapService } from '@geonetwork-ui/util/shared'
import { SettingsListResponseApiModel } from '@geonetwork-ui/data-access/gn4'
import { Observable } from 'rxjs'

@Component({
  selector: 'catalog-site-title',
  templateUrl: './site-title.component.html',
  styleUrls: ['./site-title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteTitleComponent implements OnInit {
  info$: Observable<SettingsListResponseApiModel>

  constructor(private commonService: BootstrapService) {
    this.info$ = commonService.siteInfoReady()
  }

  ngOnInit(): void {}
}
