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
    const proxyUrl = new URL(
      this.proxyPath,
      window.location.toString()
    ).toString()
    if (url.indexOf(proxyUrl) === 0) return url
    return new URL(
      `${this.proxyPath}${encodeURIComponent(url)}`,
      window.location.toString()
    ).toString()
  }
}
