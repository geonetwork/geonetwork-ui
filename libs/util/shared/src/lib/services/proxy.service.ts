import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'

export const PROXY_PATH = new InjectionToken<string>('proxyPath')

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(@Optional() @Inject(PROXY_PATH) private proxyPath: string) {}

  /**
   * Transforms the URL to go through a proxy specified with the PROXY_PATH
   * injection token.
   * @param url
   */
  getProxiedUrl(url: string): string {
    if (!this.proxyPath) return url
    const urlObj = new URL(url)
    const current = window.location
    const proxyUrl = new URL(this.proxyPath, current.toString()).toString()
    if (
      current.hostname === urlObj.hostname &&
      current.protocol === urlObj.protocol &&
      current.port === urlObj.port
    ) {
      return url
    }
    if (url.indexOf(proxyUrl) === 0) return url
    return new URL(
      `${this.proxyPath}${encodeURIComponent(url)}`,
      window.location.toString()
    ).toString()
  }
}
