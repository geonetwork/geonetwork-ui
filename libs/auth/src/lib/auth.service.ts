import { Injectable } from '@angular/core'
import { MeApiService, MeResponseApiModel } from '@lib/gn-api'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authReady$: Observable<MeResponseApiModel>

  constructor(private meApi: MeApiService) {}

  authReady() {
    if (!this.authReady$) {
      this.authReady$ = this.meApi
        .getMe()
        .pipe(shareReplay({ bufferSize: 1, refCount: true }))
    }
    return this.authReady$
  }
}
