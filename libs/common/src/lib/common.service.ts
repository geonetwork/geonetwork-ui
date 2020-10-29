import { Injectable } from '@angular/core'
import { SiteApiService } from '@lib/gn-api'
import { map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private siteApiService: SiteApiService) {}

  siteInfoReady() {
    return this.siteApiService.getSiteOrPortalDescription().pipe(
      map((r) => r),
      shareReplay()
    )
  }
}
