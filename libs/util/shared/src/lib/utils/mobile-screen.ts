import { fromEvent, startWith, map, shareReplay } from 'rxjs'

/**
 * This returns true when the screen size is under 768px, which is the mobile threshold.
 */
const MOBILE_MAX_WIDTH = 768

export function getIsMobile() {
  return fromEvent(window, 'resize').pipe(
    startWith(window.innerWidth),
    map(() => window.innerWidth < MOBILE_MAX_WIDTH),
    shareReplay({ bufferSize: 1, refCount: true })
  )
}
