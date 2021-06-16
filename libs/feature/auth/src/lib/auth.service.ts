import { Injectable } from '@angular/core'
import {
  MeApiService,
  MeResponseApiModel,
} from '@geonetwork-ui/data-access/gn4'
import { Observable } from 'rxjs'
import { shareReplay } from 'rxjs/operators'

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
