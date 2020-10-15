import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'

import {SettingsListResponseApiModel, SiteApiService} from '@lib/gn-api'
import {Observable} from 'rxjs'

@Component({
  selector: 'catalog-title',
  templateUrl: './catalog-title.component.html',
  styleUrls: ['./catalog-title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogTitleComponent implements OnInit {
  siteInfo$: Observable<SettingsListResponseApiModel>

  constructor(private siteApiService: SiteApiService) {}

  ngOnInit(): void {
    this.siteInfo$ = this.siteApiService.get4()
  }
}
