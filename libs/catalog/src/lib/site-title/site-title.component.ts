import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { SettingsListResponseApiModel } from '@lib/gn-api'
import { CommonService } from '@lib/common'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'catalog-site-title',
  templateUrl: './site-title.component.html',
  styleUrls: ['./site-title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteTitleComponent implements OnInit {
  info: SettingsListResponseApiModel
  infoEmitter$ = new BehaviorSubject<SettingsListResponseApiModel>(this.info)

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.siteInfoReady().subscribe((info) => {
      this.info = info
      this.infoEmitter$.next(this.info)
    })
  }
}
