import { Injectable } from '@angular/core'
import { fromEvent, Observable } from 'rxjs'
import { map, startWith, shareReplay } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class MobileService {
  private readonly MOBILE_MAX_WIDTH = 768

  isMobile$: Observable<boolean> = fromEvent(window, 'resize').pipe(
    startWith(window.innerWidth),
    map(() => window.innerWidth < this.MOBILE_MAX_WIDTH),
    shareReplay({ bufferSize: 1, refCount: true })
  )
}
