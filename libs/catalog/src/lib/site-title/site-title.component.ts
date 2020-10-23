import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { SettingsListResponseApiModel } from '@lib/gn-api'
import { CommonService } from '@lib/common'
import { Observable } from 'rxjs'

@Component({
  selector: 'catalog-site-title',
  templateUrl: './site-title.component.html',
  styleUrls: ['./site-title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteTitleComponent implements OnInit {
  info$: Observable<SettingsListResponseApiModel>

  constructor(private commonService: CommonService) {
    this.info$ = commonService.siteInfoReady()
  }

  ngOnInit(): void {}
}
