import { Injectable } from '@angular/core'
import { MeApiService } from '@lib/gn-api'
import { map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private meApi: MeApiService) {}

  authReady() {
    return this.meApi.getMe().pipe(
      map(() => {}),
      shareReplay()
    )
  }
}
