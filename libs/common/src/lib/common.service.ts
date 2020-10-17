import { Injectable } from '@angular/core'
import { SiteApiService } from '@lib/gn-api'
import { map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private siteApiService: SiteApiService) {}

  siteInfoReady() {
    return this.siteApiService.get4().pipe(
      map((r) => r),
      shareReplay()
    )
  }
}
