import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { SettingsListResponseApiModel, SiteApiService } from '@lib/gn-api'
import { shareReplay } from 'rxjs/operators'

@Component({
  selector: 'catalog-site-title',
  templateUrl: './site-title.component.html',
  styleUrls: ['./site-title.component.css'],
})
export class SiteTitleComponent implements OnInit {
  siteInfo$: Observable<SettingsListResponseApiModel>

  constructor(private siteApiService: SiteApiService) {}

  ngOnInit(): void {
    this.siteInfo$ = this.siteApiService.get4().pipe(shareReplay())
  }
}
