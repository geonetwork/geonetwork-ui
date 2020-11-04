import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { BootstrapService } from '@lib/common'
import { SettingsListResponseApiModel } from '@lib/gn-api'
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
