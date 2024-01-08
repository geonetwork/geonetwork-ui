import { Component, OnInit } from '@angular/core'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'

@Component({
  selector: 'datahub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const favicon = getGlobalConfig().FAVICON
    if (favicon) this.setFavicon(favicon)
  }

  private setFavicon(faviconPath: string): void {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link')
    link['type'] = 'image/x-icon'
    link['rel'] = 'icon'
    link['href'] = faviconPath
    document.getElementsByTagName('head')[0].appendChild(link)
  }
}
